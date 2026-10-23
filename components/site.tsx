import Link from 'next/link'
import { ArrowUpRight, BookOpen, Feather, Gem, MessageCircle, Sparkles, UserRound } from 'lucide-react'
import { LanguageToggle, ThemeToggle } from './site-controls'
import type { Board, Lang, Post } from '@/lib/content'

const particles = [
  { left: '8%', top: '32%', size: 5, color: '#FFD166', dur: '11s', delay: '0s' },
  { left: '18%', top: '62%', size: 3, color: '#35E0FF', dur: '14s', delay: '2.2s' },
  { left: '30%', top: '24%', size: 4, color: '#FF3D9A', dur: '13s', delay: '4s' },
  { left: '44%', top: '70%', size: 3, color: '#FFD166', dur: '16s', delay: '1.1s' },
  { left: '56%', top: '28%', size: 5, color: '#35E0FF', dur: '12s', delay: '3.3s' },
  { left: '68%', top: '58%', size: 4, color: '#FF3D9A', dur: '15s', delay: '5s' },
  { left: '80%', top: '34%', size: 3, color: '#FFD166', dur: '13s', delay: '2.6s' },
  { left: '90%', top: '64%', size: 4, color: '#35E0FF', dur: '17s', delay: '1.6s' },
]

// 界面文案：中文站用 zh，英文站用 en。正文内容由内容层按 lang 提供。
// 铁律：zh 只写中文，en 只写英文，绝不中英并排。
export const UI = {
  zh: {
    aboutNav: '关于',
    home: '返回首页',
    backHome: '返回首页',
    chambersTitle: '六间思维室',
    chambersRange: '01 — 06',
    recentTitle: '最近更新',
    viewAll: '查看全部 →',
    empty: '这一间还空着。内容放进来之后会自动出现在这里。',
    draft: '草稿 · 仅在本地可见',
    minutes: (n: number) => `约 ${n} 分钟`,
    leadTag: '导读',
    seriesNav: (s: string) => `同一主题 · ${s}`,
    columnNav: '本栏目其它文章',
    prevLabel: '上一篇',
    nextLabel: '下一篇',
    navLabel: '同一主题的上下篇',
    joinTitle: '加入讨论',
    joinDesc: '评论区位置已经留好，Waline 部署完成后接进来即可。届时你可以在这里续楼补充，访客也能回复。',
    share: '分享',
    copyLink: '复制链接',
    copied: '已复制',
    heroTag: 'A living index of thought',
    heroZh: '觉思集',
    heroSub: 'Light of Cognition',
    heroLine: '心智启明，集录所思',
    heroDesc: '一个持续生长的数字花园，收藏短思、书页、长文与对话。',
    footerMid: 'Light of Cognition · 心智启明',
    boardCount: (n: number) => `共 ${n} 篇`,
    postsLabel: '篇',
  },
  en: {
    aboutNav: 'About',
    home: 'Home',
    backHome: 'Back to home',
    chambersTitle: 'Six chambers',
    chambersRange: '01 — 06',
    recentTitle: 'Recent updates',
    viewAll: 'View all →',
    empty: 'This chamber is still empty. Posts will appear here once they are added.',
    draft: 'Draft · local only',
    minutes: (n: number) => `~ ${n} min read`,
    leadTag: 'Lead',
    seriesNav: (s: string) => `Same series · ${s}`,
    columnNav: 'More in this chamber',
    prevLabel: 'Previous',
    nextLabel: 'Next',
    navLabel: 'More from the same series',
    joinTitle: 'Join the conversation',
    joinDesc: 'The comment section is wired up and waiting. Once Waline is deployed, you can continue the thread here and visitors can reply too.',
    share: 'Share',
    copyLink: 'Copy link',
    copied: 'Copied',
    heroTag: 'A living index of thought',
    heroZh: 'Lumcog',
    heroSub: 'Light of Cognition',
    heroLine: 'Where thought is gathered and kept',
    heroDesc: 'A digital garden for ideas, books, essays, and conversations.',
    footerMid: 'Light of Cognition',
    boardCount: (n: number) => `${n} posts`,
    postsLabel: 'posts',
  },
} as const

export type Chamber = {
  key?: Board
  href: string
  zh: string
  en: string
  desc: string
  descEn: string
  icon: typeof Feather
  tone: 'pink' | 'cyan' | 'gold'
}

