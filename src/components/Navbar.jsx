import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Home, User, Code, Layers, Briefcase, Mail, Settings, Sun, Moon, Search } from 'lucide-react'
import { accents, backgrounds, sections } from '../data'

const icons = { home: Home, about: User, skills: Code, services: Layers, projects: Briefcase, contact: Mail }
const swatch = { cyan: '#00e5ff', violet: '#a78bfa', emerald: '#34d399', amber: '#fbbf24' }

export default function Navbar({ theme, setTheme, accent, setAccent, bg, setBg, onReset, onOpenPalette }) {
  const [active, setActive] = useState('home')
  const [showSettings, setShowSettings] = useState(false)
  const settingsRef = useRef(null)

  // highlight the link of the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  // close the settings popover on outside click / Escape
  useEffect(() => {
    if (!showSettings) return undefined
    const onDown = e => { if (!settingsRef.current?.contains(e.target)) setShowSettings(false) }
    const onKey = e => { if (e.key === 'Escape') setShowSettings(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [showSettings])

  return (
    <nav className="fixed left-0 top-0 z-50 w-full px-3 pt-3 sm:px-6 sm:pt-4" aria-label="Main">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full py-2 pl-3 pr-2 shadow-lg sm:pl-4">
        <a href="#home" aria-label="Home" className="brand-lockup flex shrink-0 items-center gap-2 rounded-full p-1 pr-2 transition-colors">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span className="brand-name text-gradient hidden text-sm font-semibold sm:inline">Mohammednur Seid</span>
        </a>

        <ul className="m-0 flex list-none items-center gap-0.5 p-0 sm:gap-1">
          {sections.map(s => {
            const Icon = icons[s.id]
            const isActive = active === s.id
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-label={s.label}
                  aria-current={isActive ? 'page' : undefined}
                  className={`nav-link relative flex items-center gap-2 rounded-full px-2.5 py-2 text-sm font-semibold transition-colors lg:px-4 ${isActive ? 'is-active text-[#04070b]' : 'text-muted'}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-0 rounded-full"
                      style={{ background: 'linear-gradient(120deg, var(--accent), var(--accent2))' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon size={18} className="relative z-10" />
                  <span className="relative z-10 hidden lg:inline">{s.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-1.5" ref={settingsRef}>
          <button
            onClick={onOpenPalette}
            className="hidden items-center gap-2 rounded-full border border-line px-3 py-2 text-xs text-muted transition-colors hover:border-accent hover:text-accent md:flex"
            aria-label="Open command palette"
          >
            <Search size={14} /> Search <span className="kbd">Ctrl K</span>
          </button>
          <button
            onClick={onOpenPalette}
            className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:text-accent md:hidden"
            aria-label="Open command palette"
          >
            <Search size={18} />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowSettings(v => !v)}
              aria-expanded={showSettings}
              aria-label="Appearance settings"
              className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${showSettings ? 'bg-accent/20 text-accent' : 'text-muted hover:text-accent'}`}
            >
              <Settings size={18} />
            </button>

            {showSettings && (
              <div
                className="glass absolute right-0 top-[calc(100%+0.9rem)] z-50 w-72 rounded-2xl p-5 text-left shadow-2xl"
                style={{ background: 'color-mix(in srgb, var(--bg) 90%, transparent)' }}
              >
                <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted">Appearance</p>
                <div className="mb-5 grid grid-cols-2 gap-2">
                  {[['dark', 'Dark', Moon], ['light', 'Light', Sun]].map(([id, label, Icon]) => (
                    <button
                      key={id} onClick={() => setTheme(id)}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${theme === id ? 'border-accent text-accent' : 'border-line text-muted hover:text-fg'}`}
                    >
                      <Icon size={15} /> {label}
                    </button>
                  ))}
                </div>

                <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted">Accent colour</p>
                <div className="mb-5 flex gap-3">
                  {accents.map(a => (
                    <button
                      key={a} onClick={() => setAccent(a)} aria-label={`Accent ${a}`}
                      className={`h-8 w-8 rounded-full transition-transform hover:scale-110 ${accent === a ? 'ring-2 ring-fg ring-offset-2 ring-offset-bg' : ''}`}
                      style={{ background: swatch[a] }}
                    />
                  ))}
                </div>

                <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted">Environment</p>
                <div className="mb-5 flex flex-col gap-1.5">
                  {backgrounds.map(b => (
                    <button
                      key={b.id} onClick={() => setBg(b.id)}
                      className={`rounded-xl border px-3 py-2 text-left text-sm font-medium transition-colors ${bg === b.id ? 'border-accent text-accent' : 'border-line text-muted hover:text-fg'}`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>

                <button onClick={onReset} className="w-full rounded-xl border border-line py-2 text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent">
                  Reset
                </button>
                <p className="mt-3 text-center text-[11px] text-muted">Saved in your browser.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
