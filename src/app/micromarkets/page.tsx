import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Micromarkets for Properties',
  description:
    'A no-cost micromarket and smart vending program for offices, apartments, warehouses, schools, and community properties.',
  openGraph: {
    title: 'Taborlin Micromarkets',
    description:
      'Bring cashless snacks, drinks, and essentials to your property with no upfront cost and simple local service.',
    url: 'https://taborlin.co/micromarkets',
    siteName: 'Taborlin',
    type: 'website',
  },
  alternates: {
    canonical: 'https://taborlin.co/micromarkets',
  },
};

const fitChecks = [
  '40+ daily employees, residents, tenants, students, or visitors',
  'A break room, lobby, gym, clubhouse, shop floor, or common area',
  'Limited nearby food options or long walks to convenience stores',
  'Reliable power, indoor placement, and basic cellular or Wi-Fi coverage',
];

const benefits = [
  {
    title: 'No property payroll burden',
    body: 'We handle equipment, stocking, payments, service, and product rotation.',
  },
  {
    title: 'Modern cashless equipment',
    body: 'Card, mobile wallet, and telemetry-ready machines. No old coin-only hardware.',
  },
  {
    title: 'Better tenant experience',
    body: 'Snacks, cold drinks, protein options, and practical essentials where people already are.',
  },
  {
    title: 'Clean operating footprint',
    body: 'Compact placement, regular service, and clear support if something needs attention.',
  },
];

const propertyTypes = [
  'Offices',
  'Apartments',
  'Warehouses',
  'Gyms',
  'Schools',
  'Clinics',
  'Coworking',
  'Hotels',
];

