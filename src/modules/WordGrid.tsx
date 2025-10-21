import React from 'react'

type Props = {
  words: string[]
}

export const WordGrid: React.FC<Props> = ({ words }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {words.map((w, i) => (
        <div
          key={w + i}
          style={{ animationDelay: `${i * 20}ms` }}
          className="animate-fadeIn rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-center px-3 py-4 shadow-soft"
        >
          {w}
        </div>
      ))}
    </div>
  )
}


