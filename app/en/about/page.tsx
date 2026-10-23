import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { chambers, Footer, Header } from '@/components/site'

export const metadata: Metadata = {
  title: 'About',
  description: 'Lumcog — one person’s coordinates, work, and origins. Light of Cognition.',
  alternates: { canonical: 'https://lumcog.com/en/about' },
}

export default function AboutPageEn() {
  return (
    <>
      <Header lang="en" />
      <main className="mx-auto max-w-3xl px-6 pb-24">
        <Link href="/en" className="inline-flex items-center gap-2 py-6 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft aria-hidden="true" />
          Home
        </Link>

        <section className="border-b border-border pb-10">
          <p className="font-display text-xs uppercase tracking-[.35em] text-primary">About</p>
          <h1 className="mt-4 font-cjk text-5xl font-semibold">About</h1>
        </section>

        <div className="article mt-10">
          <p>This is Lumcog — a digital garden that keeps growing.</p>
          <p>It gathers short thoughts, book margins, long essays, and conversations. No chasing trends, no publishing cadence; what gets written simply stays, in the order it arrived.</p>
          <p>Six chambers:</p>
          <ul>
            {chambers
              .filter((chamber) => chamber.key)
              .map((chamber) => (
                <li key={chamber.href}>
                  <strong>{chamber.en}</strong> — {chamber.descEn}
                </li>
              ))}
          </ul>
          <p>The name Lumcog comes from Light of Cognition — where thought is gathered and kept.</p>
          <p>This page can be rewritten however you like: a self-introduction, your origins and work — just say the word.</p>
        </div>
      </main>
      <Footer lang="en" />
    </>
  )
}
