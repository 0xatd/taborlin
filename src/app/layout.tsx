import type { Metadata } from 'next';
import 'mapbox-gl/dist/mapbox-gl.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://taborlin.co'),
  title: {
    default: 'Taborlin — AI Product Studio, Labs & Consulting',
    template: '%s — Taborlin',
  },
  description:
    'Taborlin is a product studio, labs, and consulting firm. We build and operate AI software that does real work — agents run it, humans sign off — and consult on GTM and product for data infrastructure companies.',
  openGraph: {
    title: 'Taborlin — AI Product Studio, Labs & Consulting',
    description:
      'Taborlin is a product studio, labs, and consulting firm. We build and operate AI software that does real work — agents run it, humans sign off — and consult on GTM and product for data infrastructure companies.',
    url: 'https://taborlin.co',
    siteName: 'Taborlin',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taborlin — AI Product Studio, Labs & Consulting',
    description:
      'Taborlin is a product studio, labs, and consulting firm. We build and operate AI software that does real work — agents run it, humans sign off — and consult on GTM and product for data infrastructure companies.',
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
                'Taborlin is a product studio, labs, and consulting firm. We build and operate AI software that does real work — agents run it, humans sign off — and consult on GTM and product for data infrastructure companies.',
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
