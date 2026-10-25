import { ImageResponse } from 'next/og';

export const alt = 'Taborlin — AI agents and software for businesses';
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
          padding: '72px 80px',
          background:
            'radial-gradient(circle at 85% 10%, rgba(217,179,108,0.22), transparent 45%), radial-gradient(circle at 10% 100%, rgba(56,189,248,0.12), transparent 40%), #07070c',
          color: '#f5f3ee',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              border: '2px solid rgba(217,179,108,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
              color: '#d9b36c',
            }}
          >
            T
          </div>
          <div style={{ fontSize: 34, letterSpacing: 1 }}>Taborlin</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, maxWidth: 980 }}>
            AI agents and software that do real work.
          </div>
          <div style={{ fontSize: 30, color: '#b8b5ad', fontFamily: 'sans-serif', maxWidth: 940 }}>
            Agents, internal tools, and data products — from first prototype to production.
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#d9b36c', fontFamily: 'sans-serif' }}>
          taborlin.co · hello@taborlin.co
        </div>
      </div>
    ),
    size,
  );
}
