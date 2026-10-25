import { ImageResponse } from 'next/og';

export const alt = 'Taborlin builds AI agents and software for businesses.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 96px',
          background: '#fafaf8',
          color: '#111111',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 600 }}>Taborlin</div>
        <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.15, maxWidth: 960, letterSpacing: -1 }}>
          Taborlin builds AI agents and software for businesses.
        </div>
        <div style={{ fontSize: 28, color: '#666666' }}>taborlin.co</div>
      </div>
    ),
    size,
  );
}
