import React, { useEffect, useMemo, useState } from 'react'
import { WordInput } from './WordInput'
import { WordGrid } from './WordGrid'
import { Controls } from './Controls'

const DEFAULT_WORDS = [
  'focus','clarity','momentum','create','spark','flow','calm','brave',
  'learn','build','ship','craft','iterate','balance','energy','insight',
]

function sanitizeAndSplitWords(raw: string): string[] {
  if (!raw) return []
  const tokens = raw
    .replace(/\r/g, '\n')
    .split(/[\n\t ,]+/)
    .map(w => w.trim())
    .filter(Boolean)

  const seen = new Set<string>()
  const unique: string[] = []
  for (const t of tokens) {
    const key = t.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(t)
    }
  }
  return unique.slice(0, 2048)
}

function pickRandomUnique(words: string[], count: number): string[] {
  const arr = words.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.slice(0, Math.min(count, arr.length))
}

export const App: React.FC = () => {
  const [raw, setRaw] = useState('')
  const [words, setWords] = useState<string[]>([])
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  ))

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  const inputList = useMemo(() => {
    const list = sanitizeAndSplitWords(raw)
    return list.length ? list : DEFAULT_WORDS
  }, [raw])

  const generate = () => {
    setWords(pickRandomUnique(inputList, 12))
  }

  const copy = async () => {
    if (words.length === 0) return
    const text = words.join('\n')
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return
    }
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    try { document.execCommand('copy') } finally { document.body.removeChild(ta) }
  }

  const clearAll = () => {
    setRaw('')
    setWords([])
  }

  useEffect(() => { generate() }, [])

  return (
    <div className="min-h-dvh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Random Word Generator</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Paste your word list and generate 12 random ones instantly.</p>
        </header>

        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            className="rounded-md border px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <section className="mt-6">
          <WordInput value={raw} onChange={setRaw} onGenerate={generate} />
        </section>

        <section className="mt-6">
          <WordGrid words={words} />
          <Controls onGenerate={generate} onCopy={copy} onClear={clearAll} canCopy={words.length > 0} />
        </section>

        <footer className="mt-8 text-center text-xs text-slate-500">All in-browser. No data leaves your device.</footer>
      </div>
    </div>
  )
}


