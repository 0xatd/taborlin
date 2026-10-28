import type { Metadata } from 'next';
import Image from 'next/image';
import { CONTACT_EMAIL, CONTACT_MAILTO, SITE_URL } from '../site';
import { ExternalMark, SiteFooter, SiteHeader, SkipLink } from '../SiteChrome';

const WORK_DESCRIPTION =
  'Projects built by Taborlin: what each one does, how it was built and where it stands today.';

export const metadata: Metadata = {
  title: 'Work',
  description: WORK_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/work` },
  openGraph: {
    title: 'Work — Taborlin',
    description: WORK_DESCRIPTION,
    url: `${SITE_URL}/work`,
    siteName: 'Taborlin',
    type: 'website',
  },
};

type Project = {
  name: string;
  area: string;
  status: 'Live' | 'Demo' | 'Prototype' | 'Paused' | 'Archived';
  summary: string;
  image?: { src: string; alt: string; width: number; height: number };
  links?: { label: string; href: string }[];
  problem: string;
  built: string;
  boundary: string;
};

const projects: Project[] = [
  {
    name: 'CheapTokens',
    area: 'AI infrastructure',
    status: 'Live',
    summary: 'Discounted Venice AI API credits for text, images, video and audio. Buy credits and start building.',
    image: { src: '/portfolio/cheaptokens.png', alt: 'CheapTokens homepage', width: 1440, height: 1000 },
    links: [{ label: 'cheaptokens.ai', href: 'https://cheaptokens.ai' }],
    problem: 'Getting API access to capable models can mean a subscription or a sales conversation before any code gets written.',
    built: 'A straightforward storefront for prepaid API credits across text, image, video and audio models.',
    boundary: 'Live and the current focus.',
  },
  {
    name: 'HVAC booking assistant',
    area: 'AI agents',
    status: 'Demo',
    summary: 'An assistant that answers after-hours leads for an HVAC company, qualifies the job and books the visit.',
    image: {
      src: '/portfolio/hvac-booking-assistant.webp',
      alt: 'HVAC booking assistant demo showing the customer website, the booking conversation and the owner dashboard side by side',
      width: 1600,
      height: 1000,
    },
    links: [{ label: 'Try the demo', href: 'https://lyralai.github.io/hvac-booking-demo/' }],
    problem: 'When the office is closed, a homeowner with no heat has nobody to talk to, and the lead can go elsewhere.',
    built: 'A website chat widget that triages the issue (no heat, AC trouble, tune-up, replacement), collects contact and address details, offers a slot and hands the office a dispatch summary. The demo shows the homeowner view, the conversation and the owner dashboard together.',
    boundary: 'A self-contained public demo using a sample company.',
  },
  {
    name: 'Weather Atlas',
    area: 'Maps & data',
    status: 'Prototype',
    summary: 'Live radar and weather alerts on the same map as pipelines, energy sites and power lines.',
    image: {
      src: '/portfolio/weather-atlas.webp',
      alt: 'Weather Atlas map of North America with radar, an alert outline and a forecast timeline',
      width: 1600,
      height: 1000,
    },
    links: [{ label: 'Open the map', href: 'https://accuweather-map.vercel.app' }],
    problem: 'A weather feed shows where a storm is. An operator needs to know which of their sites and lines sit inside it.',
    built: 'AccuWeather and NOAA/NWS radar and alerts on an interactive map, joined to a public-source catalog of oil and gas fields, pipelines, LNG terminals and power lines. Alerts are ranked by exposure and can be saved and exported as images.',
    boundary: 'Public prototype built on AccuWeather data. It is not an AccuWeather product. Asset coverage is incomplete and it is not an operational warning service.',
  },
  {
    name: 'Open Crypto Tax Helper',
    area: 'Financial tools',
    status: 'Paused',
    summary: 'A self-hosted workspace for organizing wallet activity and reviewing missing cost basis, with AI help.',
    image: {
      src: '/portfolio/open-crypto-tax-helper.webp',
      alt: 'Open Crypto Tax Helper landing page',
      width: 1600,
      height: 1000,
    },
    links: [
      { label: 'See the app', href: 'https://onchain-wallets-dashboard.vercel.app' },
      { label: 'Source on GitHub', href: 'https://github.com/0xatd/onchain-wallets-dashboard' },
    ],
    problem: 'Wallet activity is scattered across chains and exchanges, with gaps that make records hard to review.',
    built: 'Read-only wallet tracking and CSV import, cost-basis lot matching, and an MCP server and REST API so an AI agent can propose fixes for a person to approve. Uncertain data stays visible for review.',
    boundary: 'Paused. A review aid, not a tax-filing service. Numbers and tax treatment need more validation before filing-grade use.',
  },
  {
    name: 'Studio',
    area: 'Creative software',
    status: 'Archived',
    summary: 'An exploration of AI filmmaking: 3D blocking, shot planning, director commands and generated takes in one workflow.',
    image: { src: '/portfolio/studio.png', alt: 'Studio, an archived AI filmmaking tool, showing a 3D scene', width: 1440, height: 1000 },
    problem: 'Going from an idea to a planned shot spans several creative tools and many decisions.',
    built: 'Connected scene blocking, shot specifications and generation workflows while keeping creative control. Built on an Emulsion-derived foundation, with extra planning and generation tools.',
    boundary: 'Archived. Shown without restarting the generation backend.',
  },
  {
    name: 'Arcane Labyrinth',
    area: 'Games & simulation',
    status: 'Prototype',
    summary: 'An action-game prototype exploring hero abilities, encounter design, boss phases and replayable runs.',
    image: { src: '/portfolio/labyrinth.webp', alt: 'Arcane Labyrinth project artwork', width: 1536, height: 1024 },
    problem: 'A replayable action game needs readable encounters and systems that play off each other, not just a scene.',
    built: 'Hero abilities, collision handling, encounter progression and boss phases working together.',
    boundary: 'Prototype. The image is project artwork, not a gameplay capture. No playable build is hosted.',
  },
  {
    name: 'Spatix',
    area: 'Maps & data',
    status: 'Archived',
    summary: 'Geospatial tools for turning files, coordinates and plain-language requests into maps.',
    problem: 'Geospatial data only helps once people can turn it into something they can explore.',
    built: 'Normalized geodata, map APIs and plain-language requests through agent-friendly interfaces, including MCP.',
    boundary: 'Archived. A past-work case study, not a hosted service.',
  },
];

const experiments: { name: string; text: string; tag: string; href?: string }[] = [
  { name: 'AI forecast video', text: 'Turns weather forecast data into short AI-generated forecast videos.', tag: 'Weather × AI video', href: 'https://github.com/0xatd/weatherxm-venice-forecast-video' },
  { name: 'Zillions', text: 'A base-building defense game: build up a castle, raise an army and hold off waves.', tag: 'Game prototype' },
  { name: 'PlotCraft', text: 'Maps meet a 3D sandbox. An exploration of editable places and property layouts.', tag: 'Maps × simulation' },
  { name: 'Gum Gum Valley', text: 'A small 3D adventure built around a squad of helpers with different abilities.', tag: 'Game prototype' },
  { name: 'MyChessCoach', text: 'A personal tool for reviewing games and learning from the moves that mattered.', tag: 'Learning tool' },
];

const archive = [
  { title: 'Agent workflows', names: 'Saga, Factory & Soshi', text: 'Internal systems for coordinating work, producing content and reviewing outputs.' },
  { title: 'Sales & finance', names: 'Champion, RateCheck & Capital Fit Check', text: 'Research workspaces and embedded-finance workflow prototypes.' },
  { title: 'Weather & markets', names: 'Weather.fun & Sonde', text: 'Forecast-data and market-research experiments. No trading-performance claims.' },
];

function StatusTag({ status }: { status: Project['status'] }) {
  const live = status === 'Live' || status === 'Demo';
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-[#3a9a5b]' : 'bg-[#b8b8b2]'}`} />
      {status}
    </span>
  );
}

