import Modal from './Modal'

export default function ConfirmDialog({ open, title = 'Delete item?', message = 'This action cannot be undone.', onConfirm, onClose, loading = false }) {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <p className="mb-6 text-sm text-muted">{message}</p>
      <div className="flex justify-end gap-3">
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn bg-red-500/15 text-red-300 hover:bg-red-500/25" disabled={loading} onClick={onConfirm}>{loading ? 'Deleting…' : 'Delete'}</button>
      </div>
    </Modal>
  )
}
