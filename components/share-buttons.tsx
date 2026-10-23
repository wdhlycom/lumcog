'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Check, Copy, Share2 } from 'lucide-react'

export function ShareButtons() {
  const pathname = usePathname()
  const isEn = pathname.startsWith('/en')
  const [copied, setCopied] = useState(false)
  const label = isEn
    ? { share: 'Share', copy: 'Copy link', copied: 'Copied' }
    : { share: '分享', copy: '复制链接', copied: '已复制' }

  async function share() {
    const data = { title: document.title, url: location.href }
    if (navigator.share) await navigator.share(data)
    else {
      await navigator.clipboard.writeText(location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

  return (
    <div className="mt-12 flex flex-wrap items-center gap-3 border-y border-border py-5">
      <button
        onClick={share}
        className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-primary hover:border-primary"
      >
        <Share2 aria-hidden="true" />
        {label.share}
      </button>
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(location.href)
          setCopied(true)
          setTimeout(() => setCopied(false), 1800)
        }}
        className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-primary"
      >
        {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        {copied ? label.copied : label.copy}
      </button>
    </div>
  )
}
