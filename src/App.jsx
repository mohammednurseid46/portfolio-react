import { useEffect, useMemo, useState } from 'react'
import {
  Home, User, Code, Layers, Briefcase, Mail, Sun, Moon, Palette, Copy, Network, Sparkles,
} from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import Background from './components/Background'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import CommandPalette from './components/CommandPalette'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Services from './components/Services'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { useStored } from './hooks'
import { accents, backgrounds, profile, projects } from './data'

const DEFAULTS = { theme: 'dark', accent: 'cyan', bg: 'constellation' }
const sectionIcons = { home: Home, about: User, skills: Code, services: Layers, projects: Briefcase, contact: Mail }

export default function App() {
  const [theme, setTheme] = useStored('ms-theme', DEFAULTS.theme, ['dark', 'light'])
  const [accent, setAccent] = useStored('ms-accent', DEFAULTS.accent, accents)
  const [bg, setBg] = useStored('ms-bg', DEFAULTS.bg, backgrounds.map(b => b.id))
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.dataset.accent = accent
  }, [theme, accent])

  // Ctrl/Cmd + K opens the command palette from anywhere.
  useEffect(() => {
    const onKey = e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(o => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const reset = () => { setTheme(DEFAULTS.theme); setAccent(DEFAULTS.accent); setBg(DEFAULTS.bg) }

  const actions = useMemo(() => {
    const go = id => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    const open = url => () => window.open(url, '_blank', 'noopener,noreferrer')
    const copy = text => async () => {
      try { await navigator.clipboard.writeText(text); setToast('Copied to clipboard') }
      catch { setToast('Copy failed') }
    }
    return [
      ...['home', 'about', 'skills', 'services', 'projects', 'contact'].map(id => ({
        id: `go-${id}`, group: 'Go to', label: id[0].toUpperCase() + id.slice(1), icon: sectionIcons[id], run: go(id),
      })),
      ...projects.map(p => ({
        id: `proj-${p.title}`, group: 'Projects', label: p.title, hint: p.category, keywords: p.tags.join(' '),
        icon: Briefcase, run: open(p.link),
      })),
      { id: 'theme', group: 'Appearance', label: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
        icon: theme === 'dark' ? Sun : Moon, run: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')) },
      ...accents.map(a => ({
        id: `accent-${a}`, group: 'Appearance', label: `Accent: ${a}`, icon: Palette, run: () => setAccent(a),
      })),
      ...backgrounds.map(b => ({
        id: `bg-${b.id}`, group: 'Background', label: b.label, icon: b.id === 'minimal' ? Sparkles : Network, run: () => setBg(b.id),
      })),
      { id: 'reset', group: 'Background', label: 'Reset appearance', icon: Sparkles, run: reset },
      { id: 'mail', group: 'Contact', label: 'Send an email', hint: profile.email, icon: Mail, run: () => { window.location.href = `mailto:${profile.email}` } },
      { id: 'copy-mail', group: 'Contact', label: 'Copy email address', icon: Copy, run: copy(profile.email) },
      { id: 'gh', group: 'Contact', label: 'Open GitHub', icon: FaGithub, run: open(profile.github) },
      { id: 'in', group: 'Contact', label: 'Open LinkedIn', icon: FaLinkedinIn, run: open(profile.linkedin) },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  return (
    <div className="relative min-h-screen font-sans">
      <ScrollProgress />
      <Background mode={bg} theme={theme} accent={accent} />
      <CursorGlow />
      <Navbar
        theme={theme} setTheme={setTheme}
        accent={accent} setAccent={setAccent}
        bg={bg} setBg={setBg}
        onReset={reset} onOpenPalette={() => setPaletteOpen(true)}
      />
      <main>
        <Hero onOpenPalette={() => setPaletteOpen(true)} />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Contact />
      </main>
      <footer className="relative border-t border-line py-10 text-center text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} {profile.name}. Designed &amp; built with React, Vite and Tailwind CSS.</p>
      </footer>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} actions={actions} />

      {toast && (
        <div role="status" className="glass fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full px-5 py-2.5 text-sm font-medium shadow-xl">
          {toast}
        </div>
      )}
    </div>
  )
}
