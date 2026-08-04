import type { Metadata } from 'next';
import 'mapbox-gl/dist/mapbox-gl.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://taborlin.co'),
  title: {
    default: 'Taborlin — Building Agents and Applied AI Products',
    template: '%s — Taborlin',
  },
  description:
    'Taborlin builds agents and applied AI products for inference, sales, social operations, maps, and data workflows.',
  openGraph: {
    title: 'Taborlin — Building Agents and Applied AI Products',
    description:
      'Taborlin builds agents and applied AI products for inference, sales, social operations, maps, and data workflows.',
    url: 'https://taborlin.co',
    siteName: 'Taborlin',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taborlin — Building Agents and Applied AI Products',
    description:
      'Taborlin builds agents and applied AI products for inference, sales, social operations, maps, and data workflows.',
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
                'Taborlin builds agents and applied AI products for inference, sales, social operations, maps, and data workflows.',
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
