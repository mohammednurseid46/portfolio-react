import { clearToken, getToken, setToken } from './auth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {})
  headers.set('Accept', 'application/json')
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  let response
  try {
    response = await fetch(`${API_URL}${path}`, { ...options, headers })
  } catch {
    throw new Error('Unable to reach the API. Check VITE_API_URL and CORS_ORIGINS.')
  }
  if (response.status === 401) {
    clearToken()
    if (token) {
      window.location.hash = '#/admin/login'
      throw new Error('Your session has expired. Please log in again.')
    }
    const error = new Error('Invalid credentials')
    error.status = 401
    throw error
  }

  const contentType = response.headers.get('content-type') || ''
  const body = contentType.includes('application/json') ? await response.json() : await response.text()
  if (!response.ok) {
    const message = typeof body === 'object' && body?.message
    throw new Error(Array.isArray(message) ? message.join(', ') : message || 'Request failed')
  }
  return body
}

export async function login(username, password) {
  const body = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  setToken(body.accessToken)
  return body
}

export function logout() {
  clearToken()
  window.location.hash = '#/admin/login'
}
