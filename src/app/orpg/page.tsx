import type { Metadata } from "next";
import "./orpg.css";

const description =
  "Play ORPG in the browser. Greyhaven is a harbor of old houses and river trade, in early playtest. No account needed. Saves on this device.";

export const metadata: Metadata = {
  title: { absolute: "ORPG — a Taborlin game" },
  description,
  alternates: { canonical: "https://taborlin.co/orpg" },
  openGraph: {
    title: "ORPG — a Taborlin game",
    description,
    url: "https://taborlin.co/orpg",
    siteName: "Taborlin",
    type: "website",
    images: [
      {
        url: "/orpg/greyhaven-title.jpg",
        width: 1600,
        height: 1000,
        alt: "Title screen of ORPG over the harbor town of Greyhaven",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORPG — a Taborlin game",
    description,
    images: ["/orpg/greyhaven-title.jpg"],
  },
};

const controls = [
  { term: "Drag", detail: "Pan across the scene" },
  { term: "Right-drag", detail: "Orbit the camera" },
  { term: "Scroll", detail: "Zoom in and out" },
  { term: "Click", detail: "Inspect a resident or building" },
  { term: "Place selector", detail: "Harbor town, road, or cave" },
  { term: "World map", detail: "The wider geography" },
];

const thisBuild = [
  "Peaceful Greyhaven and Two Cities at War",
  "Greyhaven, Lantern Road, and the cave are explorable. Wider lands are proposed.",
  "Greyhaven's original layout draws on medieval Lübeck.",
];

const stillAhead = [
  "Broader economies",
  "Shared persistence",
  "Enterable buildings",
  "Responsive tactical combat",
  "Connected settlements, industries, daily routines, and competing houses",
];

export default function OrpgPage() {
  return (
    <main className="orpg">
      <section className="hero" aria-labelledby="orpg-title">
        <div className="hero-copy">
          <p className="kicker">Early playtest</p>
          <h1 id="orpg-title">ORPG</h1>
          <p className="promise">A world before its heroes.</p>
          <p className="place">Greyhaven, Reedmere. A harbor of old houses and river trade.</p>
          <div className="action">
            <a className="play" href="https://orpg.taborlin.co">
              Play Greyhaven
            </a>
            <p className="facts">
              No account needed. Saves on this device. Not yet a shared online world.
            </p>
          </div>
        </div>
        <div className="hero-media">
          <picture>
            <source
              media="(min-width: 900px)"
              srcSet="/orpg/greyhaven-hero-1280.jpg 1280w, /orpg/greyhaven-hero-1920.jpg 1920w"
              sizes="100vw"
            />
            <img
              src="/orpg/greyhaven-mobile-1000.jpg"
              srcSet="/orpg/greyhaven-mobile-640.jpg 640w, /orpg/greyhaven-mobile-1000.jpg 1000w"
              sizes="100vw"
              width={1000}
              height={1200}
              alt="The harbor town of Greyhaven, seen from above: timber houses around Bell Market."
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
      </section>

      <section className="sheet" aria-labelledby="how-it-plays">
        <h2 id="how-it-plays">How it plays</h2>
        <dl className="controls">
          {controls.map((control) => (
            <div key={control.term}>
              <dt>{control.term}</dt>
              <dd>{control.detail}</dd>
            </div>
          ))}
        </dl>
        <p className="modes">
          Peaceful Greyhaven opens as an observer. Live here lets you control a resident or begin
          life in a household. Two Cities at War is the other scenario. Each saves on this device
          and pauses when its tab is hidden.
        </p>
      </section>

      <section className="sheet build">
        <div>
          <h2>This build</h2>
          <ul>
            {thisBuild.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Still ahead</h2>
          <ul>
            {stillAhead.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="foot">
        <a href="https://taborlin.co">A Taborlin game</a>
      </footer>
    </main>
  );
}
