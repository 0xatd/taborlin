import type { Metadata } from 'next';
import 'mapbox-gl/dist/mapbox-gl.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://taborlin.co'),
  title: {
    default: 'Taborlin — Software Businesses Built With Agents',
    template: '%s — Taborlin',
  },
  description:
    'Taborlin builds and operates focused software businesses with agent workflows, payments, approvals, and production controls built in.',
  openGraph: {
    title: 'Taborlin — Software Businesses Built With Agents',
    description:
      'Taborlin builds and operates focused software businesses with agent workflows, payments, approvals, and production controls built in.',
    url: 'https://taborlin.co',
    siteName: 'Taborlin',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taborlin — Software Businesses Built With Agents',
    description:
      'Taborlin builds and operates focused software businesses with agent workflows, payments, approvals, and production controls built in.',
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
                'Taborlin builds and operates focused software businesses with agent workflows, payments, approvals, and production controls built in.',
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
