import type { Metadata } from 'next';
import Link from 'next/link';
import LogoStrip from './LogoStrip';
import WindMode from './WindMode';

export const metadata: Metadata = {
  title: 'Taborlin — Software Businesses Built With Agents',
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
  alternates: {
    canonical: 'https://taborlin.co',
  },
};

const stats = [
  { value: 'Build', label: 'Focused products aimed at real customer workflows' },
  { value: 'Operate', label: 'Agents handle the repetitive work behind approvals and audit trails' },
  { value: 'Learn', label: 'Revenue, usage, and support signal decide what gets more investment' },
];

const work = [
  {
    title: 'CheapTokens',
    label: 'Discounted Venice API credits',
    url: 'https://cheaptokens.ai',
    status: 'Live product',
    description:
      'Buy discounted Venice-compatible API credits, test models in the playground, and pay with card or x402. The product handles checkout, key issuance, account balances, and reconciliation.',
  },
  {
    title: 'Sonde',
    label: 'Weather market intelligence',
    url: 'https://sonde.taborlin.co',
    status: 'Live preview',
    description:
      'A public weather-market scanner using real Kalshi, Polymarket, and Open-Meteo data. Proprietary forecast and API surfaces are being staged behind the current free preview.',
  },
  {
    title: 'Studio',
    label: 'AI video direction workspace',
    url: 'https://studio.taborlin.co',
    status: 'Live product',
    description:
      'Storyboard Studio helps creators block scenes in 3D, generate video takes with their own Venice key, compare results, and keep project assets organized.',
  },
  {
    title: 'Champion',
    label: 'Portable revenue memory',
    url: 'https://champion.taborlin.co',
    status: 'Live product',
    description:
      'A personal sales workspace for AE and BD operators. Champion keeps account research, relationship history, meeting prep, stale-deal revival, and CRM handoff in one place.',
  },
  {
    title: 'Soshi',
    label: 'Approval-first social growth',
    url: 'https://soshi.taborlin.co',
    status: 'Live product',
    description:
      'Plan posts, review AI drafts, schedule approved content, track replies, and keep social growth moving without letting agents publish unchecked.',
  },
  {
    title: 'Spatix',
    label: 'AI-native maps',
    url: 'https://spatix.io',
    status: 'Open-source tool',
    description:
      'Create maps without GIS friction. Spatix turns files, geodata, and agent requests into shareable maps through a web app, API, and MCP surface.',
  },
  {
    title: 'Open Crypto Tax Helper',
    label: 'Agent-friendly crypto records',
    url: 'https://onchain-wallets-dashboard.vercel.app',
    status: 'Open-source tool',
    description:
      'A self-hosted wallet and transaction organizer for missing-cost-basis review. Agents can propose fixes while humans approve changes with an audit trail.',
  },
];

const capabilities = [
  {
    title: 'Revenue-first builds',
    description:
      'We prefer products with a clear path to payment: API credits, workflow software, market data, sales tools, and services where speed matters.',
  },
  {
    title: 'Agent operations',
    description:
      'Agents do the research, drafting, monitoring, reconciliation, and follow-up. Humans approve the parts that create risk or represent the company.',
  },
  {
    title: 'Trust controls',
    description:
      'Payments, credentials, publishing, customer data, and external actions get explicit controls: approvals, audit logs, limits, and visible failure states.',
  },
  {
    title: 'Distribution loops',
    description:
      'Every product needs a route to users. We build around repeatable outreach, public proof, useful APIs, and operator workflows that compound over time.',
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
          <a href="#capabilities" className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors hidden sm:block">
            Approach
          </a>
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
              <span className="block sm:inline">Small software</span>{' '}
              <span className="block sm:inline">businesses,</span>
            </span>
            <span className="block text-[#a1a1aa]">
              <span className="block sm:inline">built with agents.</span>
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#a1a1aa] max-w-2xl leading-relaxed">
            Taborlin builds focused internet products where agents sell, research,
            reconcile, monitor, and route decisions back to humans when judgment matters.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="#work"
              className="text-sm text-[#06060B] bg-[#fafafa] hover:bg-[#e4e4e7] transition-colors px-5 py-2.5 rounded-md font-medium"
            >
              See what we run
            </a>
            <a
              href="mailto:hello@taborlin.co"
              className="text-sm text-[#fafafa] border border-[#2a2a35] hover:border-[#3a3a45] transition-colors px-5 py-2.5 rounded-md font-medium"
            >
              Work with us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="pb-20 sm:pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 border border-[#1f1f28] rounded-xl p-6 sm:p-8 bg-[#0a0a10]">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`text-center ${i < stats.length - 1 ? 'sm:border-r sm:border-[#1f1f28]' : ''}`}>
              <p className="text-2xl sm:text-3xl font-semibold text-[#fafafa] tracking-tight">{stat.value}</p>
              <p className="text-xs sm:text-sm text-[#a1a1aa]/60 mt-1">{stat.label}</p>
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
          <h2 className="text-2xl font-semibold text-[#fafafa] mb-2">What We Run</h2>
          <p className="text-sm text-[#a1a1aa]">
            Public products, previews, and tools that show how we think about agent-operated software.
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

function Capabilities() {
  return (
    <section id="capabilities" className="py-20 sm:py-24 border-t border-[#1f1f28]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[#fafafa] mb-2">Operating Model</h2>
          <p className="text-sm text-[#a1a1aa]">How we decide what to build and what deserves more time</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capabilities.map((cap) => (
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
        <h2 className="text-2xl font-semibold text-[#fafafa] mb-3">Bring a sharp problem</h2>
        <p className="text-sm text-[#a1a1aa] mb-8 max-w-md mx-auto leading-relaxed">
          We are most useful when there is a real workflow, a real customer,
          and a reason agents can make the operation faster or cheaper.
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
          <a href="#capabilities" className="hover:text-[#a1a1aa] transition-colors">Approach</a>
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
        <Stats />
        <LogoStrip />
        <Work />
        <Capabilities />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
