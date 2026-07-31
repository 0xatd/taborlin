import type { Metadata } from 'next';
import 'mapbox-gl/dist/mapbox-gl.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://taborlin.co'),
  title: {
    default: 'Taborlin — AI Products That Do Real Work',
    template: '%s — Taborlin',
  },
  description:
    'Taborlin is a small product studio building AI software that does real work — agents handle payments, publishing, and records; humans approve what matters.',
  openGraph: {
    title: 'Taborlin — AI Products That Do Real Work',
    description:
      'Taborlin is a small product studio building AI software that does real work — agents handle payments, publishing, and records; humans approve what matters.',
    url: 'https://taborlin.co',
    siteName: 'Taborlin',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taborlin — AI Products That Do Real Work',
    description:
      'Taborlin is a small product studio building AI software that does real work — agents handle payments, publishing, and records; humans approve what matters.',
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
                'Taborlin is a small product studio building AI software that does real work — agents handle payments, publishing, and records; humans approve what matters.',
              sameAs: [
                'https://cheaptokens.ai',
                'https://champion.taborlin.co',
                'https://soshi.taborlin.co',
                'https://spatix.io',
                'https://onchain-wallets-dashboard.vercel.app',
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
