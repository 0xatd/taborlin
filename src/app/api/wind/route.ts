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

const OPEN_METEO_CHUNK_SIZE = 296;

function range(start: number, end: number, step: number) {
  return Array.from({ length: Math.floor((end - start) / step) + 1 }, (_, index) => {
    return start + index * step;
  });
}

const WIND_GRID = {
  latitudes: range(14, 60, 2),
  longitudes: range(-156, -48, 3),
};

const SAMPLE_POINTS = WIND_GRID.latitudes.flatMap((lat) =>
  WIND_GRID.longitudes.map((lon) => ({ lat, lon })),
);

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
    lat: fallback.lat,
    lon: fallback.lon,
    speedMph: typeof speed === 'number' && Number.isFinite(speed) ? speed : 0,
    directionDegrees:
      typeof direction === 'number' && Number.isFinite(direction) ? direction : 270,
  };
}

function chunkPoints<T>(points: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < points.length; index += size) {
    chunks.push(points.slice(index, index + size));
  }

  return chunks;
}

async function fetchOpenMeteoPoints(points: { lat: number; lon: number }[]) {
  const latitude = points.map((point) => point.lat).join(',');
  const longitude = points.map((point) => point.lon).join(',');
  const url = new URL('https://api.open-meteo.com/v1/forecast');

  url.searchParams.set('latitude', latitude);
  url.searchParams.set('longitude', longitude);
  url.searchParams.set('current', 'wind_speed_10m,wind_direction_10m');
  url.searchParams.set('wind_speed_unit', 'mph');
  url.searchParams.set('timezone', 'UTC');

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
  return points.map((fallback, index) => sanitizePoint(locations[index], fallback));
}

export async function GET() {
  try {
    const chunks = chunkPoints(SAMPLE_POINTS, OPEN_METEO_CHUNK_SIZE);
    const points = (await Promise.all(chunks.map(fetchOpenMeteoPoints))).flat();

    return NextResponse.json(
      {
        source: 'Open-Meteo',
        attribution: 'Weather data by Open-Meteo.com (CC BY 4.0)',
        fetchedAt: new Date().toISOString(),
        grid: WIND_GRID,
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
        grid: WIND_GRID,
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