export const chambers: Chamber[] = [
  { key: 'seeds', href: '/seeds', zh: '随想', en: 'Seeds', desc: '一闪而过的念头，也值得被留下。', descEn: 'A fleeting thought, worth keeping.', icon: Feather, tone: 'pink' },
  { key: 'notes', href: '/notes', zh: '读思', en: 'Notes', desc: '与书相遇，在页边写下回声。', descEn: 'Meeting books, writing echoes in the margin.', icon: BookOpen, tone: 'cyan' },
  { key: 'essays', href: '/essays', zh: '长文', en: 'Essays', desc: '把一个问题想得更远一些。', descEn: 'Thinking one question a little further.', icon: Sparkles, tone: 'gold' },
  { key: 'dialogues', href: '/dialogues', zh: '问答', en: 'Dialogues', desc: '从对话中提炼真正的问题。', descEn: 'Distilling real questions from dialogue.', icon: MessageCircle, tone: 'cyan' },
  { key: 'curated', href: '/curated', zh: '拾遗', en: 'Curated', desc: '发现、概括，并加入自己的注脚。', descEn: 'Found, summarized, annotated with your own footnote.', icon: Gem, tone: 'pink' },
  { href: '/about', zh: '关于', en: 'About', desc: '一个人的坐标、作品与来处。', descEn: "One person's coordinates, work, and origins.", icon: UserRound, tone: 'gold' },
]

export const TONE_COLOR: Record<Chamber['tone'], string> = {
  pink: 'var(--tone-pink)',
  cyan: 'var(--tone-cyan)',
  gold: 'var(--tone-gold)',
}

export function BoardLabel({ board, lang = 'zh' }: { board: Board; lang?: Lang }) {
  const item = chambers.find((chamber) => chamber.key === board)
  if (!item) return <>{board}</>
  return <>{lang === 'en' ? item.en : item.zh}</>
}

export function Header({ lang = 'zh' }: { lang?: Lang }) {
  const ui = UI[lang]
  const base = lang === 'en' ? '/en' : ''
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
      <Link href={base || '/'} className="group flex items-center gap-3" aria-label="Lumcog home">
        <span className="grid size-9 place-items-center rounded-full border border-primary/70 text-primary shadow-[0_0_22px_rgba(255,209,102,.35)]">✦</span>
        <span>
          <span className="font-cjk text-lg font-semibold tracking-[.18em]">{lang === 'en' ? 'LUMCOG' : '觉思集'}</span>
          {lang === 'zh' ? (
            <span className="ml-2 font-display text-xs tracking-[.25em] text-muted-foreground">LUMCOG</span>
          ) : null}
        </span>
      </Link>
      <nav className="flex items-center gap-2" aria-label="Site controls">
        <Link href={`${base}/about`} className="hidden rounded-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground sm:block">{ui.aboutNav}</Link>
        <LanguageToggle />
        <ThemeToggle />
      </nav>
    </header>
  )
}

