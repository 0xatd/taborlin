import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT_EMAIL, CONTACT_MAILTO, GITHUB_URL, SITE_DESCRIPTION, SITE_TITLE, SITE_URL, X_URL } from './site';

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
};

const work = [
  {
    name: 'CheapTokens',
    description: 'Discounted AI inference credits for developers, no sales call or subscription.',
    href: 'https://cheaptokens.ai',
  },
  {
    name: 'HVAC booking assistant',
    description: 'An AI assistant that answers after-hours leads and books service calls for HVAC companies.',
    href: 'https://lyralai.github.io/hvac-booking-demo/',
  },
  {
    name: 'Open Crypto Tax Helper',
    description: 'Self-hosted software that traces wallets and finds missing cost basis, with AI help.',
    href: 'https://github.com/0xatd/onchain-wallets-dashboard',
  },
  {
    name: 'AI forecast video',
    description: 'Turns weather forecast data into short AI-generated forecast videos.',
    href: 'https://github.com/0xatd/weatherxm-venice-forecast-video',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="mx-auto max-w-2xl px-6">
        <header className="pt-10 sm:pt-14">
          <Link href="/" className="text-[15px] font-semibold tracking-tight">
            Taborlin
          </Link>
        </header>

        <main id="main">
          <section aria-labelledby="intro" className="pt-24 pb-20 sm:pt-36 sm:pb-28">
            <h1 id="intro" className="text-3xl sm:text-[2.6rem] font-semibold leading-[1.15] tracking-tight">
              Taborlin builds AI agents and software for businesses.
            </h1>
            <p className="mt-5 text-lg text-muted leading-relaxed">
              Tools that take slow, manual work off your team.
            </p>
            <a
              href={CONTACT_MAILTO}
              className="mt-9 inline-block rounded-md bg-foreground px-5 py-3 text-[15px] font-medium text-background hover:opacity-85 transition-opacity"
            >
              Get in touch
            </a>
          </section>

          <section aria-labelledby="work" className="pb-24 sm:pb-32">
            <h2 id="work" className="text-sm font-medium text-muted">
              Work
            </h2>
            <ul className="mt-4 border-t border-border">
              {work.map((item) => (
                <li key={item.name} className="border-b border-border">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    className="group flex flex-col gap-1 py-5 sm:flex-row sm:gap-8"
                  >
                    <span className="font-medium sm:w-52 sm:shrink-0 group-hover:underline underline-offset-4">
                      {item.name}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                    <span className="text-muted">{item.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </main>

        <footer className="flex flex-wrap gap-x-6 gap-y-2 border-t border-border py-8 text-sm text-muted">
          <a href={CONTACT_MAILTO} className="hover:text-foreground">{CONTACT_EMAIL}</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener" className="hover:text-foreground">GitHub</a>
          <a href={X_URL} target="_blank" rel="noopener" className="hover:text-foreground">X</a>
        </footer>
      </div>
    </div>
  );
}
