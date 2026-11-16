import { CheckCircle2, XCircle, X } from 'lucide-react'

export default function Toast({ toast, onClose }) {
  if (!toast) return null
  const success = toast.type !== 'error'
  return (
    <div role="status" className="fixed bottom-5 right-5 z-[90] flex max-w-sm items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 text-sm shadow-2xl backdrop-blur-xl">
      {success ? <CheckCircle2 className="text-emerald-400" size={18} /> : <XCircle className="text-red-400" size={18} />}
      <span className="flex-1">{toast.message}</span>
      <button aria-label="Dismiss notification" onClick={onClose}><X size={16} /></button>
    </div>
  )
}
