import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { chambers, Footer, Header, PostList } from '@/components/site'
import { BOARDS, getPosts, type Board } from '@/lib/content'

type Props = { params: Promise<{ board: string }> }

function findChamber(board: string) {
  return chambers.find((chamber) => chamber.href.slice(1) === board)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { board } = await params
  const item = findChamber(board)
  const title = item ? item.en : 'Chamber'
  return {
    title,
    description: `${title} — Lumcog`,
    alternates: { canonical: `https://lumcog.com/en/${board}` },
  }
}

export default async function BoardPageEn({ params }: Props) {
  const { board } = await params
  const item = findChamber(board)
  if (!item) notFound()

  const posts = BOARDS.includes(board as Board) ? getPosts(board as Board, 'en') : []
  const count = posts.length

  return (
    <>
      <Header lang="en" />
      <main className="mx-auto max-w-6xl px-6 pb-24">
        <Link href="/en" className="inline-flex items-center gap-2 py-6 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft aria-hidden="true" />
          Home
        </Link>

        <section className="mb-14 border-b border-border pb-10">
          <p className="font-display text-xs uppercase tracking-[.35em] text-primary">{item.en}</p>
          <h1 className="mt-4 font-cjk text-5xl font-semibold">{item.en}</h1>
          <p className="mt-5 max-w-xl leading-7 text-muted-foreground">{item.descEn}</p>
          <p className="mt-4 font-display text-xs tracking-widest text-muted-foreground">{count} posts</p>
        </section>

        <PostList posts={posts} lang="en" />
      </main>
      <Footer lang="en" />
    </>
  )
}
