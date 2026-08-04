import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import LogoStrip from './LogoStrip';
import WindMode from './WindMode';

export const metadata: Metadata = {
  title: 'Taborlin — Building Agents and Applied AI Products',
  description:
    'Taborlin builds agents and applied AI products for inference, sales, social operations, maps, and data workflows.',
  openGraph: {
    title: 'Taborlin — Building Agents and Applied AI Products',
    description:
      'Taborlin builds agents and applied AI products for inference, sales, social operations, maps, and data workflows.',
    url: 'https://taborlin.co',
    siteName: 'Taborlin',
    type: 'website',
  },
  alternates: {
    canonical: 'https://taborlin.co',
  },
};

const stats = [
  {
    value: 'Agents',
    metric: 'Complex, intensive work',
    label: 'Research, drafting, monitoring, and account work that needs more context than a simple automation.',
  },
  {
    value: 'Software',
    metric: 'Task automation and standard workflows',
    label: 'Focused apps that move repeatable work through queues, APIs, approvals, and operating state.',
  },
  {
    value: 'Data',
    metric: 'Insights for better decisions',
    label: 'Market, spatial, onchain, and operational data turned into cleaner context and clearer calls.',
  },
];

const work = [
  {
    title: 'CheapTokens',
    label: 'Discounted Venice API credits',
    url: 'https://cheaptokens.ai',
    status: 'Live product',
    metric: 'x402 checkout for AI inference',
    image: '/product-screenshots/cheaptokens.png',
    imageAlt: 'CheapTokens homepage showing discounted Venice API credit pricing',
    description:
      'Buy discounted Venice API credits with USDC, get a Venice-compatible API key, and run model calls through a simple developer flow without a subscription.',
  },
  {
    title: 'Champion',
    label: 'The personal AI rolodex for successful AEs.',
    url: 'https://champion.taborlin.co',
    status: 'Live product',
    metric: 'Private alpha for revenue operators',
    image: '/product-screenshots/champion.png',
    imageAlt: 'Champion homepage for a personal AI rolodex for successful account executives',
    description:
      'Champion gives AE and BD professionals a portable revenue memory layer plus a personal sales agent that keeps the best-practice selling loop moving.',
  },
  {
    title: 'Soshi',
    label: 'Run every social account from one approval queue.',
    url: 'https://soshi.taborlin.co',
    status: 'Live product',
    metric: 'Draft, approve, schedule, measure, repeat',
    image: '/product-screenshots/soshi.png',
    imageAlt: 'Soshi homepage showing an approval-first social operations queue',
    description:
      'Plan, draft, review, schedule, and measure X-first growth work with AI assistance while every public post stays behind human approval.',
  },
  {
    title: 'Open Crypto Tax Helper',
    label: 'Self-hosted crypto records for agent review',
    url: 'https://onchain-wallets-dashboard.vercel.app',
    status: 'Open-source tool',
    metric: 'Wallet records, proposed fixes, and audit logs',
    image: '/product-screenshots/open-crypto-tax-helper.png',
    imageAlt: 'Open Crypto Tax Helper preview showing missing cost basis review and agent proposals',
    description:
      'Organize wallet and exchange records, surface missing cost basis, let agents propose fixes, and keep the audit trail under your control.',
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
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-[#fafafa] text-sm font-semibold">
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
      <div className="max-w-5xl mx-auto px-6">
        <div>
          <h1 className="text-[2rem] sm:text-5xl lg:text-[4rem] font-semibold text-[#fafafa] leading-[1.12] sm:leading-[1.08] max-w-4xl break-words">
            <span className="block">Building agents</span>
            <span className="block text-[#a1a1aa]">and applied AI products.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#a1a1aa] max-w-3xl leading-relaxed">
            We ship focused products that buy inference, manage accounts, publish
            with approval, map data, and reconcile records. Agents do more of the
            work; humans keep control.
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
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 border border-[#1f1f28] rounded-lg p-5 sm:p-6 bg-[#0a0a10]">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`min-w-0 text-left ${i < stats.length - 1 ? 'sm:border-r sm:border-[#1f1f28] sm:pr-5' : ''}`}
            >
              <p className="text-xl sm:text-2xl font-semibold text-[#fafafa]">{stat.value}</p>
              <p className="text-xs font-medium text-[#fafafa]/70 mt-2">{stat.metric}</p>
              <p className="text-xs sm:text-sm text-[#a1a1aa]/60 mt-2 leading-relaxed break-words">{stat.label}</p>
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
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[#fafafa] mb-2">Products & Tools</h2>
          <p className="text-sm text-[#a1a1aa] max-w-2xl">
            The strongest public surfaces: products that are live, tools that are useful,
            and proof that agents can operate inside real software loops.
          </p>
        </div>
        <div className="space-y-5">
          {work.map((item, index) => {
            const imageOnRight = index % 2 === 1;

            return (
              <article
                key={item.title}
                className="product-card group overflow-hidden bg-[#0a0a10] border border-[#1f1f28] rounded-lg hover:border-[#2a2a35] transition-all"
              >
                <div className={imageOnRight ? 'grid lg:grid-cols-[0.92fr_1.08fr]' : 'grid lg:grid-cols-[1.08fr_0.92fr]'}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener"
                    aria-label={`Open ${item.title}`}
                    className={`relative block aspect-[16/10] overflow-hidden border-b border-[#1f1f28] bg-[#06060B] lg:border-b-0 ${
                      imageOnRight ? 'lg:order-2 lg:border-l' : 'lg:border-r'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 540px, 100vw"
                      className="product-shot object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  </a>
                  <div className={`min-w-0 p-6 sm:p-7 flex flex-col justify-between ${imageOnRight ? 'lg:order-1' : ''}`}>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="text-xs text-[#a1a1aa]/60 bg-[#16161e] border border-[#1f1f28] px-2.5 py-1 rounded-md">
                          {item.status}
                        </span>
                        <span className="text-xs text-[#a1a1aa]/50">{item.metric}</span>
                      </div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener"
                        className="text-xl font-semibold text-[#fafafa] hover:text-blue-400 transition-colors"
                      >
                        {item.title}
                        <span className="inline-block ml-1.5 text-[#a1a1aa] text-sm group-hover:text-blue-400 transition-colors">&#8599;</span>
                      </a>
                      <p className="text-sm text-[#fafafa]/70 mt-2">{item.label}</p>
                      <p className="text-sm text-[#a1a1aa] leading-relaxed mt-4">
                        {item.description}
                      </p>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener"
                      className="mt-6 inline-flex w-fit text-sm text-[#fafafa] border border-[#2a2a35] hover:border-[#3a3a45] transition-colors px-4 py-2 rounded-md font-medium"
                    >
                      Open product
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

function Capabilities() {
  return (
    <section id="capabilities" className="py-20 sm:py-24 border-t border-[#1f1f28]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[#fafafa] mb-2">Capabilities</h2>
          <p className="text-sm text-[#a1a1aa]">Where product, partnerships, and execution overlap</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capabilities.map((cap) => (
            <div key={cap.title} className="bg-[#0a0a10] border border-[#1f1f28] rounded-lg p-6">
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
      <div className="max-w-5xl mx-auto px-6 text-center">
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
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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
