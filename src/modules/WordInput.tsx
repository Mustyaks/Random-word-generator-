import React from 'react'

type Props = {
  value: string
  onChange: (v: string) => void
  onGenerate: () => void
}

export const WordInput: React.FC<Props> = ({ value, onChange, onGenerate }) => {
  return (
    <div>
      <label htmlFor="words" className="sr-only">Word list</label>
      <textarea
        id="words"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Enter up to 2048 words, one per line (or separated by spaces)"
        className="w-full min-h-44 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 backdrop-blur px-3 py-3 shadow-soft outline-none focus:ring-2 focus:ring-brand placeholder:text-slate-400"
      />
      <div className="mt-3 flex justify-center">
        <button
          className="rounded-lg bg-brand text-slate-900 font-semibold px-4 py-2 hover:bg-brand-dark active:scale-[0.98]"
          onClick={onGenerate}
        >
          Generate Words
        </button>
      </div>
    </div>
  )
}


