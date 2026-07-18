import { NextResponse } from 'next/server';

export const revalidate = 900;

type OpenMeteoPoint = {
  latitude?: number;
  longitude?: number;
  current?: {
    time?: string;
    wind_speed_10m?: number;
    wind_direction_10m?: number;
  };
};

type WindPoint = {
  lat: number;
  lon: number;
  speedMph: number;
  directionDegrees: number;
};

const SAMPLE_POINTS = [
  { lat: 52, lon: -136 },
  { lat: 50, lon: -128 },
  { lat: 48, lon: -122 },
  { lat: 45, lon: -140 },
  { lat: 44, lon: -130 },
  { lat: 43, lon: -120 },
  { lat: 40, lon: -145 },
  { lat: 40, lon: -134 },
  { lat: 39, lon: -124 },
  { lat: 37, lon: -118 },
  { lat: 34, lon: -140 },
  { lat: 34, lon: -128 },
  { lat: 34, lon: -118 },
  { lat: 31, lon: -132 },
  { lat: 30, lon: -121 },
  { lat: 27, lon: -116 },
];

function fallbackField(): WindPoint[] {
  return SAMPLE_POINTS.map((point, index) => ({
    ...point,
    speedMph: 9 + ((index * 7) % 18),
    directionDegrees: 245 + ((index * 17) % 70),
  }));
}

function sanitizePoint(
  point: OpenMeteoPoint | undefined,
  fallback: { lat: number; lon: number },
): WindPoint {
  const speed = point?.current?.wind_speed_10m;
  const direction = point?.current?.wind_direction_10m;

  return {
    lat: typeof point?.latitude === 'number' ? point.latitude : fallback.lat,
    lon: typeof point?.longitude === 'number' ? point.longitude : fallback.lon,
    speedMph: typeof speed === 'number' && Number.isFinite(speed) ? speed : 0,
    directionDegrees:
      typeof direction === 'number' && Number.isFinite(direction) ? direction : 270,
  };
}

export async function GET() {
  const latitude = SAMPLE_POINTS.map((point) => point.lat).join(',');
  const longitude = SAMPLE_POINTS.map((point) => point.lon).join(',');
  const url = new URL('https://api.open-meteo.com/v1/forecast');

  url.searchParams.set('latitude', latitude);
  url.searchParams.set('longitude', longitude);
  url.searchParams.set('current', 'wind_speed_10m,wind_direction_10m');
  url.searchParams.set('wind_speed_unit', 'mph');
  url.searchParams.set('timezone', 'UTC');

  try {
    const response = await fetch(url, {
      next: { revalidate },
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Open-Meteo returned ${response.status}`);
    }

    const payload = (await response.json()) as OpenMeteoPoint[] | OpenMeteoPoint;
    const locations = Array.isArray(payload) ? payload : [payload];
    const points = SAMPLE_POINTS.map((fallback, index) => sanitizePoint(locations[index], fallback));

    return NextResponse.json(
      {
        source: 'Open-Meteo',
        attribution: 'Weather data by Open-Meteo.com (CC BY 4.0)',
        fetchedAt: new Date().toISOString(),
        points,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
        },
      },
    );
  } catch (error) {
    console.error('Wind mode Open-Meteo fetch failed', error);

    return NextResponse.json(
      {
        source: 'fallback',
        attribution: 'Wind field fallback while Open-Meteo is unavailable',
        fetchedAt: new Date().toISOString(),
        points: fallbackField(),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600',
        },
      },
    );
  }
}