function Chevron() {
  return (
    <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-45">
      +
    </span>
  );
}

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      <SkipLink />
      <div className="mx-auto max-w-2xl px-6">
        <SiteHeader current="work" />

        <main id="main">
          <section aria-labelledby="work-title" className="pt-20 pb-16 sm:pt-28 sm:pb-20">
            <h1 id="work-title" className="text-3xl sm:text-[2.6rem] font-semibold leading-[1.15] tracking-tight">
              Work
            </h1>
            <p className="mt-5 text-lg text-muted leading-relaxed">
              What Taborlin has built, how each project works and where it stands today. Some are
              live, some are demos, and some are paused or archived. Each one says which.
            </p>
          </section>

          <section aria-labelledby="selected" className="pb-20 sm:pb-28">
            <h2 id="selected" className="text-sm font-medium text-muted">
              Selected work
            </h2>
            <div className="mt-4 border-t border-border">
              {projects.map((p) => (
                <article key={p.name} className="border-b border-border py-10 sm:py-12">
                  {p.image ? (
                    <div className="mb-6 overflow-hidden rounded-lg border border-border bg-white">
                      <Image
                        src={p.image.src}
                        alt={p.image.alt}
                        width={p.image.width}
                        height={p.image.height}
                        sizes="(min-width: 672px) 624px, 100vw"
                        className="block h-auto w-full"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
                    <StatusTag status={p.status} />
                    <span className="text-xs text-muted">{p.area}</span>
                  </div>
                  <p className="mt-3 leading-relaxed text-muted">{p.summary}</p>
                  {p.links ? (
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-medium">
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-muted">
                          {l.label}
                          <ExternalMark />
                        </a>
                      ))}
                    </div>
                  ) : null}
                  <details className="group mt-5 rounded-lg border border-border bg-white/60">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
                      Project notes
                      <Chevron />
                    </summary>
                    <dl className="grid gap-4 border-t border-border px-4 py-4 text-[15px] leading-relaxed sm:grid-cols-[9rem_1fr] sm:gap-x-6">
                      <dt className="text-sm text-muted">The problem</dt>
                      <dd className="-mt-3 sm:mt-0">{p.problem}</dd>
                      <dt className="text-sm text-muted">How it was built</dt>
                      <dd className="-mt-3 sm:mt-0">{p.built}</dd>
                      <dt className="text-sm text-muted">Where it stands</dt>
                      <dd className="-mt-3 sm:mt-0">{p.boundary}</dd>
                    </dl>
                  </details>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="experiments" className="pb-20 sm:pb-28">
            <h2 id="experiments" className="text-sm font-medium text-muted">
              Experiments
            </h2>
            <p className="mt-2 text-[15px] text-muted">
              Games and side projects that work on the same craft: clear interaction, responsive
              systems and useful feedback.
            </p>
            <ul className="mt-4 border-t border-border">
              {experiments.map((e) => (
                <li key={e.name} className="flex flex-col gap-1 border-b border-border py-5 sm:flex-row sm:gap-8">
                  <span className="sm:w-52 sm:shrink-0">
                    {e.href ? (
                      <a href={e.href} target="_blank" rel="noopener" className="font-medium underline-offset-4 hover:underline">
                        {e.name}
                        <ExternalMark />
                      </a>
                    ) : (
                      <span className="font-medium">{e.name}</span>
                    )}
                    <span className="mt-0.5 block text-xs text-muted">{e.tag}</span>
                  </span>
                  <span className="text-muted">{e.text}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="archive" className="pb-20 sm:pb-28">
            <h2 id="archive" className="text-sm font-medium text-muted">
              From the archive
            </h2>
            <div className="mt-4 border-t border-border">
              {archive.map((a) => (
                <details key={a.title} className="group border-b border-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="flex flex-col gap-1 sm:flex-row sm:gap-8">
                      <span className="font-medium sm:w-52 sm:shrink-0">{a.title}</span>
                      <span className="text-muted">{a.names}</span>
                    </span>
                    <Chevron />
                  </summary>
                  <p className="pb-5 text-[15px] leading-relaxed text-muted sm:pl-60">
                    {a.text} Kept as past work, not offered as live services.
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section aria-labelledby="contact" className="pb-24 sm:pb-32">
            <h2 id="contact" className="text-2xl font-semibold tracking-tight">
              Have something in mind?
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              A rough brief is enough. Email{' '}
              <a href={CONTACT_MAILTO} className="text-foreground underline underline-offset-4">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`${CONTACT_MAILTO}?subject=${encodeURIComponent('Project enquiry')}`}
                className="inline-block rounded-md bg-foreground px-5 py-3 text-[15px] font-medium text-background hover:opacity-85 transition-opacity"
              >
                Discuss a project
              </a>
              <a
                href={`${CONTACT_MAILTO}?subject=${encodeURIComponent('Role or collaboration')}`}
                className="inline-block rounded-md border border-border px-5 py-3 text-[15px] font-medium hover:border-foreground/40"
              >
                Talk about a role or collaboration
              </a>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
