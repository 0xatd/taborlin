import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://taborlin.co'),
  title: {
    default: 'Taborlin — Agent-Run Software Products',
    template: '%s — Taborlin',
  },
  description:
    'Taborlin builds and operates focused AI software products with payments, approvals, metrics, and production ops baked in.',
  openGraph: {
    title: 'Taborlin — Agent-Run Software Products',
    description:
      'Taborlin builds and operates focused AI software products with payments, approvals, metrics, and production ops baked in.',
    url: 'https://taborlin.co',
    siteName: 'Taborlin',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taborlin — Agent-Run Software Products',
    description:
      'Taborlin builds and operates focused AI software products with payments, approvals, metrics, and production ops baked in.',
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
                'Taborlin builds and operates focused AI software products with payments, approvals, metrics, and production ops baked in.',
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
