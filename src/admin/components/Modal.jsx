import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = event => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="glass max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 id="modal-title" className="font-display text-xl font-bold">{title}</h2>
          <button className="rounded-lg p-2 text-muted hover:bg-card hover:text-fg" aria-label="Close dialog" onClick={onClose}><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}
