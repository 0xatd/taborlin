import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import LogoStrip from './LogoStrip';
import WindMode from './WindMode';
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  PARTNER_MAILTO,
  PROJECT_MAILTO,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from './site';

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
};

type LinkItem = { label: string; href: string };

const services = [
  {
    kicker: '01',
    title: 'AI agents',
    description:
      'We build AI agents that complete complex, time-intensive work so teams can move faster.',
    points: [
      'Booking, intake, and lead-recovery assistants',
      'Research, follow-up, and account-memory agents',
      'Agent skills, MCP servers, and tool integrations',
    ],
  },
  {
    kicker: '02',
    title: 'Software & internal tools',
    description:
      'We build software and internal tools that automate routine work, clarify data and trends, and help teams communicate more effectively.',
    points: [
      'Dashboards and operator consoles',
      'Workflow automation across the tools you already use',
      'Full-stack web apps, APIs, and checkout flows',
    ],
  },
  {
    kicker: '03',
    title: 'Data & content',
    description:
      'We use open and proprietary data to make AI agents and software more accurate, more useful, and more effective.',
    points: [
      'Data pipelines, enrichment, and reconciliation',
      'AI-generated media from structured data',
      'Maps, weather, and geospatial products',
    ],
  },
];

const steps = [
  {
    title: 'Scope',
    description:
      'Start with one workflow that is slow, manual, or expensive and agree on what “done” looks like.',
  },
  {
    title: 'Prototype',
    description:
      'Get a working version you can click through with real inputs, so decisions are made on evidence instead of slides.',
  },
  {
    title: 'Ship & iterate',
    description:
      'Harden it for production, deploy it where your team works, and keep improving it based on real usage.',
  },
];

