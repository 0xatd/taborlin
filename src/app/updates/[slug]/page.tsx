import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { updates, getUpdate, getAllSlugs } from '../../data/updates';

function renderWithLinks(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener"
        className="text-blue-400 hover:text-blue-300 transition-colors"
      >
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getUpdate(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `${post.title} — Taborlin`,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://taborlin.co/updates/${slug}`,
      siteName: 'Taborlin',
    },
    twitter: {
      card: 'summary',
      title: `${post.title} — Taborlin`,
      description: post.description,
    },
    alternates: {
      canonical: `https://taborlin.co/updates/${slug}`,
    },
  };
}

export default async function UpdatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getUpdate(slug);

  if (!post) return notFound();

  const currentIndex = updates.findIndex((u) => u.slug === slug);
  const nextPost = currentIndex > 0 ? updates[currentIndex - 1] : null;
  const prevPost =
    currentIndex < updates.length - 1 ? updates[currentIndex + 1] : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `https://taborlin.co/updates/${slug}`,
    author: {
      '@type': 'Organization',
      name: 'Taborlin',
      url: 'https://taborlin.co',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Taborlin',
      url: 'https://taborlin.co',
    },
  };

  return (
    <div className="min-h-screen bg-[#06060B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
        <Link
          href="/updates"
          className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors mb-8 inline-block"
        >
          &larr; All posts
        </Link>
        <article>
          <time className="text-xs text-[#a1a1aa]/50 uppercase tracking-wider">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#fafafa] mt-2 mb-8 tracking-tight">
            {post.title}
          </h1>
          <div className="prose-custom">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-[#a1a1aa] leading-relaxed mb-5">
                {renderWithLinks(paragraph)}
              </p>
            ))}
          </div>
        </article>

        {(prevPost || nextPost) && (
          <nav className="mt-16 pt-8 border-t border-[#1f1f28] flex justify-between">
            {prevPost ? (
              <Link
                href={`/updates/${prevPost.slug}`}
                className="group text-sm"
              >
                <span className="text-[#a1a1aa]/50 text-xs">
                  &larr; Older
                </span>
                <span className="block text-[#a1a1aa] group-hover:text-[#fafafa] transition-colors mt-0.5">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                href={`/updates/${nextPost.slug}`}
                className="group text-sm text-right"
              >
                <span className="text-[#a1a1aa]/50 text-xs">
                  Newer &rarr;
                </span>
                <span className="block text-[#a1a1aa] group-hover:text-[#fafafa] transition-colors mt-0.5">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}
      </main>

      <footer className="py-8 border-t border-[#1f1f28]">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs text-[#a1a1aa]/40">&copy; 2026 Taborlin</p>
        </div>
      </footer>
    </div>
  );
}
