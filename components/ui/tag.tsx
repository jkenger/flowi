import React from 'react'

const Tag = ({title = ""}: {title: String}) => {
  return (
    <div className="inline-flex items-center border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300 border-transparent bg-slate-900 shadow hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80 subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">{title}</div>
  )
}

export default Tag