const process = [
  {
    step: '1',
    title: 'Quick fit check',
    body: 'We confirm traffic, placement, access, and the likely product mix.',
  },
  {
    step: '2',
    title: 'Simple placement plan',
    body: 'You get the recommended machine size, location, electrical needs, and service schedule.',
  },
  {
    step: '3',
    title: 'Install and operate',
    body: 'We install, stock, monitor sales remotely, and restock based on what your people buy.',
  },
];

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#06060B]/85 backdrop-blur-md border-b border-[#1f1f28]/50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-[#fafafa] text-sm font-semibold tracking-tight">
          Taborlin
        </Link>
        <div className="flex items-center gap-5 sm:gap-7">
          <a href="#fit" className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
            Fit
          </a>
          <a href="#process" className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors hidden sm:inline">
            Process
          </a>
          <a
            href="mailto:hello@taborlin.co?subject=Micromarket%20placement"
            className="text-sm text-[#06060B] bg-[#fafafa] hover:bg-[#e4e4e7] transition-colors px-3.5 py-1.5 rounded-md font-medium"
          >
            Talk
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="min-h-[88vh] pt-24 pb-12 flex items-end relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1742797358908-73dfae70a7a1?auto=format&fit=crop&w=1800&q=85"
        alt="A modern smart vending machine installed in an indoor property hallway"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#06060B]/45 via-[#06060B]/45 to-[#06060B]" />
      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[#fafafa]/70 mb-5">
            Micromarkets and smart vending
          </p>
          <h1 className="text-[2.35rem] sm:text-6xl lg:text-7xl font-semibold text-[#fafafa] tracking-tight leading-[1.05]">
            A useful amenity your property does not have to operate.
          </h1>
          <p className="mt-6 text-base sm:text-xl text-[#e4e4e7] max-w-2xl leading-relaxed">
            We place, stock, and service modern cashless snack and drink stations for
            offices, apartments, warehouses, schools, and community properties.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:hello@taborlin.co?subject=Micromarket%20placement"
              className="text-sm text-[#06060B] bg-[#fafafa] hover:bg-[#e4e4e7] transition-colors px-5 py-3 rounded-md font-medium"
            >
              Request a fit check
            </a>
            <a
              href="#fit"
              className="text-sm text-[#fafafa] border border-[#fafafa]/30 bg-[#06060B]/30 hover:bg-[#06060B]/50 transition-colors px-5 py-3 rounded-md font-medium"
            >
              See what qualifies
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="bg-[#0a0a10] border border-[#1f1f28] rounded-lg p-5">
              <h2 className="text-sm font-semibold text-[#fafafa] mb-3">{benefit.title}</h2>
              <p className="text-sm text-[#a1a1aa] leading-relaxed">{benefit.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Fit() {
  return (
    <section id="fit" className="py-16 sm:py-20 border-t border-[#1f1f28]">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#a1a1aa]/70 mb-4">Good locations</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#fafafa] tracking-tight">
            Best for properties with regular daily foot traffic.
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
            The best placements are boring in the right way: people are already there,
            they need convenient food or drinks, and the property wants an amenity
            without adding a new operating chore.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <span key={type} className="text-xs text-[#fafafa] bg-[#16161e] border border-[#1f1f28] rounded-md px-3 py-1.5">
                {type}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-[#0a0a10] border border-[#1f1f28] rounded-lg p-6 sm:p-7">
          <h3 className="text-sm font-semibold text-[#fafafa] mb-5">Fast qualification checklist</h3>
          <div className="space-y-4">
            {fitChecks.map((check) => (
              <div key={check} className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-[#fafafa] text-[#06060B] text-xs font-semibold flex items-center justify-center">
                  ✓
                </span>
                <p className="text-sm text-[#d4d4d8] leading-relaxed">{check}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="py-16 sm:py-20 border-t border-[#1f1f28]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#a1a1aa]/70 mb-4">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#fafafa] tracking-tight">
            Low-friction for the property owner.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {process.map((item) => (
            <article key={item.step} className="bg-[#0a0a10] border border-[#1f1f28] rounded-lg p-6">
              <div className="h-9 w-9 rounded-md bg-[#fafafa] text-[#06060B] font-semibold flex items-center justify-center mb-6">
                {item.step}
              </div>
              <h3 className="text-base font-semibold text-[#fafafa] mb-3">{item.title}</h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlacementCard() {
  return (
    <section className="py-16 sm:py-20 border-t border-[#1f1f28]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="bg-[#0a0a10] border border-[#1f1f28] rounded-lg p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a1a1aa]/70 mb-4">Pop-in script</p>
            <p className="text-lg sm:text-xl text-[#fafafa] leading-relaxed">
              We place modern cashless snack and drink stations in properties like this.
              There is no upfront equipment purchase for the property. We handle stocking
              and service. If the traffic is a fit, it becomes a simple amenity for your
              tenants, staff, or visitors.
            </p>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#fafafa] tracking-tight">
              Built for in-person reference.
            </h2>
            <p className="mt-5 text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
              Open this page during a pop-in, send it after a conversation, or use it as the
              follow-up link for property managers who want the details without a long pitch.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="border border-[#1f1f28] rounded-lg p-4">
                <p className="text-2xl font-semibold text-[#fafafa]">0</p>
                <p className="text-xs text-[#a1a1aa] mt-1">Property staff needed to run it</p>
              </div>
              <div className="border border-[#1f1f28] rounded-lg p-4">
                <p className="text-2xl font-semibold text-[#fafafa]">24/7</p>
                <p className="text-xs text-[#a1a1aa] mt-1">Cashless purchase availability</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="py-16 sm:py-20 border-t border-[#1f1f28]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#fafafa] tracking-tight">
          Want to check a property?
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
          Send the address, property type, approximate daily traffic, and where a machine or
          micromarket could sit. We will say quickly whether it is worth a site visit.
        </p>
        <a
          href="mailto:hello@taborlin.co?subject=Micromarket%20placement"
          className="inline-block mt-8 text-sm text-[#06060B] bg-[#fafafa] hover:bg-[#e4e4e7] transition-colors px-6 py-3 rounded-md font-medium"
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
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#a1a1aa]/40">&copy; 2026 Taborlin</p>
        <div className="flex gap-6 text-xs text-[#a1a1aa]/40">
          <Link href="/" className="hover:text-[#a1a1aa] transition-colors">Home</Link>
          <a href="#fit" className="hover:text-[#a1a1aa] transition-colors">Fit</a>
          <a href="mailto:hello@taborlin.co" className="hover:text-[#a1a1aa] transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}

export default function MicromarketsPage() {
  return (
    <div className="min-h-screen bg-[#06060B]">
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <Fit />
        <Process />
        <PlacementCard />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
