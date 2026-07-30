import type { Metadata } from 'next';
import Link from 'next/link';
import LogoStrip from './LogoStrip';
import WindMode from './WindMode';

export const metadata: Metadata = {
  title: 'Taborlin | Product Studio and Software Consulting',
  description:
    'Taborlin builds and operates its own software products and takes on selected consulting work for teams that need practical software, automation, and agent operations.',
  openGraph: {
    title: 'Taborlin | Product Studio and Software Consulting',
    description:
      'Taborlin builds and operates its own software products and takes on selected consulting work for teams that need practical software, automation, and agent operations.',
    url: 'https://taborlin.co',
    siteName: 'Taborlin',
    type: 'website',
  },
  alternates: {
    canonical: 'https://taborlin.co',
  },
};

const studioModel = [
  {
    value: 'Owned products',
    label: 'Live software businesses we build, operate, and learn from directly',
  },
  {
    value: 'Client builds',
    label: 'MVPs, internal tools, data products, APIs, and automation for selected teams',
  },
  {
    value: 'Agent operations',
    label: 'Research, monitoring, QA, reconciliation, reporting, and follow-up behind human approval',
  },
];

const work = [
  {
    title: 'CheapTokens',
    label: 'Discounted Venice API credits',
    url: 'https://cheaptokens.ai',
    status: 'Live product',
    description:
      'Discounted Venice-compatible API credits with card and x402 checkout, key issuance, balances, usage, and reconciliation built into the product.',
  },
  {
    title: 'Sonde',
    label: 'Weather market intelligence',
    url: 'https://sonde.taborlin.co',
    status: 'Live preview',
    description:
      'Weather prediction-market intelligence built on live Kalshi, Polymarket, and Open-Meteo data, with proprietary forecast and API surfaces staged behind the public preview.',
  },
  {
    title: 'Studio',
    label: 'AI video direction workspace',
    url: 'https://studio.taborlin.co',
    status: 'Live product',
    description:
      'A storyboard and AI video direction workspace where creators block scenes in 3D, generate takes with their own Venice key, and keep project assets organized.',
  },
  {
    title: 'Champion',
    label: 'Portable revenue memory',
    url: 'https://champion.taborlin.co',
    status: 'Live product',
    description:
      'A portable revenue-memory workspace for account research, relationship history, meeting prep, stale-deal revival, and CRM handoff.',
  },
  {
    title: 'Soshi',
    label: 'Approval-first social growth',
    url: 'https://soshi.taborlin.co',
    status: 'Live product',
    description:
      'Approval-first social operations: plan posts, review drafts, schedule approved content, track replies, and keep distribution moving without unchecked agent publishing.',
  },
  {
    title: 'Spatix',
    label: 'AI-native maps',
    url: 'https://spatix.io',
    status: 'Open-source tool',
    description:
      'Map creation without GIS friction. Spatix turns files, geodata, and agent requests into shareable maps through a web app, API, and MCP surface.',
  },
  {
    title: 'Open Crypto Tax Helper',
    label: 'Agent-friendly crypto records',
    url: 'https://onchain-wallets-dashboard.vercel.app',
    status: 'Open-source tool',
    description:
      'A self-hosted wallet and transaction organizer for cost-basis review, agent-proposed fixes, human approval, and audit trails.',
  },
];