const caseStudies: {
  title: string;
  tag: string;
  status: string;
  summary: string;
  built: string[];
  stack: string[];
  links: LinkItem[];
}[] = [
  {
    title: 'HVAC Lead Recovery Assistant',
    tag: 'AI booking assistant',
    status: 'Sales demo',
    summary:
      'HVAC owners lose money when web visitors and after-hours callers don’t become booked jobs. This assistant answers instantly, qualifies the issue, captures contact and address, books a service window, and sends the office a clean dispatch packet.',
    built: [
      'Homeowner-facing site with an embedded AI booking conversation',
      'Scripted flows for no-heat, AC leaks, and other common calls',
      'Owner dashboard with the dispatch packet and workflow state',
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Live demo', href: 'https://lyralai.github.io/hvac-booking-demo/' },
      { label: 'Code', href: 'https://github.com/lyralai/hvac-booking-demo' },
    ],
  },
  {
    title: 'Open Crypto Tax Helper',
    tag: 'Crypto accounting with software + AI',
    status: 'Open-source (earlier version)',
    summary:
      'Self-hosted accounting software that reconstructs onchain history from a main wallet: trace transactions, investigate missing cost basis, and find forgotten wallets — with AI proposing fixes that you approve.',
    built: [
      'Wallet aggregation across Ethereum, Bitcoin, Solana, Base, and more',
      'Unknown-cost-basis finder and forgotten-wallet discovery',
      'MCP server, REST API, and review-ready worksheet exports',
    ],
    stack: ['TypeScript', 'Postgres', 'MCP', 'Docker'],
    links: [
      { label: 'Code', href: 'https://github.com/0xatd/onchain-wallets-dashboard' },
      { label: 'Background', href: 'https://github.com/0xatd/0xatd/blob/main/projects/crypto-records.md' },
    ],
  },
  {
    title: 'CheapTokens Agent Skills',
    tag: 'Agent skills for AI inference',
    status: 'Public skill pack',
    summary:
      'A skill pack that teaches agents to buy and route discounted Venice AI credits through CheapTokens, call OpenAI-compatible endpoints, and complete x402 purchase flows — installable in OpenClaw and other skill-aware runtimes.',
    built: [
      'CheapTokens router skill for key detection and credit routing',
      'Official Venice API skills synced for the full model surface',
      'Drop-in install for OpenClaw and other agent runtimes',
    ],
    stack: ['Agent skills', 'Venice API', 'x402', 'OpenClaw'],
    links: [
      { label: 'Code', href: 'https://github.com/0xatd/cheaptokens-skills' },
      { label: 'cheaptokens.ai', href: 'https://cheaptokens.ai' },
    ],
  },
  {
    title: 'AI Weather Forecast Video',
    tag: 'Data-to-video pipeline',
    status: 'Open-source recipe',
    summary:
      'A Python recipe that turns structured forecast data into short, presenter-style forecast videos using Venice text-to-video and ffmpeg compositing. Works with Open-Meteo, WeatherXM-style data, or any provider through a small adapter.',
    built: [
      'Provider adapters that normalize forecasts into one schema',
      'Generated forecast dashboard plus AI presenter clip',
      'ffmpeg compositing into a finished video package',
    ],
    stack: ['Python', 'Venice API', 'ffmpeg', 'Open-Meteo'],
    links: [{ label: 'Code', href: 'https://github.com/0xatd/weatherxm-venice-forecast-video' }],
  },
  {
    title: 'Agent Skill Tree',
    tag: 'Agent design tool',
    status: 'Public prototype',
    summary:
      'An interactive, game-style skill tree for designing what an agent can do: allocate capability nodes, explore archetype synergies, and export an agent specification.',
    built: [
      'Interactive allocation tree with archetypes and synergies',
      'Exportable agent specifications',
      'Optional persistence for saved builds',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    links: [
      { label: 'Live prototype', href: 'https://skill-tree-topaz.vercel.app' },
      { label: 'Code', href: 'https://github.com/0xatd/skill-tree' },
    ],
  },
];

const products = [
  {
    title: 'CheapTokens',
    label: 'Discounted AI inference credits for developers',
    url: 'https://cheaptokens.ai',
    status: 'Live product',
    metric: 'Checkout and API-key provisioning',
    image: '/product-screenshots/cheaptokens.png',
    imageAlt: 'CheapTokens homepage showing discounted Venice API credit pricing',
    description:
      'CheapTokens lets developers buy discounted Venice API credits, pay through a lightweight checkout flow, and start using a compatible API key without a sales call or subscription.',
  },
  {
    title: 'Champion',
    label: 'Sales memory for AE and BD workflows',
    url: 'https://champion.taborlin.co',
    status: 'Private alpha',
    metric: 'Account research, follow-up, and deal memory',
    image: '/product-screenshots/champion.png',
    imageAlt: 'Champion homepage for a personal AI rolodex for successful account executives',
    description:
      'Champion is a private sales-memory tool for account research, contacts, meetings, follow-up, and next-best actions, built around the relationship context that usually gets lost inside company CRMs.',
  },
  {
    title: 'Soshi',
    label: 'Audience growth tool',
    url: 'https://soshi.taborlin.co',
    status: 'Internal tool',
    metric: 'Content ideas, scheduling, and analytics',
    image: '/product-screenshots/soshi.png',
    imageAlt: 'Soshi homepage showing a social media growth workspace',
    description:
      'Soshi helps Taborlin turn product work into social content, build a consistent publishing calendar, track what performs, and double down on the formats that grow audience, leads, and attention.',
  },
];

const capabilities = [
  {
    title: 'Revenue & Partnerships',
    description:
      'Enterprise Holdings deal structuring, executive relationship development, and strategic partnerships across energy, technology, and infrastructure. Direct experience navigating procurement, compliance, and multi-stakeholder sales cycles.',
  },
  {
    title: 'GTM & Strategy',
    description:
      'Market positioning, pricing strategy, distribution, and channel development. Product-led growth for SaaS. Marketplace dynamics and partner-driven go-to-market.',
  },
  {
    title: 'Product & Execution',
    description:
      'Zero-to-one product development, rapid prototyping, and roadmap prioritization. Multi-product operations with a bias toward shipping fast and iterating on signal.',
  },
  {
    title: 'Software, Data & AI',
    description:
      'Full-stack product builds, data infrastructure, and AI-native workflows. Technical enough to ship production software, commercially focused on what moves the needle.',
  },
];

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Products', href: '#products' },
  { label: 'About', href: '#about' },
];

function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`h-3.5 w-3.5 ${className}`}
    >
      <path d="M5 11L11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A small, decorative sigil — a quiet nod to Taborlin the Great. */
