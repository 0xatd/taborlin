import type { Metadata } from 'next';
import LogoStrip from './LogoStrip';

export const metadata: Metadata = {
  title: 'Taborlin — Software, Data, and AI',
  description:
    'Building products and closing enterprise deals across software, data, and AI. $50M+ in opportunities influenced. Multiple products shipped from zero.',
  openGraph: {
    title: 'Taborlin — Software, Data, and AI',
    description:
      'Building products and closing enterprise deals across software, data, and AI.',
    url: 'https://taborlin.co',
    siteName: 'Taborlin',
    type: 'website',
  },
  alternates: {
    canonical: 'https://taborlin.co',
  },
};

const stats = [
  { value: '$50M+', label: 'In opportunities influenced' },
  { value: '100+', label: 'Partnerships built' },
  { value: '10', label: 'Products shipped' },
];

const work = [
  {
    title: 'Atlas',
    label: 'AI-Powered Outbound Engine',
    url: 'https://atlas.taborlin.co',
    status: 'Active',
    description:
      'Monitors social platforms and online communities to find people actively mentioning a target problem or topic. Surfaces high-intent signals and turns them into outbound opportunities — lead generation, distribution, and partnership pipeline on autopilot.',
  },
  {
    title: 'CheapTokens',
    label: 'AI Compute Marketplace',
    url: 'https://cheaptokens.ai',
    status: 'Shipped',
    description:
      'AI credit marketplace with daily auctions and real-time bidding. Designed the product, pricing mechanics, and payment infrastructure from scratch. Onboarding early users and partners.',
  },
  {
    title: 'Spatix',
    label: 'Mapping Platform for AI Agents',
    url: 'https://spatix.io',
    status: 'In development',
    description:
      'Map creation platform built for AI agents and non-technical users. Designed to make geospatial data accessible without GIS expertise — upload data, generate maps, embed or share.',
  },
  {
    title: 'GISTools',
    label: 'Open Source GIS Software',
    url: 'https://gistools.io',
    status: 'Open source',
    description:
      'Free, browser-based GIS file conversion and spatial analysis tools. Built to capture students and knowledge workers searching for accessible geospatial software.',
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
        <a href="/" className="text-[#fafafa] text-sm font-semibold tracking-tight">
          Taborlin
        </a>
        <div className="flex items-center gap-6 sm:gap-8">
          <a href="#work" className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
            Work
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
            <span className="block">Building products and partnerships</span>
            <span className="block text-[#a1a1aa]">across software, data, and AI.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#a1a1aa] max-w-2xl leading-relaxed">
            Taborlin ships products, structures enterprise deals, and executes go-to-market
            strategy. $50M+ in opportunities influenced. Multiple products launched
            from zero.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="#work"
              className="text-sm text-[#06060B] bg-[#fafafa] hover:bg-[#e4e4e7] transition-colors px-5 py-2.5 rounded-md font-medium"
            >
              See the work
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
          <h2 className="text-2xl font-semibold text-[#fafafa] mb-2">Selected Work</h2>
          <p className="text-sm text-[#a1a1aa]">Products built and shipped from zero</p>
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
          and commercial execution overlap.
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