const services = [
  {
    title: 'Product builds',
    description:
      'Focused MVPs and workflow products for founders, operators, and small teams that already know the job they need software to do.',
  },
  {
    title: 'Automation and agent ops',
    description:
      'Research, data collection, drafting, QA, reporting, reconciliation, and follow-up loops that run continuously with approvals where risk matters.',
  },
  {
    title: 'Data and API products',
    description:
      'Market-data tools, weather products, crypto workflows, dashboards, feeds, and APIs where freshness, provenance, and reliability matter.',
  },
  {
    title: 'Technical rescue',
    description:
      'Audit, stabilize, simplify, and ship stalled software. We are useful when a product is close but messy, slow, fragile, or missing the operating layer.',
  },
];

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#06060B]/80 backdrop-blur-md border-b border-[#1f1f28]/50">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-[#fafafa] text-sm font-semibold tracking-tight">
          Taborlin
        </Link>
        <div className="flex items-center gap-6 sm:gap-8">
          <a href="#work" className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
            Products
          </a>
          <a href="#services" className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors hidden sm:block">
            Services
          </a>
          <Link href="/updates" className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors hidden sm:block">
            Updates
          </Link>
          <a
            href="mailto:hello@taborlin.co"
            className="text-sm text-[#06060B] bg-[#fafafa] hover:bg-[#e4e4e7] transition-colors px-3.5 py-1.5 rounded-md font-medium"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 sm:pt-40 pb-16 sm:pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="animate-fade-in">
          <h1 className="text-[2rem] sm:text-5xl lg:text-[3.5rem] font-semibold text-[#fafafa] tracking-tight leading-[1.18] sm:leading-[1.15]">
            <span className="block">
              <span className="block sm:inline">We build and run</span>{' '}
              <span className="block sm:inline">software products.</span>
            </span>
            <span className="block text-[#a1a1aa]">
              <span className="block sm:inline">We help serious teams do the same.</span>
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#a1a1aa] max-w-2xl leading-relaxed">
            Taborlin is a product studio and software consulting shop. We own live
            products, take on selected client builds, and use agents for the repetitive
            work behind research, QA, reporting, reconciliation, and follow-up.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="#work"
              className="text-sm text-[#06060B] bg-[#fafafa] hover:bg-[#e4e4e7] transition-colors px-5 py-2.5 rounded-md font-medium"
            >
              View products
            </a>
            <a
              href="mailto:hello@taborlin.co"
              className="text-sm text-[#fafafa] border border-[#2a2a35] hover:border-[#3a3a45] transition-colors px-5 py-2.5 rounded-md font-medium"
            >
              Start a project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StudioModel() {
  return (
    <section className="pb-20 sm:pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border border-[#1f1f28] rounded-xl p-6 sm:p-8 bg-[#0a0a10]">
          {studioModel.map((stat, i) => (
            <div key={stat.label} className={`text-left ${i < studioModel.length - 1 ? 'sm:border-r sm:border-[#1f1f28] sm:pr-6' : ''}`}>
              <p className="text-2xl sm:text-3xl font-semibold text-[#fafafa] tracking-tight">{stat.value}</p>
              <p className="text-xs sm:text-sm text-[#a1a1aa]/60 mt-2 leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="py-20 sm:py-24 border-t border-[#1f1f28]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[#fafafa] mb-2">Products We Operate</h2>
          <p className="text-sm text-[#a1a1aa]">
            Owned products, previews, and open tools. This is the proof behind the consulting work.
          </p>
        </div>
        <div className="space-y-4">
          {work.map((item) => (
            <div
              key={item.title}
              className="group bg-[#0a0a10] border border-[#1f1f28] rounded-xl p-6 sm:p-8 hover:border-[#2a2a35] transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener"
                    className="text-lg font-semibold text-[#fafafa] hover:text-blue-400 transition-colors"
                  >
                    {item.title}
                    <span className="inline-block ml-1.5 text-[#a1a1aa] text-sm group-hover:text-blue-400 transition-colors">&#8599;</span>
                  </a>
                ) : (
                  <h3 className="text-lg font-semibold text-[#fafafa]">{item.title}</h3>
                )}
                <span className="text-sm text-[#a1a1aa]/50">{item.label}</span>
              </div>
              <p className="text-sm text-[#a1a1aa] leading-relaxed mb-4 max-w-2xl">
                {item.description}
              </p>
              <span className="text-xs text-[#a1a1aa]/50 bg-[#16161e] border border-[#1f1f28] px-2.5 py-1 rounded-md">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-20 sm:py-24 border-t border-[#1f1f28]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[#fafafa] mb-2">Work We Take On</h2>
          <p className="text-sm text-[#a1a1aa]">
            Consulting work has to be specific. The best fit is a real workflow, a product owner,
            and a reason to ship now.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((cap) => (
            <div key={cap.title} className="bg-[#0a0a10] border border-[#1f1f28] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[#fafafa] mb-3">{cap.title}</h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24 border-t border-[#1f1f28]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold text-[#fafafa] mb-3">Have something specific to build?</h2>
        <p className="text-sm text-[#a1a1aa] mb-8 max-w-md mx-auto leading-relaxed">
          Send the workflow, the customer, the current workaround, and what happens if it ships.
          If there is a real business case, we will tell you how we would attack it.
        </p>
        <a
          href="mailto:hello@taborlin.co"
          className="inline-block text-sm text-[#06060B] bg-[#fafafa] hover:bg-[#e4e4e7] transition-colors px-6 py-3 rounded-md font-medium"
        >
          hello@taborlin.co
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t border-[#1f1f28]">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#a1a1aa]/40">&copy; 2026 Taborlin</p>
        <div className="flex gap-6 text-xs text-[#a1a1aa]/40">
          <a href="#work" className="hover:text-[#a1a1aa] transition-colors">Work</a>
          <a href="#services" className="hover:text-[#a1a1aa] transition-colors">Services</a>
          <Link href="/updates" className="hover:text-[#a1a1aa] transition-colors">Updates</Link>
          <a href="mailto:hello@taborlin.co" className="hover:text-[#a1a1aa] transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="relative isolate min-h-screen bg-[#06060B]">
      <WindMode />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <StudioModel />
        <LogoStrip />
        <Work />
        <Services />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
