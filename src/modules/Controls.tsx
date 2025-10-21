import React from 'react'

type Props = {
  onGenerate: () => void
  onCopy: () => void | Promise<void>
  onClear: () => void
  canCopy: boolean
}

export const Controls: React.FC<Props> = ({ onGenerate, onCopy, onClear, canCopy }) => {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button
        className="rounded-lg bg-brand text-slate-900 font-semibold px-4 py-2 hover:bg-brand-dark active:scale-[0.98]"
        onClick={onGenerate}
      >
        Generate Words
      </button>
      <button
        className="rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-60"
        disabled={!canCopy}
        onClick={onCopy}
      >
        Copy Words
      </button>
      <button
        className="rounded-lg border border-transparent px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
        onClick={onClear}
      >
        Clear
      </button>
    </div>
  )
}


