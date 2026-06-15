import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://taborlin.co'),
  title: {
    default: 'Taborlin — Agent-Operated Software Products',
    template: '%s — Taborlin',
  },
  description:
    'Building agent-operated software products across AI, content, revenue operations, and compute infrastructure.',
  openGraph: {
    title: 'Taborlin — Agent-Operated Software Products',
    description:
      'Building agent-operated software products across AI, content, revenue operations, and compute infrastructure.',
    url: 'https://taborlin.co',
    siteName: 'Taborlin',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taborlin — Agent-Operated Software Products',
    description:
      'Building agent-operated software products across AI, content, revenue operations, and compute infrastructure.',
  },
  alternates: {
    canonical: 'https://taborlin.co',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Taborlin',
              url: 'https://taborlin.co',
              description:
                'Building agent-operated software products across AI, content, revenue operations, and compute infrastructure.',
              sameAs: [
                'https://factory.taborlin.co',
                'https://social-manager-eight.vercel.app',
                'https://saga.taborlin.co/app',
                'https://cheaptokens.ai',
                'https://champion-vert.vercel.app',
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
