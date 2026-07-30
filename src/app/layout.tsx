import type { Metadata } from 'next';
import 'mapbox-gl/dist/mapbox-gl.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://taborlin.co'),
  title: {
    default: 'Taborlin | Product Studio and Software Consulting',
    template: '%s — Taborlin',
  },
  description:
    'Taborlin builds and operates software products across AI credits, weather markets, AI video, sales tooling, social ops, maps, and crypto workflows.',
  openGraph: {
    title: 'Taborlin | Product Studio and Software Consulting',
    description:
      'Taborlin builds and operates software products across AI credits, weather markets, AI video, sales tooling, social ops, maps, and crypto workflows.',
    url: 'https://taborlin.co',
    siteName: 'Taborlin',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taborlin | Product Studio and Software Consulting',
    description:
      'Taborlin builds and operates software products across AI credits, weather markets, AI video, sales tooling, social ops, maps, and crypto workflows.',
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
                'Taborlin builds and operates software products across AI credits, weather markets, AI video, sales tooling, social ops, maps, and crypto workflows.',
              sameAs: [
                'https://cheaptokens.ai',
                'https://sonde.taborlin.co',
                'https://studio.taborlin.co',
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
