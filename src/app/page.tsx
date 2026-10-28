import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT_MAILTO, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from './site';
import { ExternalMark, SiteFooter, SiteHeader, SkipLink } from './SiteChrome';

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
};

const work = [
  {
    name: 'CheapTokens',
    status: 'Live',
    description: 'Discounted AI inference credits for developers, with no sales call or subscription.',
    href: 'https://cheaptokens.ai',
    linkLabel: 'cheaptokens.ai',
  },
  {
    name: 'HVAC booking assistant',
    status: 'Demo',
    description: 'An AI assistant that answers after-hours leads, qualifies the job and books the service call.',
    href: 'https://lyralai.github.io/hvac-booking-demo/',
    linkLabel: 'Try the demo',
  },
  {
    name: 'Weather Atlas',
    status: 'Prototype',
    description: 'Live radar and weather alerts mapped against pipelines, energy sites and power lines.',
    href: 'https://accuweather-map.vercel.app',
    linkLabel: 'Open the map',
  },
  {
    name: 'Open Crypto Tax Helper',
    status: 'Paused',
    description: 'Self-hosted software that traces wallets and finds missing cost basis, with AI help.',
    href: 'https://onchain-wallets-dashboard.vercel.app',
    linkLabel: 'See the app',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SkipLink />
      <div className="mx-auto max-w-2xl px-6">
        <SiteHeader />

        <main id="main">
          <section aria-labelledby="intro" className="pt-24 pb-20 sm:pt-36 sm:pb-28">
            <h1 id="intro" className="text-3xl sm:text-[2.6rem] font-semibold leading-[1.15] tracking-tight">
              Taborlin builds AI agents and software for businesses.
            </h1>
            <p className="mt-5 text-lg text-muted leading-relaxed">
              Assistants, data tools and maps that take slow, manual work off a team. Below is some of
              what has shipped. Each one opens to the real thing.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={CONTACT_MAILTO}
                className="inline-block rounded-md bg-foreground px-5 py-3 text-[15px] font-medium text-background hover:opacity-85 transition-opacity"
              >
                Get in touch
              </a>
              <Link href="/work" className="text-[15px] font-medium underline-offset-4 hover:underline">
                See all work →
              </Link>
            </div>
          </section>

          <section aria-labelledby="work" className="pb-24 sm:pb-32">
            <div className="flex items-baseline justify-between">
              <h2 id="work" className="text-sm font-medium text-muted">
                Selected work
              </h2>
              <Link href="/work" className="text-sm text-muted hover:text-foreground">
                Project notes →
              </Link>
            </div>
            <ul className="mt-4 border-t border-border">
              {work.map((item) => (
                <li key={item.name} className="border-b border-border">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    className="group flex flex-col gap-1 py-5 sm:flex-row sm:gap-8"
                  >
                    <span className="sm:w-52 sm:shrink-0">
                      <span className="block font-medium group-hover:underline underline-offset-4">{item.name}</span>
                      <span className="mt-0.5 block text-xs text-muted">{item.status}</span>
                    </span>
                    <span className="text-muted">
                      {item.description}
                      <span className="mt-1 block text-foreground">
                        {item.linkLabel}
                        <ExternalMark />
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[15px] text-muted">
              More projects, experiments and notes on how each one was built are on the{' '}
              <Link href="/work" className="text-foreground underline underline-offset-4">
                Work page
              </Link>
              .
            </p>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
