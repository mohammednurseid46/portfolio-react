import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { apiFetch } from './adminApi'
import { isAuthenticated } from './auth'

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState(isAuthenticated() ? 'checking' : 'missing')

  useEffect(() => {
    if (!isAuthenticated()) return
    apiFetch('/auth/me')
      .then(() => setStatus('valid'))
      .catch(() => setStatus('missing'))
  }, [])

  if (status === 'checking') {
    return <div className="flex min-h-screen items-center justify-center bg-bg text-muted">Checking session…</div>
  }
  if (status !== 'valid') return <Navigate to="/admin/login" replace />
  return children
}
