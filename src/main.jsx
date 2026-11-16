import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './index.css'
import App from './App.jsx'

const AdminApp = lazy(() => import('./admin/AdminApp.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-bg text-muted">Loading…</div>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="*" element={<App />} />
        </Routes>
      </Suspense>
    </HashRouter>
  </StrictMode>,
)
