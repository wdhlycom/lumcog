import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { chambers, Footer, Header } from '@/components/site'

export const metadata: Metadata = {
  title: '关于',
  description: '觉思集 Lumcog — 一个人的坐标、作品与来处。',
  alternates: { canonical: 'https://lumcog.com/about' },
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 pb-24">
        <Link href="/" className="inline-flex items-center gap-2 py-6 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft aria-hidden="true" />
          返回首页
        </Link>

        <section className="border-b border-border pb-10">
          <p className="font-display text-xs uppercase tracking-[.35em] text-primary">About</p>
          <h1 className="mt-4 font-cjk text-5xl font-semibold">关于</h1>
        </section>

        <div className="article mt-10">
          <p>这里是「觉思集」——一个持续生长的数字花园。</p>
          <p>它收藏短思、书页、长文与对话。不追热点，不设更新节奏，写下来的东西按时间留下。</p>
          <p>六个栏目：</p>
          <ul>
            {chambers.filter((chamber) => chamber.key).map((chamber) => (
              <li key={chamber.href}>
                <strong>{chamber.zh}</strong>—— {chamber.desc}
              </li>
            ))}
          </ul>
          <p>英文站名 Lumcog 取自 Light of Cognition，心智启明，集录所思。</p>
          <p>这一页之后可以按你的意思改写：换成自述、加上来处与作品，都可以直接说。</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
