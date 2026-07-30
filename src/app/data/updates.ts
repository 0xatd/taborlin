export interface Update {
  slug: string;
  title: string;
  date: string;
  preview: string;
  description: string;
  content: string;
}

export const updates: Update[] = [
  {
    slug: 'building-atlas',
    title: 'Building Atlas',
    date: '2026-02-13',
    preview:
      'We built an internal dashboard to manage all our projects in one place. Here\'s why and how.',
    description:
      'How Taborlin built Atlas, an internal dashboard to manage Spatix, CheapTokens, and GISTools from a single view.',
    content: `Managing multiple products across different platforms gets messy fast. GitHub for code, Vercel for deploys, Stripe for revenue, sticky notes for everything else. When you're running three active products — [Spatix](https://spatix.io), [CheapTokens](https://cheaptokens.ai), and [GISTools](https://gistools.io) — context-switching between dashboards becomes the real bottleneck.

Atlas is our internal dashboard that pulls it all together. One view across every project — development status, marketing tasks, user metrics, revenue, and roadmap. Built with Next.js, Prisma, and a handful of API integrations that pipe in data from GitHub, Vercel, Stripe, and our analytics stack.

The hardest part wasn't the code — it was deciding what actually matters. Early versions showed everything, which meant they showed nothing. We iterated until each project's card answered three questions at a glance: is it healthy, is it growing, and what's the next thing to ship.

It's not a product we're selling. It's a tool we built because we needed it. Every product studio eventually builds something like this, and now we have ours. If you're juggling multiple SaaS products as a small team, building your own command center is one of the highest-leverage things you can do.`,
  },
  {
    slug: 'cheaptokens-launch',
    title: 'Launching CheapTokens',
    date: '2026-02-07',
    preview:
      'A marketplace for discounted AI credits through daily auctions.',
    description:
      'Introducing CheapTokens — a marketplace for discounted Venice AI credits via daily auctions, built by Taborlin.',
    content: `AI API costs add up fast. If you're building on top of large language models, inference isn't free — and for teams running thousands of requests a day, every dollar per million tokens matters. That's the problem CheapTokens solves.

[CheapTokens](https://cheaptokens.ai) is a marketplace for discounted Venice AI credits. Every day we run auctions where users bid on credit bundles at prices below retail. The model is simple: buy credits for less, use them the same way you always would. No catches, no degraded service — just lower prices driven by market dynamics.

We built CheapTokens because we saw a gap between what AI providers charge at list price and what's possible with smarter distribution. Auctions create real price discovery, and buyers who are flexible on timing get rewarded with significant savings.

The tech stack is deliberately lean — Next.js on the frontend, a real-time auction engine on the backend, and Stripe for payments. We designed the auction flow to be dead simple: see today's auction, place a bid, get your credits. No accounts required beyond email verification.

We're starting with Venice AI credits and plan to expand to other providers as the marketplace grows. If you're spending on AI inference and want to stretch your budget further, check out [CheapTokens](https://cheaptokens.ai).`,
  },
  {
    slug: 'why-taborlin',
    title: 'Why Taborlin',
    date: '2026-02-01',
    preview:
      'On renaming from 119th Consulting to Atmos Labs to Taborlin, and what the company is becoming.',
    description:
      'The story behind Taborlin\'s name — from 119th Consulting to Atmos Labs to Taborlin, and why we chose to name ourselves after a fictional character.',
    content: `We've gone through a few names. 119th Consulting was the starting point — a consultancy that took on client work to fund product ideas. Atmos Labs was the pivot toward building our own things. Taborlin is what we are now.

The name comes from Taborlin the Great, a fictional character from Patrick Rothfuss's Kingkiller Chronicle. Taborlin is known for being resourceful — escaping impossible situations, building solutions out of nothing, and making things work with whatever's at hand. That felt right for what we do: small team, limited resources, shipping real products like [Spatix](https://spatix.io), [CheapTokens](https://cheaptokens.ai), and [GISTools](https://gistools.io).

Naming a company is surprisingly hard. You need something short, memorable, available as a .co domain, and not already taken by a crypto project. We went through dozens of options before landing on Taborlin. It stuck because it carries the right energy — scrappy, builder-minded, a little unconventional.

The rebrand reflects a shift in how we operate. Less consulting, more building. Every project we take on is something we own and grow ourselves. If you want to follow what we're shipping, our updates page is the best place to keep up.`,
  },
  {
    slug: 'spatix-launch',
    title: 'Launching Spatix',
    date: '2026-01-15',
    preview:
      'Making map creation accessible to everyone, not just GIS professionals.',
    description:
      'Introducing Spatix — a web-based map creation tool that makes GIS accessible to non-specialists, built by Taborlin.',
    content: `GIS software is powerful but hostile to anyone who isn't a specialist. Tools like QGIS and ArcGIS serve professionals well, but they're overkill for the vast majority of people who just need to put data on a map. We built [Spatix](https://spatix.io) to fix that — create maps in seconds, no GIS skills needed.

The core insight: most people who need maps don't need full GIS capabilities. Marketers plotting store locations, journalists mapping election data, researchers visualizing field observations — they need to plot data on a map, style it, and share it. That's it. Spatix does exactly that, and nothing more.

We designed the interface around a single principle: if you can use a spreadsheet, you can make a map. Upload a CSV or paste in your data, pick a style, and you've got a shareable, embeddable map in under a minute. No projections to think about, no coordinate systems to configure, no plugins to install.

If you work with location data and have ever been frustrated by traditional GIS tools, give [Spatix](https://spatix.io) a try. We also maintain [GISTools](https://gistools.io) for developers who need file conversion and analysis utilities — they pair well together.

We're starting with web-based map creation and expanding into data visualization, collaboration, and embeddable maps. The goal is to be the Canva of maps — simple enough for anyone, powerful enough to be useful.`,
  },
];

export function getUpdate(slug: string): Update | undefined {
  return updates.find((u) => u.slug === slug);
}

export function getAllSlugs(): string[] {
  return updates.map((u) => u.slug);
}
