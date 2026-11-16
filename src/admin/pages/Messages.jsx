import { useEffect, useMemo, useState } from 'react'
import { Mail, MailOpen, Trash2 } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import { apiFetch } from '../adminApi'
import ConfirmDialog from '../components/ConfirmDialog'
import DataTable from '../components/DataTable'

export default function Messages() {
  const { showToast } = useOutletContext()
  const [messages, setMessages] = useState([])
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteId, setDeleteId] = useState(null)

  const load = () => {
    setLoading(true)
    apiFetch('/messages').then(setMessages).catch(error => setError(error.message)).finally(() => setLoading(false))
  }
  useEffect(load, [])
  const visible = useMemo(() => filter === 'unread' ? messages.filter(message => !message.isRead) : messages, [filter, messages])

  const markRead = async message => {
    try {
      const updated = await apiFetch(`/messages/${message.id}`, { method: 'PATCH', body: JSON.stringify({ isRead: true }) })
      setMessages(items => items.map(item => item.id === updated.id ? updated : item))
      setSelected(updated)
      showToast('Message marked as read')
    } catch (error) { showToast(error.message, 'error') }
  }
  const remove = async () => {
    try {
      await apiFetch(`/messages/${deleteId}`, { method: 'DELETE' })
      setMessages(items => items.filter(item => item.id !== deleteId))
      setSelected(null)
      setDeleteId(null)
      showToast('Message deleted')
    } catch (error) { showToast(error.message, 'error') }
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="section-eyebrow">Inbox</p><h1 className="mt-2 font-display text-3xl font-bold">Messages</h1></div><div className="flex rounded-xl border border-line p-1 text-sm"><button className={`rounded-lg px-3 py-2 ${filter === 'all' ? 'bg-accent/15 text-accent' : 'text-muted'}`} onClick={() => setFilter('all')}>All</button><button className={`rounded-lg px-3 py-2 ${filter === 'unread' ? 'bg-accent/15 text-accent' : 'text-muted'}`} onClick={() => setFilter('unread')}>Unread</button></div></div>
      {loading ? <p className="text-muted">Loading messages…</p> : error ? <p role="alert" className="text-red-400">{error}</p> : <DataTable rows={visible} columns={[
        { key: 'name', label: 'From', render: message => <span className={!message.isRead ? 'font-bold' : ''}>{message.name}</span> },
        { key: 'email', label: 'Email' },
        { key: 'message', label: 'Message', render: message => <span className="block max-w-xs truncate text-muted">{message.message}</span> },
        { key: 'createdAt', label: 'Received', render: message => new Date(message.createdAt).toLocaleString() },
        { key: 'status', label: 'Status', render: message => <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${message.isRead ? 'bg-card text-muted' : 'bg-accent/15 text-accent'}`}>{message.isRead ? <MailOpen size={13} /> : <Mail size={13} />}{message.isRead ? 'Read' : 'Unread'}</span> },
      ]} empty={filter === 'unread' ? 'No unread messages.' : 'Your inbox is empty.'} onRowClick={setSelected} />}
      {selected && <div className="glass rounded-2xl p-6"><div className="mb-5 flex flex-wrap items-start justify-between gap-4"><div><h2 className="font-display text-xl font-bold">{selected.name}</h2><a className="text-sm text-accent hover:underline" href={`mailto:${selected.email}`}>{selected.email}</a><p className="mt-1 text-xs text-muted">{new Date(selected.createdAt).toLocaleString()}</p></div><button className="btn btn-ghost" onClick={() => setSelected(null)}>Close</button></div><p className="whitespace-pre-wrap text-sm leading-7 text-muted">{selected.message}</p><div className="mt-6 flex flex-wrap gap-3"><a className="btn btn-primary" href={`mailto:${selected.email}?subject=${encodeURIComponent('Re: Your portfolio message')}`}><Mail size={17} />Reply by email</a>{!selected.isRead && <button className="btn btn-ghost" onClick={() => markRead(selected)}>Mark as read</button>}<button className="btn bg-red-500/15 text-red-300 hover:bg-red-500/25" onClick={() => setDeleteId(selected.id)}><Trash2 size={17} />Delete</button></div></div>}
      <ConfirmDialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)} onConfirm={remove} />
    </div>
  )
}