export function Hero({ lang = 'zh' }: { lang?: Lang }) {
  const ui = UI[lang]
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-20 text-center sm:pb-28 sm:pt-28">
      <div className="gold-halo pointer-events-none absolute left-1/2 top-1/2 size-[54rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60" />
      <div className="nebula pointer-events-none absolute left-1/2 top-0 size-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,61,154,.34),rgba(53,224,255,.18)_38%,transparent_68%)] blur-2xl" />
      <div className="starfield pointer-events-none absolute inset-0 opacity-80" />
      <div className="particles" aria-hidden="true">
        {particles.map((particle, index) => (
          <span
            key={index}
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              background: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              animationDuration: particle.dur,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>
      <div className="relative mx-auto max-w-3xl">
        <p className="mb-7 font-display text-xs uppercase tracking-[.45em] text-primary">{ui.heroTag}</p>
        <h1 className="text-glow font-cjk text-6xl font-semibold tracking-[.14em] text-balance sm:text-8xl">{ui.heroZh}</h1>
        <p className="mt-5 font-display text-lg tracking-[.18em] text-primary sm:text-2xl">{ui.heroSub}</p>
        <p className="mt-3 font-cjk text-sm tracking-[.28em] text-muted-foreground">{ui.heroLine}</p>
        <div className="hairline mx-auto mt-9 w-40" />
        <p className="mx-auto mt-9 max-w-md text-sm leading-7 text-muted-foreground">{ui.heroDesc}</p>
      </div>
    </section>
  )
}

export function ChamberGrid({ counts, lang = 'zh' }: { counts: Partial<Record<Board, number>>; lang?: Lang }) {
  const ui = UI[lang]
  const base = lang === 'en' ? '/en' : ''
  return (
    <section className="mx-auto max-w-6xl px-6" aria-labelledby="chambers-title">
      <div className="mb-7 flex items-end justify-between border-b border-border pb-4">
        <div>
          <p className="font-display text-xs uppercase tracking-[.3em] text-primary">The chambers</p>
          <h2 id="chambers-title" className="mt-2 font-cjk text-2xl font-semibold">{ui.chambersTitle}</h2>
        </div>
        <span className="font-display text-xs text-muted-foreground">{ui.chambersRange}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {chambers.map(({ key, href, zh, en, desc, descEn, icon: Icon, tone }) => {
          const count = key ? counts[key] ?? 0 : 0
          return (
            <Link key={href} href={`${base}${href}`} className="glass-royal lift glow-hover group flex min-h-44 flex-col justify-between rounded-xl p-5">
              <div className="flex items-start justify-between">
                <span style={{ color: TONE_COLOR[tone] }}>
                  <Icon aria-hidden="true" />
                </span>
                <span className="font-display text-[11px] tracking-widest text-muted-foreground">{key ? `${count} ${lang === 'en' ? 'posts' : '篇'}` : ''}</span>
              </div>
              <div>
                <h3 className="font-cjk text-xl font-semibold">{lang === 'en' ? en : zh}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{lang === 'en' ? descEn : desc}</p>
              </div>
              <ArrowUpRight aria-hidden="true" className="absolute bottom-5 right-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export function PostList({ posts, lang = 'zh' }: { posts: Post[]; lang?: Lang }) {
  const ui = UI[lang]
  const base = lang === 'en' ? '/en' : ''
  if (posts.length === 0) {
    return <p className="border-b border-border/70 py-10 text-sm text-muted-foreground">{ui.empty}</p>
  }
  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <Link
          key={`${post.board}/${post.slug}`}
          href={`${base}/post/${post.board}/${post.slug}`}
          className="group grid gap-2 border-b border-border/70 py-5 sm:grid-cols-[9rem_7rem_1fr] sm:items-baseline"
        >
          <time className="font-display text-xs tracking-wider text-muted-foreground">{post.dateLabel}</time>
          <span className="font-display text-xs uppercase tracking-widest text-primary">
            <BoardLabel board={post.board} lang={lang} />
          </span>
          <span>
            <span className="font-cjk text-lg leading-8 transition-colors group-hover:text-primary">{post.title}</span>
            {post.status === 'draft' ? (
              <span className="ml-2 rounded-full border border-[var(--tone-pink)] px-2 py-0.5 align-middle font-display text-[10px] uppercase tracking-widest text-[var(--tone-pink)]">{ui.draft}</span>
            ) : null}
            {post.summary ? <span className="mt-1 block text-sm leading-6 text-muted-foreground">{post.summary}</span> : null}
          </span>
        </Link>
      ))}
    </div>
  )
}

export function RecentUpdates({ posts, lang = 'zh' }: { posts: Post[]; lang?: Lang }) {
  const ui = UI[lang]
  const base = lang === 'en' ? '/en' : ''
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-24" aria-labelledby="updates-title">
      <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
        <div>
          <p className="font-display text-xs uppercase tracking-[.3em] text-primary">Field notes</p>
          <h2 id="updates-title" className="mt-2 font-cjk text-2xl font-semibold">{ui.recentTitle}</h2>
        </div>
        {posts.length > 0 ? (
          <Link href={`${base}/archive`} className="text-sm text-primary hover:underline">{ui.viewAll}</Link>
        ) : null}
      </div>
      <PostList posts={posts} lang={lang} />
    </section>
  )
}

export function Footer({ lang = 'zh' }: { lang?: Lang }) {
  const ui = UI[lang]
  return (
    <footer className="border-t border-border/70 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
        <span className="font-display tracking-widest">{lang === 'en' ? 'LUMCOG' : '觉思集 LUMCOG'}</span>
        <span>{ui.footerMid}</span>
      </div>
    </footer>
  )
}
