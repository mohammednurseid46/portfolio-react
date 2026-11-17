import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Briefcase, ChevronRight, Code2, LayoutDashboard, LogOut, Mail, Menu, Moon, Network, Settings2, Sparkles, Sun, X } from 'lucide-react'
import { logout } from './adminApi'
import Toast from './components/Toast'
import Background from '../components/Background'
import { backgrounds } from '../data'

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/messages', label: 'Messages', icon: Mail },
  { to: '/admin/projects', label: 'Projects', icon: Briefcase },
  { to: '/admin/skills', label: 'Skills', icon: Code2 },
  { to: '/admin/services', label: 'Services', icon: Settings2 },
]

export default function AdminLayout() {
  const [theme, setTheme] = useState(() => localStorage.getItem('ms-theme') || 'dark')
  const [bg, setBg] = useState(() => {
    const saved = localStorage.getItem('ms-bg')
    return backgrounds.some(item => item.id === saved) ? saved : 'constellation'
  })
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const location = useLocation()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.accent = localStorage.getItem('ms-accent') || 'cyan'
    localStorage.setItem('ms-theme', theme)
    localStorage.setItem('ms-bg', bg)
    document.title = 'Admin | Mohammednur Seid'
    let robots = document.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.appendChild(robots)
    }
    robots.content = 'noindex'
    return () => { robots.content = 'index, follow' }
  }, [theme, bg])

  useEffect(() => setOpen(false), [location.pathname])

  const showToast = (message, type = 'success') => setToast({ message, type })
  return (
    <div className="relative min-h-screen bg-bg text-fg">
      <Background mode={bg} theme={theme} accent={localStorage.getItem('ms-accent') || 'cyan'} />
      <button className="fixed left-4 top-4 z-[70] rounded-xl border border-line bg-card p-2.5 text-fg shadow-lg backdrop-blur-xl md:hidden" aria-label="Open admin navigation" onClick={() => setOpen(true)}><Menu size={20} /></button>
      {open && <button className="fixed inset-0 z-40 bg-black/60 md:hidden" aria-label="Close admin navigation" onClick={() => setOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-line bg-bg/95 p-5 backdrop-blur-xl transition-transform md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-10 flex items-center justify-between">
          <Link to="/admin" className="brand-lockup flex items-center gap-3 font-display font-bold"><span className="brand-mark">M</span><span>Admin Console</span></Link>
          <button className="rounded-lg p-2 text-muted hover:text-fg md:hidden" aria-label="Close admin navigation" onClick={() => setOpen(false)}><X size={18} /></button>
        </div>
        <nav className="grid gap-1" aria-label="Admin navigation">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-accent/15 text-accent' : 'text-muted hover:bg-card hover:text-fg'}`}>
              <Icon size={18} />{label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto grid gap-2">
          <Link to="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted hover:bg-card hover:text-fg"><ChevronRight size={18} />View public site</Link>
          <button className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-muted hover:bg-card hover:text-fg" onClick={logout}><LogOut size={18} />Log out</button>
        </div>
      </aside>
      <div className="md:pl-72">
        <header className="flex h-20 items-center justify-between border-b border-line px-5 pl-20 md:px-10 md:pl-10">
          <div><p className="text-xs uppercase tracking-[.18em] text-accent">Admin</p><p className="text-sm text-muted">Manage your portfolio</p></div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 rounded-xl border border-line px-2.5 py-2 text-sm text-muted" title="Choose admin background">
              {bg === 'minimal' ? <Sparkles size={16} /> : <Network size={16} />}
              <span className="sr-only">Background</span>
              <select className="bg-transparent text-fg focus:outline-none" aria-label="Choose background" value={bg} onChange={event => setBg(event.target.value)}>
                {backgrounds.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
              </select>
            </label>
            <button className="rounded-xl border border-line p-2.5 text-muted hover:border-accent hover:text-accent" aria-label="Toggle theme" onClick={() => setTheme(value => value === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-7xl p-5 md:p-10"><Outlet context={{ showToast }} /></main>
      </div>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  )
}
