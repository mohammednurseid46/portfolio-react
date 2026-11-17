import { useEffect, useState } from 'react'
import { Eye, EyeOff, LockKeyhole } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { login } from '../adminApi'
import { isAuthenticated } from '../auth'
import Background from '../../components/Background'
import { backgrounds } from '../../data'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [bg] = useState(() => {
    const saved = localStorage.getItem('ms-bg')
    return backgrounds.some(item => item.id === saved) ? saved : 'constellation'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = localStorage.getItem('ms-theme') || 'dark'
    document.documentElement.dataset.accent = localStorage.getItem('ms-accent') || 'cyan'
    document.title = 'Admin Login | Mohammednur Seid'
    let robots = document.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.appendChild(robots)
    }
    robots.content = 'noindex'
    if (isAuthenticated()) navigate('/admin', { replace: true })
    return () => { robots.content = 'index, follow' }
  }, [navigate])

  const submit = async event => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form.username, form.password)
      navigate('/admin', { replace: true })
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to reach the API')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-bg px-4 text-fg">
      <Background mode={bg} theme={localStorage.getItem('ms-theme') || 'dark'} accent={localStorage.getItem('ms-accent') || 'cyan'} />
      <form className="glass w-full max-w-md rounded-3xl p-7 shadow-2xl md:p-9" onSubmit={submit}>
        <div className="mb-8 text-center"><div className="brand-mark mx-auto mb-4">M</div><h1 className="font-display text-2xl font-bold">Admin login</h1><p className="mt-2 text-sm text-muted">Sign in to manage your portfolio.</p></div>
        <div className="grid gap-5">
          <label className="grid gap-2 text-sm font-medium"><span>Username</span><input autoComplete="username" required className="rounded-xl border border-line bg-bg/60 px-3 py-3 focus:border-accent focus:outline-none" value={form.username} onChange={event => setForm({ ...form, username: event.target.value })} /></label>
          <label className="grid gap-2 text-sm font-medium"><span>Password</span><span className="relative"><input autoComplete="current-password" required className="w-full rounded-xl border border-line bg-bg/60 px-3 py-3 pr-11 focus:border-accent focus:outline-none" type={showPassword ? 'text' : 'password'} value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} /><button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-fg" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(value => !value)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>
          {error && <p role="alert" className="flex items-center gap-2 text-sm text-red-400"><LockKeyhole size={16} />{error}</p>}
          <button className="btn btn-primary w-full" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
        </div>
      </form>
    </main>
  )
}
