import type { Metadata } from 'next'
import { ChamberGrid, Footer, Header, Hero, RecentUpdates } from '@/components/site'
import { BOARDS, getBoardCount, getPosts, type Board } from '@/lib/content'

export const metadata: Metadata = {
  title: '觉思集 Lumcog — Light of Cognition',
  description: '心智启明，集录所思。A living bilingual digital garden for ideas, books, essays, and conversations.',
  alternates: { canonical: 'https://lumcog.com' },
}

export default function Home() {
  const posts = getPosts().slice(0, 6)
  const counts = BOARDS.reduce<Partial<Record<Board, number>>>((acc, board) => {
    acc[board] = getBoardCount(board)
    return acc
  }, {})

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ChamberGrid counts={counts} />
        <RecentUpdates posts={posts} />
      </main>
      <Footer />
    </>
  )
}
