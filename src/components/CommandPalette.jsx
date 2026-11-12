import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CornerDownLeft, Search } from 'lucide-react'

// Press Ctrl/Cmd + K: jump anywhere, open projects, change theme, copy email.
export default function CommandPalette({ open, onClose, actions }) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return actions
    return actions.filter(a => `${a.label} ${a.group} ${a.keywords || ''} ${a.hint || ''}`.toLowerCase().includes(q))
  }, [actions, query])

  useEffect(() => {
    if (open) {
      setQuery(''); setIndex(0)
      const t = setTimeout(() => inputRef.current?.focus(), 30)
      return () => clearTimeout(t)
    }
    return undefined
  }, [open])

  useEffect(() => { setIndex(0) }, [query])

  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${index}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [index])

  const run = action => { if (!action) return; onClose(); action.run() }

  const onKeyDown = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIndex(i => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIndex(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); run(results[index]) }
    else if (e.key === 'Escape') { e.preventDefault(); onClose() }
  }

  let lastGroup = ''
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/55 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-label="Command palette"
            className="glass w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
            style={{ background: 'color-mix(in srgb, var(--bg) 88%, transparent)' }}
            initial={{ opacity: 0, y: -16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onMouseDown={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <Search size={18} className="text-muted" />
              <input
                ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={onKeyDown}
                placeholder="Type a command or search…  (projects, theme, contact)"
                className="w-full bg-transparent text-base text-fg outline-none placeholder:text-muted"
                aria-label="Search commands"
              />
              <span className="kbd">Esc</span>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && <p className="px-3 py-8 text-center text-sm text-muted">No results for “{query}”</p>}
              {results.map((a, i) => {
                const showGroup = a.group !== lastGroup
                lastGroup = a.group
                const Icon = a.icon
                return (
                  <div key={a.id}>
                    {showGroup && <p className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-widest text-muted">{a.group}</p>}
                    <button
                      data-idx={i} onMouseMove={() => setIndex(i)} onClick={() => run(a)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${i === index ? 'bg-accent/15 text-fg' : 'text-muted'}`}
                    >
                      <Icon size={16} className={i === index ? 'text-accent' : ''} />
                      <span className="flex-1 font-medium">{a.label}</span>
                      {a.hint && <span className="text-xs text-muted">{a.hint}</span>}
                      {i === index && <CornerDownLeft size={14} className="text-accent" />}
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-xs text-muted">
              <span><span className="kbd">↑</span> <span className="kbd">↓</span> navigate</span>
              <span><span className="kbd">Enter</span> select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
