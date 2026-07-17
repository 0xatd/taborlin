import type { Metadata } from 'next';
import Link from 'next/link';
import LogoStrip from './LogoStrip';

export const metadata: Metadata = {
  title: 'Taborlin — Agent-Run Software Products',
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
  alternates: {
    canonical: 'https://taborlin.co',
  },
};

const stats = [
  { value: 'Products', label: 'AI software that transacts, publishes, tracks, and learns' },
  { value: 'Tools', label: 'Open-source utilities for agents, maps, and crypto records' },
  { value: 'Ops', label: 'Approvals, audit trails, metrics, and production guardrails' },
];

const work = [
  {
    title: 'CheapTokens',
    label: 'Discounted Venice API credits',
    url: 'https://cheaptokens.ai',
    status: 'Live product',
    description:
      'Buy credits, get a Venice-compatible API key, test it in the playground, and pay less for real inference usage. Built with x402, card settlement, key issuance, account flows, and reconciliation.',
  },
  {
    title: 'Champion',
    label: 'Personal sales agent',
    url: 'https://champion.taborlin.co',
    status: 'Live product',
    description:
      'A portable revenue-memory workspace for AE and BD operators. Champion keeps account research, relationship context, follow-up, meeting prep, and stale-deal revival in one place.',
  },
  {
    title: 'Soshi',
    label: 'Approval-first social growth',
    url: 'https://soshi.taborlin.co',
    status: 'Live product',
    description:
      'Plan content, review AI-generated drafts, schedule posts, track replies, and keep growth loops moving without letting agents publish unchecked.',
  },
  {
    title: 'Spatix',
    label: 'AI-native maps',
    url: 'https://spatix.io',
    status: 'Open-source tool',
    description:
      'Maps in seconds, no GIS skills needed. Spatix turns files, geodata, and agent requests into shareable maps through a web app, API, and MCP surface.',
  },
  {
    title: 'Open Crypto Tax Helper',
    label: 'Agent-friendly crypto records',
    url: 'https://onchain-wallets-dashboard.vercel.app',
    status: 'Open-source tool',
    description:
      'Self-hosted wallet and transaction organizer for missing-cost-basis review. Agents can propose fixes; humans approve changes with audit history intact.',
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
            Capabilities
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
          <h1 className="text-[2.15rem] sm:text-5xl lg:text-[3.5rem] font-semibold text-[#fafafa] tracking-tight leading-[1.18] sm:leading-[1.15]">
            <span className="block">Agent-run software products,</span>
            <span className="block text-[#a1a1aa]">operated in the real world.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#a1a1aa] max-w-2xl leading-relaxed">
            Taborlin builds focused AI products with payments, approvals, metrics,
            and production ops baked in. We launch systems that transact, publish,
            track, and learn.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="#work"
              className="text-sm text-[#06060B] bg-[#fafafa] hover:bg-[#e4e4e7] transition-colors px-5 py-2.5 rounded-md font-medium"
            >
              See the products
            </a>
            <a
              href="mailto:hello@taborlin.co"
              className="text-sm text-[#fafafa] border border-[#2a2a35] hover:border-[#3a3a45] transition-colors px-5 py-2.5 rounded-md font-medium"
            >
              Get in touch
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
          <h2 className="text-2xl font-semibold text-[#fafafa] mb-2">Products & Tools</h2>
          <p className="text-sm text-[#a1a1aa]">
            The public portfolio, narrowed to the strongest live products and useful open-source tools.
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
          <h2 className="text-2xl font-semibold text-[#fafafa] mb-2">Capabilities</h2>
          <p className="text-sm text-[#a1a1aa]">Where product, partnerships, and execution overlap</p>
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
        <h2 className="text-2xl font-semibold text-[#fafafa] mb-3">Let&apos;s talk</h2>
        <p className="text-sm text-[#a1a1aa] mb-8 max-w-md mx-auto leading-relaxed">
          Open to partnerships, GTM, and operator roles where product
          and agent-operated software execution overlap.
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
          <a href="#capabilities" className="hover:text-[#a1a1aa] transition-colors">Capabilities</a>
          <a href="mailto:hello@taborlin.co" className="hover:text-[#a1a1aa] transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#06060B]">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <LogoStrip />
        <Work />
        <Capabilities />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
