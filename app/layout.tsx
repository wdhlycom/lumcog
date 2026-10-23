import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cinzel, Geist, Noto_Sans_SC } from 'next/font/google'
import { HtmlLangSync } from '@/components/html-lang-sync'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-display' })
const notoSans = Noto_Sans_SC({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-cjk' })

export const metadata: Metadata = {
  metadataBase: new URL('https://lumcog.com'),
  title: { default: '觉思集 Lumcog — Light of Cognition', template: '%s · 觉思集 Lumcog' },
  description: '心智启明，集录所思。A bilingual digital garden for ideas, books, essays, dialogues, and thoughtful curation.',
  alternates: { canonical: 'https://lumcog.com' },
  openGraph: { type: 'website', siteName: '觉思集 Lumcog', title: '觉思集 Lumcog — Light of Cognition', description: '心智启明，集录所思。' },
  twitter: { card: 'summary_large_image', title: '觉思集 Lumcog — Light of Cognition', description: '心智启明，集录所思。' },
}

export const viewport: Viewport = { themeColor: '#0B0A1F', colorScheme: 'dark light', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN" className="bg-background"><body className={`${geist.variable} ${cinzel.variable} ${notoSans.variable} font-sans antialiased`}>{children}<HtmlLangSync /><Analytics /></body></html>
}
