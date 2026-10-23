import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

export type Lang = 'zh' | 'en'

const CONTENT_DIR: Record<Lang, string> = {
  zh: path.join(process.cwd(), 'content'),
  en: path.join(process.cwd(), 'content-en'),
}

export const BOARDS = ['seeds', 'notes', 'essays', 'dialogues', 'curated'] as const
export type Board = (typeof BOARDS)[number]

export type Post = {
  lang: Lang
  board: Board
  slug: string
  title: string
  subtitle: string
  titleEn: string
  subtitleEn: string
  date: string
  dateLabel: string
  summary: string
  lead: string
  series: string
  cover: string
  tags: string[]
  status: 'draft' | 'published'
  html: string
  readingMinutes: number
}

function isoDate(value: unknown): string {
  const d = value instanceof Date ? value : new Date(String(value ?? ''))
  if (Number.isNaN(d.getTime())) return ''
  return d.toISOString().slice(0, 10)
}

function textLength(text: string, lang: Lang): number {
  const plain = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#>*`\-[\]()!]/g, '')
    .replace(/\s+/g, '')
  // 英文按词数估算阅读时长，中文按字符数。
  if (lang === 'en') return plain.split(/\s+/).filter(Boolean).length
  return plain.length
}

function readBoard(board: Board, lang: Lang): Post[] {
  const dir = path.join(CONTENT_DIR[lang], board)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8')
      const { data, content } = matter(raw)
      const date = isoDate(data.date)
      const [year = '', month = '', day = ''] = date.split('-')

      return {
        lang,
        board,
        slug: file.replace(/\.md$/i, ''),
        title: String(data.title ?? '无标题'),
        subtitle: String(data.subtitle ?? ''),
        titleEn: String(data.title_en ?? ''),
        subtitleEn: String(data.subtitle_en ?? ''),
        date,
        dateLabel: date ? `${month}.${day}.${year}` : '',
        summary: String(data.summary ?? ''),
        lead: String(data.lead ?? ''),
        series: String(data.series ?? ''),
        cover: String(data.cover ?? ''),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        status: data.status === 'published' ? 'published' : 'draft',
        html: marked.parse(content) as string,
        readingMinutes: Math.max(1, Math.round(textLength(content, lang) / (lang === 'en' ? 200 : 400))),
      } satisfies Post
    })
}

/** 本地开发时会连草稿一起显示，正式构建时只显示已发布的内容。 */
export function showDrafts(): boolean {
  return process.env.NODE_ENV !== 'production'
}

export function getPosts(board?: Board, lang: Lang = 'zh'): Post[] {
  const list = board ? readBoard(board, lang) : BOARDS.flatMap((boardKey) => readBoard(boardKey, lang))
  return list
    .filter((post) => showDrafts() || post.status === 'published')
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export function getPost(board: string, slug: string, lang: Lang = 'zh'): Post | null {
  if (!BOARDS.includes(board as Board)) return null
  return getPosts(board as Board, lang).find((post) => post.slug === slug) ?? null
}

export function getBoardCount(board: Board, lang: Lang = 'zh'): number {
  return getPosts(board, lang).length
}

/**
 * 只有当文章属于同一个 `series`（主题相近的多篇）时，才在文末出现「上一篇 / 下一篇」。
 * 单篇（没写 series）不与任何文章互链——不同主题、不同栏目不该被串成上下篇。
 * 顺序按日期由早到晚，同日按文件名。
 */
export function getAdjacentPosts(post: Post): { prev: Post | null; next: Post | null } {
  if (!post.series) return { prev: null, next: null }

  const pool = getPosts(post.board, post.lang)
    .filter((item) => item.series === post.series)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1
      return a.slug.localeCompare(b.slug)
    })

  const index = pool.findIndex((item) => item.slug === post.slug)
  if (index < 0) return { prev: null, next: null }
  return {
    prev: index > 0 ? pool[index - 1] : null,
    next: index < pool.length - 1 ? pool[index + 1] : null,
  }
}
