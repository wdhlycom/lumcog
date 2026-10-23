import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { BoardLabel, Footer, Header } from '@/components/site'
import { BOARDS, getPosts, type Board } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Lumcog — all posts.',
  alternates: { canonical: 'https://lumcog.com/en/archive' },
}

export default function ArchivePageEn() {
  const all = getPosts(undefined, 'en')
  const byBoard = BOARDS.map((board) => ({ board, posts: getPosts(board, 'en') })).filter((g) => g.posts.length > 0)

  return (
    <>
      <Header lang="en" />
      <main className="mx-auto max-w-6xl px-6 pb-24">
        <Link href="/en" className="inline-flex items-center gap-2 py-6 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft aria-hidden="true" />
          Home
        </Link>

        <section className="mb-14 border-b border-border pb-10">
          <p className="font-display text-xs uppercase tracking-[.35em] text-primary">Archive</p>
          <h1 className="mt-4 font-cjk text-5xl font-semibold">All posts</h1>
          <p className="mt-5 max-w-xl leading-7 text-muted-foreground">Every chamber, every post, in reverse chronological order.</p>
          <p className="mt-4 font-display text-xs tracking-widest text-muted-foreground">{all.length} posts</p>
        </section>

        <div className="flex flex-col gap-14">
          {byBoard.map(({ board, posts }) => (
            <section key={board} aria-labelledby={`archive-${board}`}>
              <h2 id={`archive-${board}`} className="mb-4 flex items-center gap-3 border-b border-border pb-3">
                <span className="font-cjk text-2xl font-semibold">
                  <BoardLabel board={board as Board} lang="en" />
                </span>
                <span className="font-display text-xs tracking-widest text-muted-foreground">{posts.length} posts</span>
              </h2>
              <div className="flex flex-col">
                {posts.map((post) => (
                  <Link
                    key={`${post.board}/${post.slug}`}
                    href={`/en/post/${post.board}/${post.slug}`}
                    className="group grid gap-2 border-b border-border/70 py-5 sm:grid-cols-[9rem_1fr] sm:items-baseline"
                  >
                    <time className="font-display text-xs tracking-wider text-muted-foreground">{post.dateLabel}</time>
                    <span>
                      <span className="font-cjk text-lg leading-8 transition-colors group-hover:text-primary">{post.title}</span>
                      {post.summary ? <span className="mt-1 block text-sm leading-6 text-muted-foreground">{post.summary}</span> : null}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer lang="en" />
    </>
  )
}
