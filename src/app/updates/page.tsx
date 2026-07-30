import Link from 'next/link';
import type { Metadata } from 'next';
import { updates } from '../data/updates';

export const metadata: Metadata = {
  title: 'Updates',
  description:
    'Updates from Taborlin — on building products, partnerships, and going to market.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://taborlin.co/updates',
  },
};

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-[#06060B]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#06060B]/80 backdrop-blur-md border-b border-[#1f1f28]/50">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-[#fafafa] text-sm font-semibold tracking-tight"
          >
            Taborlin
          </Link>
          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              href="/#work"
              className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
            >
              Work
            </Link>
            <a
              href="mailto:hello@taborlin.co"
              className="text-sm text-[#06060B] bg-[#fafafa] hover:bg-[#e4e4e7] transition-colors px-3.5 py-1.5 rounded-md font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-semibold text-[#fafafa] mb-2">
          Updates
        </h1>
        <p className="text-sm text-[#a1a1aa] mb-16">
          Notes on building, shipping, and going to market.
        </p>

        <div className="space-y-4">
          {updates.map((post) => (
            <Link
              key={post.slug}
              href={`/updates/${post.slug}`}
              className="group block bg-[#0a0a10] border border-[#1f1f28] rounded-xl p-5 sm:p-6 hover:border-[#2a2a35] transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                <h2 className="text-base text-[#fafafa] group-hover:text-blue-400 transition-colors font-medium">
                  {post.title}
                </h2>
                <time className="text-xs text-[#a1a1aa]/50 shrink-0">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <p className="text-sm text-[#a1a1aa] mt-2 leading-relaxed">
                {post.preview}
              </p>
            </Link>
          ))}
        </div>
      </main>

      <footer className="py-8 border-t border-[#1f1f28]">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs text-[#a1a1aa]/40">&copy; 2026 Taborlin</p>
        </div>
      </footer>
    </div>
  );
}