function Sigil({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeOpacity="0.55" />
      <circle cx="16" cy="16" r="9.5" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="1.5 2.5" />
      <path d="M9.5 10h13M16 10v13M12 20.5l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-12 sm:mb-14 max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-display text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base text-muted leading-relaxed">{description}</p> : null}
    </div>
  );
}

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-md">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 sm:pr-20 xl:pr-6">
        <Link href="/" className="flex items-center gap-2.5 text-foreground">
          <Sigil className="h-7 w-7 text-accent" />
          <span className="font-display text-lg font-medium tracking-tight">Taborlin</span>
        </Link>
        <div className="flex items-center gap-5 sm:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden md:block text-sm text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#work"
            className="md:hidden text-sm text-muted hover:text-foreground transition-colors"
          >
            Work
          </a>
          <a
            href="#contact"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background hover:bg-accent-strong transition-colors"
          >
            Start a project
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-32 sm:pt-40 pb-20 sm:pb-24">
      <div className="hero-backdrop pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Applied AI &amp; software studio
          </p>
          <h1
            id="hero-title"
            className="mt-6 font-display text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-[4.4rem] font-medium tracking-tight text-foreground"
          >
            AI agents and software that{' '}
            <span className="text-gradient-gold italic pr-[0.08em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">do real work</span> for your business.
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted">
            Taborlin designs and builds AI agents, internal tools, and data products that take
            complex, time-intensive work off your team — from a first working prototype to
            production software.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={PROJECT_MAILTO}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background shadow-[0_8px_30px_-10px_rgba(217,179,108,0.6)] hover:bg-accent-strong transition-colors"
            >
              Start a project
              <ArrowUpRight />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:border-accent/50 transition-colors"
            >
              See the work
            </a>
          </div>
          <p className="mt-6 text-sm text-subtle">
            Or email{' '}
            <a href={PROJECT_MAILTO} className="text-foreground underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <aside aria-label="Recent builds" className="card min-w-0 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-subtle">Recent builds</p>
          <ul className="mt-4 divide-y divide-border/70">
            {caseStudies.slice(0, 4).map((item) => (
              <li key={item.title}>
                <a
                  href={item.links[0].href}
                  target="_blank"
                  rel="noopener"
                  className="group flex items-start justify-between gap-4 py-3.5"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {item.title}
                    </span>
                    <span className="block text-xs text-subtle mt-0.5">{item.tag}</span>
                  </span>
                  <ArrowUpRight className="mt-1 shrink-0 text-subtle group-hover:text-accent transition-colors" />
                </a>
              </li>
            ))}
          </ul>
          <a href="#work" className="mt-2 inline-block text-sm text-accent hover:text-accent-strong transition-colors">
            All case studies →
          </a>
        </aside>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="What we build"
          description="Practical AI and software for teams that want the work done, not another dashboard to babysit."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="card card-hover flex flex-col p-7">
              <span className="font-display text-sm text-accent">{service.kicker}</span>
              <h3 className="mt-4 text-xl font-semibold text-foreground">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
              <ul className="mt-6 space-y-2.5 border-t border-border/70 pt-5">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm text-foreground/85">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <h3 className="font-display text-2xl font-medium text-foreground">How we work together</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted max-w-sm">
              Small, focused engagements that get to something real quickly.
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-xl border border-border/70 p-5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/40 text-xs font-semibold text-accent">
                  {i + 1}
                </span>
                <p className="mt-4 text-sm font-semibold text-foreground">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-20 sm:py-28 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title="Case studies"
          description="Real builds with public code or demos you can open — agents, data pipelines, and tools."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {caseStudies.map((item, index) => (
            <article
              key={item.title}
              className={`card card-hover flex flex-col p-7 ${index === 0 ? 'lg:col-span-2' : ''}`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-accent/30 bg-accent/5 px-2.5 py-0.5 text-xs font-medium text-accent">
                  {item.tag}
                </span>
                <span className="text-xs text-subtle">{item.status}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-foreground">
                {item.title}
              </h3>
              <div className={index === 0 ? 'mt-3 grid gap-6 lg:grid-cols-2' : 'mt-3'}>
                <p className="text-sm leading-relaxed text-muted">{item.summary}</p>
                <ul className={`space-y-2 ${index === 0 ? '' : 'mt-5'}`}>
                  {item.built.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm text-foreground/85">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-6">
                <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
                  {item.stack.map((s) => (
                    <li key={s} className="rounded-md bg-surface-2 border border-border/70 px-2 py-0.5 text-xs text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {item.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors"
                    >
                      {link.label}
                      <span className="sr-only"> for {item.title} (opens in a new tab)</span>
                      <ArrowUpRight />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-subtle">
          More projects on{' '}
          <a href={GITHUB_URL} target="_blank" rel="noopener" className="text-foreground underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" aria-labelledby="products-title" className="py-20 sm:py-28 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          id="products-title"
          eyebrow="Products"
          title="Things we run ourselves"
          description="Live products and working tools from Taborlin: AI infrastructure, sales memory, and audience growth."
        />
        <div className="space-y-6">
          {products.map((item, index) => {
            const imageOnRight = index % 2 === 1;
            return (
              <article key={item.title} className="card card-hover group overflow-hidden">
                <div className={imageOnRight ? 'grid lg:grid-cols-[0.9fr_1.1fr]' : 'grid lg:grid-cols-[1.1fr_0.9fr]'}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener"
                    tabIndex={-1}
                    aria-hidden="true"
                    className={`relative block aspect-[16/10] overflow-hidden border-b border-border bg-background lg:border-b-0 ${
                      imageOnRight ? 'lg:order-2 lg:border-l' : 'lg:border-r'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 600px, 100vw"
                      className="product-shot object-cover object-top group-hover:scale-[1.02]"
                    />
                  </a>
                  <div className={`min-w-0 p-7 sm:p-8 flex flex-col justify-center ${imageOnRight ? 'lg:order-1' : ''}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">{item.status}</span>
                      <span className="text-xs text-subtle">{item.metric}</span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-foreground/75">{item.label}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{item.description}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener"
                      className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-accent/50 hover:text-accent transition-colors"
                    >
                      Visit {item.title}
                      <span className="sr-only"> (opens in a new tab)</span>
                      <ArrowUpRight />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-28 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          id="about-title"
          eyebrow="Why Taborlin"
          title="Commercial instincts, technical hands"
          description="Where product, partnerships, and execution overlap — so what gets built is something the business can actually sell, use, and measure."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {capabilities.map((cap) => (
            <div key={cap.title} className="rounded-xl border border-border/70 bg-surface/60 p-6">
              <h3 className="text-sm font-semibold text-foreground">{cap.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-[radial-gradient(ellipse_at_top_right,rgba(217,179,108,0.16),transparent_60%),linear-gradient(180deg,#12121b,#0b0b12)] p-8 sm:p-12 lg:p-14">
          <Sigil className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 text-accent/15" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Contact</p>
              <h2 id="contact-title" className="mt-3 font-display text-3xl sm:text-5xl font-medium tracking-tight text-foreground">
                Have work an agent should be doing?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
                Send a short note about the workflow you want to automate or the product you want
                built. A few lines is plenty to start the conversation.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={PROJECT_MAILTO}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background hover:bg-accent-strong transition-colors"
                >
                  Email {CONTACT_EMAIL}
                  <ArrowUpRight />
                </a>
              </div>
              <p className="mt-6 text-sm text-subtle max-w-xl">
                Also open to partnerships, GTM, and operator roles where product and agent-operated
                software execution overlap —{' '}
                <a href={PARTNER_MAILTO} className="text-foreground underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
                  get in touch
                </a>
                .
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-background/50 p-6">
              <p className="text-sm font-semibold text-foreground">Helpful to include</p>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {[
                  'The task or workflow that’s slow, manual, or expensive today',
                  'Who does it now and which tools or data are involved',
                  'What a good outcome looks like, and any timing',
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Sigil className="h-6 w-6 text-accent/80" />
          <div>
            <p className="text-sm text-foreground">&copy; {new Date().getFullYear()} Taborlin</p>
            <p className="text-xs text-subtle">Named for Taborlin the Great, who knew the names of all things.</p>
          </div>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-subtle">
          <a href="#services" className="hover:text-foreground transition-colors">Services</a>
          <a href="#work" className="hover:text-foreground transition-colors">Work</a>
          <a href="#products" className="hover:text-foreground transition-colors">Products</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener" className="hover:text-foreground transition-colors">GitHub</a>
          <a href={PROJECT_MAILTO} className="hover:text-foreground transition-colors">{CONTACT_EMAIL}</a>
        </nav>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="relative isolate min-h-screen bg-background">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <WindMode />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <LogoStrip />
        <Services />
        <Work />
        <Products />
        <About />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
