'use client'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'

export function LanguageToggle() {
  const pathname = usePathname()
  const router = useRouter()
  const isEn = pathname.startsWith('/en')
  const switchTo = isEn ? pathname.replace(/^\/en/, '') || '/' : `/en${pathname}`
  return (
    <button
      type="button"
      onClick={() => router.push(switchTo)}
      className="rounded-full border border-border px-3 py-2 text-xs tracking-widest text-muted-foreground hover:border-primary hover:text-primary"
      aria-label="Switch language"
    >
      {isEn ? '中文' : 'English'}
    </button>
  )
}

export function ThemeToggle() {
  const [light, setLight] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.classList.toggle('light')
        setLight(!light)
      }}
      className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"
      aria-label="Toggle color theme"
    >
      {light ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  )
}
