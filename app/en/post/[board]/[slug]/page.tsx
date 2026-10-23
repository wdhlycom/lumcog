import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, CornerDownRight, MessageCircle } from 'lucide-react'
import { BoardLabel, Footer, Header, UI } from '@/components/site'
import { ShareButtons } from '@/components/share-buttons'
import { getAdjacentPosts, getPost } from '@/lib/content'

type Props = { params: Promise<{ board: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { board, slug } = await params
  const post = getPost(board, slug, 'en')
  if (!post) return { title: 'Not found' }
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `https://lumcog.com/en/post/${board}/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.summary,
      images: post.cover ? [post.cover] : undefined,
    },
  }
}

export default async function PostPageEn({ params }: Props) {
  const { board, slug } = await params
  const post = getPost(board, slug, 'en')
  if (!post) notFound()

  const { prev, next } = getAdjacentPosts(post)
  const ui = UI.en

  return (
    <>
      <Header lang="en" />
      <main className="mx-auto max-w-3xl px-6 pb-24">
        <Link
          href={`/en/${board}`}
          className="inline-flex items-center gap-2 py-6 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft aria-hidden="true" />
          <BoardLabel board={post.board} lang="en" />
        </Link>

        <article>
          <div className="border-b border-border pb-10">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-display text-xs uppercase tracking-[.3em] text-primary">{post.dateLabel}</span>
              <span className="font-display text-xs tracking-widest text-muted-foreground">{ui.minutes(post.readingMinutes)}</span>
              {post.status === 'draft' ? (
                <span className="rounded-full border border-[var(--tone-pink)] px-2 py-0.5 font-display text-[10px] uppercase tracking-widest text-[var(--tone-pink)]">{ui.draft}</span>
              ) : null}
            </div>
            <h1 className="mt-5 font-cjk text-4xl font-semibold leading-tight text-balance sm:text-5xl">{post.title}</h1>
            {post.subtitle ? <p className="mt-4 font-cjk text-xl leading-9 text-muted-foreground">{post.subtitle}</p> : null}
            {post.titleEn ? <p className="mt-4 font-display text-lg text-primary">{post.titleEn}</p> : null}
            {post.subtitleEn ? <p className="mt-1 font-display text-sm leading-6 text-muted-foreground">{post.subtitleEn}</p> : null}
          </div>

          {post.cover ? (
            <img src={post.cover} alt="" className="mt-10 w-full rounded-xl border border-border" />
          ) : null}

          {post.lead ? (
            <div className="lead mt-10">
              <span className="lead-tag">{ui.leadTag}</span>
              <p className="lead-text">{post.lead}</p>
            </div>
          ) : null}

          <div className="article mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.tags.length > 0 ? (
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border px-3 py-1 font-display text-xs tracking-widest text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </article>

        {prev || next ? (
          <nav className="post-nav mt-14" aria-label={ui.navLabel}>
            <p className="post-nav-title">
              <CornerDownRight aria-hidden="true" className="size-4" />
              {post.series ? ui.seriesNav(post.series) : ui.columnNav}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {prev ? (
                <Link href={`/en/post/${prev.board}/${prev.slug}`} className="post-nav-card">
                  <span className="post-nav-label">
                    <ArrowLeft aria-hidden="true" className="size-3.5" />
                    {ui.prevLabel}
                  </span>
                  <span className="post-nav-name">{prev.title}</span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
              {next ? (
                <Link href={`/en/post/${next.board}/${next.slug}`} className="post-nav-card sm:text-right">
                  <span className="post-nav-label sm:justify-end">
                    {ui.nextLabel}
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </span>
                  <span className="post-nav-name">{next.title}</span>
                </Link>
              ) : null}
            </div>
          </nav>
        ) : null}

        <ShareButtons />

        <section id="waline" className="glass mt-16 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <MessageCircle className="text-primary" aria-hidden="true" />
            <h2 className="font-cjk text-xl font-semibold">{ui.joinTitle}</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{ui.joinDesc}</p>
        </section>
      </main>
      <Footer lang="en" />
    </>
  )
}
