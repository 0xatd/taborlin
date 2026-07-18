import { NextResponse } from 'next/server';

const DEFAULT_STYLE_URL = 'mapbox://styles/mapbox/dark-v11';

export async function GET() {
  const token = process.env.MAPBOX_PUBLIC_TOKEN ?? process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: 'Mapbox token is not configured' },
      { status: 404, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  return NextResponse.json(
    {
      token,
      styleUrl:
        process.env.MAPBOX_STYLE_URL ??
        process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL ??
        DEFAULT_STYLE_URL,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    },
  );
}
