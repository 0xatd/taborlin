'use client';

import { useState } from 'react';

type Company = {
  /** Display name. Used as alt text and the tooltip / text fallback. */
  name: string;
  /**
   * Optional self-hosted logo path under /public. When provided, the
   * image is rendered with the shared .logo-item treatment and the
   * text fallback only kicks in if the request fails. When omitted,
   * the company renders as a styled text wordmark.
   *
   * Why self-hosted: external CDNs (Brandfetch, Clearbit) now require
   * client IDs or return HTML error pages on rate limit, which renders
   * as broken images on the homepage. Local SVGs/PNGs are free and
   * deterministic.
   */
  logo?: string;
  /** Short text shown when the logo fails or is intentionally absent. */
  fallback?: string;
  /** Optional text shown beside a mark when the icon alone is too ambiguous. */
  wordmark?: string;
  /**
   * Tailwind classes layered on top of .logo-text for the text fallback
   * (used for brand-specific type treatments).
   */
  textClassName?: string;
};

/**
 * Curated commercial experience list. Order here = visual order in
 * the scrolling strip. Text-fallback entries are deliberately interleaved
 * with image entries so they don't read as one run-on paragraph of wordmarks.
 *
 * Logos live in public/logos/. The .logo-item CSS in globals.css
 * re-colors any source to muted off-white automatically, so source
 * color does not matter (as long as the background is transparent).
 */
const companies: Company[] = [
  { name: 'Esri', logo: '/logos/esri.svg', wordmark: 'Esri' },
  { name: 'Orpheus AI', textClassName: 'font-semibold tracking-[0.04em]' },
  { name: 'DTN', logo: '/logos/dtn.svg' },
  { name: 'Enline Energy', logo: '/logos/enline.svg' },
  { name: 'Enterprise Holdings', logo: '/logos/enterpriseholdings.svg' },
  { name: 'Milsoft Utility Solutions', textClassName: 'font-bold tracking-[0.05em]' },
  { name: 'Grubhub', logo: '/logos/grubhub.svg' },
  { name: 'WeatherXM', logo: '/logos/weatherxm.png' },
  { name: 'Everbridge', logo: '/logos/everbridge.svg' },
  { name: 'American International Group', logo: '/logos/aig.svg' },
  { name: 'Trueo', fallback: 'TRUEO', textClassName: 'font-bold tracking-[0.12em]' },
];

function LogoItem({ company }: { company: Company }) {
  const [failed, setFailed] = useState(false);

  // Wrap every entry in a tooltip container so hover shows the company
  // name via a fast CSS-driven tooltip (browser-native `title` has a
  // ~500-1000ms delay and cannot be retimed).
  const tooltip = (inner: React.ReactNode) => (
    <span
      className="logo-tooltip shrink-0"
      data-tooltip={company.name}
      aria-label={company.name}
    >
      {inner}
    </span>
  );

  if (!company.logo || failed) {
    return tooltip(
      <span className={`logo-text select-none ${company.textClassName ?? ''}`}>
        {company.fallback ?? company.name}
      </span>,
    );
  }

  return tooltip(
    <span className="inline-flex items-center justify-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={company.logo}
        alt={company.name}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={company.wordmark ? 'logo-item logo-item-with-wordmark' : 'logo-item'}
      />
      {company.wordmark ? (
        <span className={`logo-text select-none ${company.textClassName ?? ''}`}>
          {company.wordmark}
        </span>
      ) : null}
    </span>,
  );
}

export default function LogoStrip() {
  return (
    <section className="pb-20 sm:pb-24">
      <div className="max-w-4xl mx-auto px-6 mb-8 text-center">
        <p className="text-xs text-[#a1a1aa]/40 uppercase tracking-widest">
          Commercial experience across
        </p>
      </div>
      {/*
        The mask uses overflow-x:hidden (via .marquee-mask) rather than
        overflow:hidden on all axes, so vertical tooltips above the
        strip are not clipped. The horizontal mask gradient still
        fades the marquee into the page edges.
      */}
      <div className="marquee-mask">
        <div className="marquee-track flex items-center gap-12 sm:gap-16 w-max">
          {[...companies, ...companies].map((co, i) => (
            <LogoItem key={`${co.name}-${i}`} company={co} />
          ))}
        </div>
      </div>
    </section>
  );
}
