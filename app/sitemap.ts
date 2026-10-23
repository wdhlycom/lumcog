import type { MetadataRoute } from 'next'
import { BOARDS, getPosts, type Lang } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const langs: Lang[] = ['zh', 'en']
  const pages: MetadataRoute.Sitemap = []
  for (const lang of langs) {
    const base = lang === 'en' ? '/en' : ''
    pages.push(
      ...['', ...BOARDS, 'about', 'archive'].map((path) => ({
        url: `https://lumcog.com${base}/${path}`.replace(/\/$/, ''),
        lastModified: new Date(),
      })),
    )
  }

  const posts: MetadataRoute.Sitemap = []
  for (const lang of langs) {
    const base = lang === 'en' ? '/en' : ''
    posts.push(
      ...getPosts(undefined, lang).map((post) => ({
        url: `https://lumcog.com${base}/post/${post.board}/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
      })),
    )
  }

  return [...pages, ...posts]
}
