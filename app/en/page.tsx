import type { Metadata } from 'next'
import { ChamberGrid, Footer, Header, Hero, RecentUpdates } from '@/components/site'
import { BOARDS, getBoardCount, getPosts, type Board } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Lumcog — Light of Cognition',
  description: 'A bilingual digital garden for ideas, books, essays, and conversations. Light of Cognition · 心智启明，集录所思。',
  alternates: { canonical: 'https://lumcog.com/en' },
}

export default function HomeEn() {
  const posts = getPosts(undefined, 'en').slice(0, 6)
  const counts = BOARDS.reduce<Partial<Record<Board, number>>>((acc, board) => {
    acc[board] = getBoardCount(board, 'en')
    return acc
  }, {})

  return (
    <>
      <Header lang="en" />
      <main>
        <Hero lang="en" />
        <ChamberGrid counts={counts} lang="en" />
        <RecentUpdates posts={posts} lang="en" />
      </main>
      <Footer lang="en" />
    </>
  )
}
