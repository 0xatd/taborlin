import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ORPG",
  description: "An original dark-fantasy world in the making. Explore its first places in observer mode.",
  alternates: { canonical: "https://taborlin.co/orpg" },
  openGraph: { title: "ORPG — A world before its heroes", description: "Explore an original dark-fantasy world in the making.", url: "https://taborlin.co/orpg", images: ["/orpg/world-preview.png"] },
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
        <Image src="/orpg/world-preview.png" alt="Current observer prototype: a small timber-framed village among trees, seen from above." width={1440} height={900} priority className="h-auto w-full rounded-lg border border-white/10" />
        <figcaption className="mt-3 text-xs text-zinc-500">The current prototype · South Hamlet</figcaption>
      </figure>
    </section>
    <section className="grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2">
      <div><h2 className="text-lg font-medium">Explore now</h2><p className="mt-3 max-w-lg leading-relaxed text-zinc-400">Move the observer camera through three early places: a village, a wilderness road, and a cave. Open the atlas to see how they fit into the larger world. These are rough, authored spaces—not yet a living simulation.</p></div>
      <div><h2 className="text-lg font-medium">Building toward</h2><p className="mt-3 max-w-lg leading-relaxed text-zinc-400">Inhabited settlements, working NPCs, trade routes, patrols, and competing houses. First, a world worth watching. Later, hero-led exploration and responsive tactical combat within it.</p></div>
    </section>
    <footer className="mt-12 text-xs text-zinc-500">A Taborlin world-building experiment. Expanding one connected place at a time.</footer>
  </main>;
}
