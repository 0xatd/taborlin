import Link from 'next/link';
import { CONTACT_EMAIL, CONTACT_MAILTO, GITHUB_URL, X_URL } from './site';

export function SkipLink() {
  return (
    <a href="#main" className="skip-link">
      Skip to content
    </a>
  );
}

export function SiteHeader({ current }: { current?: 'work' }) {
  return (
    <header className="flex items-center justify-between pt-10 sm:pt-14">
      <Link href="/" className="text-[15px] font-semibold tracking-tight">
        Taborlin
      </Link>
      <nav aria-label="Main" className="flex items-center gap-6 text-sm text-muted">
        <Link
          href="/work"
          aria-current={current === 'work' ? 'page' : undefined}
          className={current === 'work' ? 'text-foreground' : 'hover:text-foreground'}
        >
          Work
        </Link>
        <a href={CONTACT_MAILTO} className="hover:text-foreground">
          Contact
        </a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="flex flex-wrap gap-x-6 gap-y-2 border-t border-border py-8 text-sm text-muted">
      <a href={CONTACT_MAILTO} className="hover:text-foreground">{CONTACT_EMAIL}</a>
      <Link href="/work" className="hover:text-foreground">Work</Link>
      <a href={GITHUB_URL} target="_blank" rel="noopener" className="hover:text-foreground">GitHub</a>
      <a href={X_URL} target="_blank" rel="noopener" className="hover:text-foreground">X</a>
    </footer>
  );
}

export function ExternalMark() {
  return (
    <>
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  );
}
