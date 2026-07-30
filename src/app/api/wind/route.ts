import { NextResponse } from 'next/server';

export const revalidate = 900;
export const dynamic = 'force-dynamic';

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

type WindBounds = {
  minLon: number;
  maxLon: number;
  minLat: number;
  maxLat: number;
};

type SanitizedWindPoint = WindPoint & {
  observedAt?: string;
};

const OPEN_METEO_CHUNK_SIZE = 600;
const OPEN_METEO_CHUNK_DELAY_MS = 500;
const DEFAULT_MAX_SAMPLE_POINTS = 589;
const VIEWPORT_MAX_SAMPLE_POINTS = 220;
const DEFAULT_BOUNDS: WindBounds = {
  minLon: -156,
  maxLon: -51,
  minLat: 14,
  maxLat: 59,
};
const WORLD_BOUNDS = {
  minLon: -180,
  maxLon: 180,
  minLat: -80,
  maxLat: 80,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function roundCoordinate(value: number) {
  return Number(value.toFixed(3));
}

function linspace(start: number, end: number, count: number) {
  if (count <= 1) return [roundCoordinate(start)];

  const step = (end - start) / (count - 1);
  return Array.from({ length: count }, (_, index) => roundCoordinate(start + step * index));
}

function normalizeLongitude(value: number) {
  return ((((value + 180) % 360) + 360) % 360) - 180;
}

function parseNumber(value: string | null) {
  if (!value) return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseBounds(url: URL): WindBounds {
  const bbox = url.searchParams.get('bbox')?.split(',').map((value) => Number(value.trim()));
  const west = bbox?.[0] ?? parseNumber(url.searchParams.get('west'));
  const south = bbox?.[1] ?? parseNumber(url.searchParams.get('south'));
  const east = bbox?.[2] ?? parseNumber(url.searchParams.get('east'));
  const north = bbox?.[3] ?? parseNumber(url.searchParams.get('north'));

  if (
    west === null ||
    south === null ||
    east === null ||
    north === null ||
    !Number.isFinite(west) ||
    !Number.isFinite(south) ||
    !Number.isFinite(east) ||
    !Number.isFinite(north)
  ) {
    return DEFAULT_BOUNDS;
  }

  let minLon = Math.min(west, east);
  let maxLon = Math.max(west, east);
  const rawLonSpan = maxLon - minLon;
  const useWorldLongitudes = rawLonSpan >= 320;

  if (useWorldLongitudes) {
    minLon = WORLD_BOUNDS.minLon;
    maxLon = WORLD_BOUNDS.maxLon;
  } else {
    while (maxLon < WORLD_BOUNDS.minLon) {
      minLon += 360;
      maxLon += 360;
    }

    while (minLon > WORLD_BOUNDS.maxLon) {
      minLon -= 360;
      maxLon -= 360;
    }
  }

  let minLat = clamp(Math.min(south, north), WORLD_BOUNDS.minLat, WORLD_BOUNDS.maxLat);
  let maxLat = clamp(Math.max(south, north), WORLD_BOUNDS.minLat, WORLD_BOUNDS.maxLat);

  const lonPadding = clamp((maxLon - minLon) * 0.18, 2, 18);
  const latPadding = clamp((maxLat - minLat) * 0.18, 2, 12);
  minLon = useWorldLongitudes ? WORLD_BOUNDS.minLon : Math.floor((minLon - lonPadding) * 2) / 2;
  maxLon = useWorldLongitudes ? WORLD_BOUNDS.maxLon : Math.ceil((maxLon + lonPadding) * 2) / 2;
  minLat = clamp(Math.floor((minLat - latPadding) * 2) / 2, WORLD_BOUNDS.minLat, WORLD_BOUNDS.maxLat);
  maxLat = clamp(Math.ceil((maxLat + latPadding) * 2) / 2, WORLD_BOUNDS.minLat, WORLD_BOUNDS.maxLat);

  if (maxLon - minLon < 1) {
    minLon -= 0.5;
    maxLon += 0.5;
  }

  if (maxLat - minLat < 1) {
    minLat = clamp(minLat - 0.5, WORLD_BOUNDS.minLat, WORLD_BOUNDS.maxLat);
    maxLat = clamp(maxLat + 0.5, WORLD_BOUNDS.minLat, WORLD_BOUNDS.maxLat);
  }

  return { minLon, maxLon, minLat, maxLat };
}

function hasRequestedBounds(url: URL) {
  return (
    url.searchParams.has('bbox') ||
    url.searchParams.has('west') ||
    url.searchParams.has('south') ||
    url.searchParams.has('east') ||
    url.searchParams.has('north')
  );
}

function buildGrid(bounds: WindBounds, maxSamplePoints: number) {
  const lonSpan = Math.max(1, bounds.maxLon - bounds.minLon);
  const latSpan = Math.max(1, bounds.maxLat - bounds.minLat);
  const aspect = clamp(lonSpan / latSpan, 0.6, 3.2);
  let latCount = clamp(Math.round(Math.sqrt(maxSamplePoints / aspect)), 8, 26);
  let lonCount = clamp(Math.round(latCount * aspect), 10, 42);

  while (latCount * lonCount > maxSamplePoints) {
    if (lonCount >= latCount) {
      lonCount -= 1;
    } else {
      latCount -= 1;
    }
  }

  return {
    latitudes: linspace(bounds.minLat, bounds.maxLat, latCount),
    longitudes: linspace(bounds.minLon, bounds.maxLon, lonCount),
  };
}

function gridPoints(grid: { latitudes: number[]; longitudes: number[] }) {
  return grid.latitudes.flatMap((lat) => grid.longitudes.map((lon) => ({ lat, lon })));
}

function fallbackField(points: { lat: number; lon: number }[]): WindPoint[] {
  return points.map((point, index) => ({
    ...point,
    speedMph: 9 + ((index * 7) % 18),
    directionDegrees: 245 + ((index * 17) % 70),
  }));
}

function sanitizePoint(
  point: OpenMeteoPoint | undefined,
  fallback: { lat: number; lon: number },
): SanitizedWindPoint {
  const speed = point?.current?.wind_speed_10m;
  const direction = point?.current?.wind_direction_10m;
  const observedAt = point?.current?.time;

  return {
    lat: fallback.lat,
    lon: fallback.lon,
    speedMph: typeof speed === 'number' && Number.isFinite(speed) ? speed : 0,
    directionDegrees:
      typeof direction === 'number' && Number.isFinite(direction) ? direction : 270,
    observedAt: typeof observedAt === 'string' ? observedAt : undefined,
  };
}

function chunkPoints<T>(points: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < points.length; index += size) {
    chunks.push(points.slice(index, index + size));
  }

  return chunks;
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchOpenMeteoPoints(points: { lat: number; lon: number }[]) {
  const latitude = points.map((point) => point.lat).join(',');
  const longitude = points.map((point) => normalizeLongitude(point.lon)).join(',');
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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const bounds = parseBounds(url);
  const grid = buildGrid(
    bounds,
    hasRequestedBounds(url) ? VIEWPORT_MAX_SAMPLE_POINTS : DEFAULT_MAX_SAMPLE_POINTS,
  );
  const samplePoints = gridPoints(grid);

  try {
    const chunks = chunkPoints(samplePoints, OPEN_METEO_CHUNK_SIZE);
    const pointGroups: SanitizedWindPoint[][] = [];

    for (let index = 0; index < chunks.length; index += 1) {
      pointGroups.push(await fetchOpenMeteoPoints(chunks[index]));

      if (index < chunks.length - 1) {
        await delay(OPEN_METEO_CHUNK_DELAY_MS);
      }
    }

    const pointsWithTimes = pointGroups.flat();
    const observedTimes = pointsWithTimes
      .map((point) => point.observedAt)
      .filter((time): time is string => Boolean(time))
      .sort();
    const points: WindPoint[] = pointsWithTimes.map((point) => ({
      lat: point.lat,
      lon: point.lon,
      speedMph: point.speedMph,
      directionDegrees: point.directionDegrees,
    }));

    return NextResponse.json(
      {
        source: 'Open-Meteo',
        attribution: 'Weather data by Open-Meteo.com (CC BY 4.0)',
        fetchedAt: new Date().toISOString(),
        dataUpdatedAt: observedTimes.at(-1) ?? null,
        bounds,
        grid,
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
        dataUpdatedAt: null,
        bounds,
        grid,
        points: fallbackField(samplePoints),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600',
        },
      },
    );
  }
}
