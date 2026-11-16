import { useEffect, useState } from 'react'
import { BarChart3, Mail, Users, Eye, Inbox } from 'lucide-react'
import { apiFetch } from '../adminApi'
import StatCard from '../components/StatCard'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [messages, setMessages] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([apiFetch('/analytics/summary'), apiFetch('/messages')])
      .then(([summary, inbox]) => { setData(summary); setMessages(inbox) })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-muted">Loading dashboard…</p>
  if (error) return <p role="alert" className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-300">{error}</p>
  const max = Math.max(...(data.viewsPerDay || []).map(item => item.count), 1)
  return (
    <div className="grid gap-8">
      <div><p className="section-eyebrow">Overview</p><h1 className="mt-2 font-display text-3xl font-bold">Welcome back.</h1></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total views" value={data.totalViews ?? '—'} icon={Eye} />
        <StatCard label="Unique visitors" value={data.uniqueVisitors ?? '—'} icon={Users} />
        <StatCard label="Total messages" value={messages.length} icon={Inbox} />
        <StatCard label="Unread messages" value={messages.filter(message => !message.isRead).length} icon={Mail} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="glass rounded-2xl p-5"><div className="mb-6 flex items-center gap-2"><BarChart3 size={18} className="text-accent" /><h2 className="font-display font-bold">Views per day <span className="text-sm font-normal text-muted">last 30 days</span></h2></div>
          <div className="flex h-56 items-end gap-1 border-b border-line px-1">{(data.viewsPerDay || []).map(item => <div key={item.date} className="group relative flex-1 bg-accent/70 transition-colors hover:bg-accent" style={{ height: `${Math.max((item.count / max) * 100, 3)}%` }} title={`${item.date}: ${item.count}`}><span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded bg-bg px-2 py-1 text-[10px] whitespace-nowrap group-hover:block">{item.count}</span></div>)}</div>
        </section>
        <section className="glass rounded-2xl p-5"><h2 className="mb-5 font-display font-bold">Top pages</h2>{data.topPaths?.length ? <div className="grid gap-3">{data.topPaths.map(item => <div className="flex items-center justify-between gap-4 text-sm" key={item.path}><span className="truncate text-muted">{item.path}</span><strong>{item.count}</strong></div>)}</div> : <p className="text-sm text-muted">No page views yet.</p>}</section>
      </div>
    </div>
  )
}
