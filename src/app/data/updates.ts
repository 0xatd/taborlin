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
      'The first version of our internal operating surface, and what it taught us.',
    description:
      'How Taborlin built an internal command center for projects, decisions, and agent work.',
    content: `Managing multiple products across different platforms gets messy fast. GitHub for code, Vercel for deploys, Stripe for revenue, sticky notes for everything else. When you are running multiple products at once, context-switching between dashboards becomes the real bottleneck.

Atlas was our first internal dashboard for pulling that work together: project status, shipping tasks, operating notes, metrics, revenue, and what needed attention next. Built with Next.js, Prisma, and a handful of API integrations, it gave us a place to see product work instead of chasing it across tools.

The hardest part wasn't the code — it was deciding what actually matters. Early versions showed everything, which meant they showed nothing. We iterated until each project's card answered three questions at a glance: is it healthy, is it growing, and what's the next thing to ship.

Atlas is now mostly a migration source, not the future product surface. The lesson survived: agent-operated companies need durable state for decisions, approvals, outputs, memory, and audit trails. That operating layer is now moving into Saga, where it can serve more than one internal dashboard.`,
  },
  {
    slug: 'cheaptokens-launch',
    title: 'Launching CheapTokens',
    date: '2026-02-07',
    preview:
      'Discounted Venice-compatible API credits for builders who care about inference cost.',
    description:
      'Introducing CheapTokens — discounted Venice-compatible API credits with checkout, key issuance, and account flows.',
    content: `AI API costs add up fast. If you're building on top of large language models, inference isn't free — and for teams running thousands of requests a day, every dollar per million tokens matters. That's the problem CheapTokens solves.

[CheapTokens](https://cheaptokens.ai) sells discounted Venice-compatible API credits. The model is simple: buy credits for less, get an API key, test it in the playground, and use the credits for real inference work.

The current product has two credit paths. Same-Day Credits are spot discounted credits for work you need today. Reserve credits give recurring users a stable key and prepaid balance for more predictable usage.

The tech stack is deliberately lean: Next.js, payment verification, card and x402 checkout, key issuance, account flows, and reconciliation. The hard part is not making a checkout page. It is making sure money, keys, balances, and trust all line up.

If you're spending on AI inference and want to stretch your budget further, check out [CheapTokens](https://cheaptokens.ai).`,
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

The name comes from Taborlin the Great, a fictional character from Patrick Rothfuss's Kingkiller Chronicle. Taborlin is known for being resourceful — escaping impossible situations, building solutions out of nothing, and making things work with whatever's at hand. That felt right for what we do: small team, limited resources, shipping real products like [CheapTokens](https://cheaptokens.ai), [Sonde](https://sonde.taborlin.co), [Studio](https://studio.taborlin.co), and [Spatix](https://spatix.io).

Naming a company is surprisingly hard. You need something short, memorable, available as a .co domain, and not already taken by a crypto project. We went through dozens of options before landing on Taborlin. It stuck because it carries the right energy — scrappy, builder-minded, a little unconventional.

The rebrand reflects a shift in how we operate. Less consulting, more building. The work now centers on focused products where agents can handle the repetitive work and humans keep control of risk, trust, and direction.`,
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

If you work with location data and have ever been frustrated by traditional GIS tools, give [Spatix](https://spatix.io) a try.

We're starting with web-based map creation and expanding into data visualization, collaboration, and embeddable maps. The goal is to be the Canva of maps — simple enough for anyone, powerful enough to be useful.`,
  },
];

export function getUpdate(slug: string): Update | undefined {
  return updates.find((u) => u.slug === slug);
}

export function getAllSlugs(): string[] {
  return updates.map((u) => u.slug);
}
