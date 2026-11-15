import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ORPG",
  description: "An original dark-fantasy world in the making. Explore its first places in observer mode.",
  alternates: { canonical: "https://taborlin.co/orpg" },
  openGraph: { title: "ORPG — A world before its heroes", description: "Explore an original dark-fantasy world in the making.", url: "https://taborlin.co/orpg", images: ["/orpg/greyhaven-harbor.png"] },
};

export default function OrpgPage() {
  return <main className="mx-auto max-w-6xl px-6 pb-16">
    <nav className="flex h-16 items-center justify-between border-b border-white/10 text-sm" aria-label="Project navigation">
      <Link href="/" className="font-semibold tracking-wide">Taborlin</Link>
      <Link href="/#work" className="text-zinc-400 hover:text-white">All projects ↗</Link>
    </nav>
    <section className="grid gap-8 py-10 md:grid-cols-[1fr_1.2fr] md:items-center md:py-14">
      <div>
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-amber-300/80">ORPG · In development</p>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">A world before<br />its heroes.</h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400">Rival houses, old roads, hidden places, and something stranger beyond the borders. We’re building an original dark-fantasy world—starting with the places themselves.</p>
        <a href="https://orpg.taborlin.co" className="mt-7 inline-flex rounded-md bg-amber-200 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-100">Enter world ↗</a>
        <p className="mt-3 text-xs text-zinc-500">Opens the game menu. No account needed to explore.</p>
      </div>
      <figure>
        <Image src="/orpg/greyhaven-harbor.png" alt="Greyhaven harbor-town prototype, with districts, streets, warehouses, a keep and waterfront." width={1440} height={900} priority className="h-auto w-full rounded-lg border border-white/10" />
        <figcaption className="mt-3 text-xs text-zinc-500">The current prototype · Greyhaven</figcaption>
      </figure>
    </section>
    <section className="grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2">
      <div><h2 className="text-lg font-medium">Explore now</h2><p className="mt-3 max-w-lg leading-relaxed text-zinc-400">Explore Greyhaven as an observer or walking hero. Follow dockworkers and traders moving fish from the quay to the market, watch residents collect food, and inspect the town’s buildings. The town saves on your device and pauses when the tab is hidden; it is not yet a shared online world.</p></div>
      <div><h2 className="text-lg font-medium">Building toward</h2><p className="mt-3 max-w-lg leading-relaxed text-zinc-400">A functioning world of connected settlements, industries, daily routines and competing houses. Greyhaven’s original layout draws on medieval Lübeck. Broader economies, shared persistence, enterable buildings and responsive tactical combat are still ahead.</p></div>
    </section>
    <footer className="mt-12 text-xs text-zinc-500">A Taborlin world-building experiment. Expanding one connected place at a time.</footer>
  </main>;
}
