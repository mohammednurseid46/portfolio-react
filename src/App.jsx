import { useEffect, useRef, useState, useCallback } from 'react'
import {
  profile, typedWords, skills, skillFilters, projects, projectFilters,
} from './data.js'

/* ---------------- hooks ---------------- */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved) return saved
    } catch { /* ignore */ }
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('theme', theme) } catch { /* ignore */ }
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

function useTyped(words) {
  const [text, setText] = useState('')
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0])
      return
    }
    let wi = 0, ci = 0, del = false, timer
    const tick = () => {
      const w = words[wi]
      ci += del ? -1 : 1
      setText(w.slice(0, ci))
      let d = del ? 35 : 75
      if (!del && ci === w.length) { del = true; d = 1500 }
      else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; d = 350 }
      timer = setTimeout(tick, d)
    }
    tick()
    return () => clearTimeout(timer)
  }, [words])
  return text
}

function useReveal() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, shown]
}

function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const [ref, shown] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

function CountUp({ to, suffix = '' }) {
  const [ref, shown] = useReveal()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!shown) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setN(to)
      return
    }
    const t0 = performance.now()
    let raf
    const step = (t) => {
      const p = Math.min((t - t0) / 1400, 1)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [shown, to])
  return <b ref={ref}>{n}{suffix}</b>
}

function useScrollProgress() {
  const [pct, setPct] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0)
      setScrolled(window.scrollY > 20)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return [pct, scrolled]
}

function useActiveSection(ids) {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
    }, { rootMargin: '-45% 0px -50% 0px' })
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

/* ---------------- icons ---------------- */

const Icon = ({ children, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)
const GithubIcon = () => (
  <Icon><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></Icon>
)
const LinkedinIcon = () => (
  <Icon><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></Icon>
)
const MailIcon = () => (
  <Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>
)
const PhoneIcon = () => (
  <Icon><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></Icon>
)
const SettingsIcon = () => (
  <Icon><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" /><path d="M19.4 15a2 2 0 0 0 .4 2.2l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a2 2 0 0 0-2.2-.4 2 2 0 0 0-1.2 1.8v.1a2 2 0 1 1-4 0v-.1a2 2 0 0 0-1.2-1.8 2 2 0 0 0-2.2.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A2 2 0 0 0 3.8 15 2 2 0 0 0 2 13.8h-.1a2 2 0 1 1 0-4H2A2 2 0 0 0 3.8 8.6a2 2 0 0 0-.4-2.2l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a2 2 0 0 0 2.2.4A2 2 0 0 0 9.6 2.2v-.1a2 2 0 1 1 4 0v.1a2 2 0 0 0 1.2 1.8 2 2 0 0 0 2.2-.4l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a2 2 0 0 0-.4 2.2A2 2 0 0 0 21.2 10h.1a2 2 0 1 1 0 4h-.1a2 2 0 0 0-1.8 1z" /></Icon>
)

/* ---------------- sections ---------------- */

const NAV = [['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['contact', 'Contact']]

function Navbar({ theme, toggleTheme, active, scrolled }) {
  const [open, setOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const settingsRef = useRef(null)

  useEffect(() => {
    const closeSettings = (event) => {
      if (!settingsRef.current?.contains(event.target)) setSettingsOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSettingsOpen(false)
    }
    document.addEventListener('pointerdown', closeSettings)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeSettings)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="logo" aria-label="Mohammednur Seid home">
        <img src={`${import.meta.env.BASE_URL}image.png`} alt="Mohammednur logo" />
        <span className="logo-tooltip" role="tooltip">Mohammednur Seid</span>
      </a>
      <nav className={`links ${open ? 'open' : ''}`}>
        {NAV.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <div className="settings" ref={settingsRef}>
          <button
            className="icon-btn"
            onClick={() => setSettingsOpen((value) => !value)}
            aria-label="Open settings"
            aria-expanded={settingsOpen}
            aria-controls="settings-menu"
          >
            <SettingsIcon />
          </button>
          <div className={`settings-menu ${settingsOpen ? 'open' : ''}`} id="settings-menu">
            <span className="settings-label">Appearance</span>
            <button className="appearance-toggle" onClick={toggleTheme}>
              <span>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
              <span className="theme-icon">
                {theme === 'dark' ? (
                  <Icon size={17}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Icon>
                ) : (
                  <Icon size={17}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></Icon>
                )}
              </span>
            </button>
          </div>
        </div>
        <button className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <Icon><path d="M4 7h16M4 12h16M4 17h16" /></Icon>
        </button>
      </div>
    </header>
  )
}

function PhotoFrame() {
  const [failed, setFailed] = useState(false)
  const photoSrc = `${import.meta.env.BASE_URL}${profile.photoFilename}`

  return (
    <div className="photo-profile">
      <div className={`photo-frame ${failed ? 'photo-fallback' : ''}`}>
        {!failed ? (
          <img
            src={photoSrc}
            alt={`${profile.name} profile`}
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="photo-placeholder" role="img" aria-label="Profile photo placeholder">
            <strong>MS</strong>
            <span>Add public/{profile.photoFilename}</span>
          </div>
        )}
      </div>
      <div className="photo-details">
        <h2>{profile.name}</h2>
        <p>{profile.role}</p>
      </div>
    </div>
  )
}

function Hero() {
  const typed = useTyped(typedWords)
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <Reveal as="span" className="badge"><i className="dot" /> {profile.studyLevel} at {profile.school} · Open to work</Reveal>
          <Reveal as="h1">
            Hello, I'm <span className="grad">{profile.name}</span>.<br />
            I build <span className="typed">{typed}</span><span className="caret">|</span>
          </Reveal>
          <Reveal as="p" className="lead">
            I'm a {profile.studyLevel} at {profile.school}, crafting fast, polished products across web,
            mobile and desktop, from React and Next.js frontends to Node, FastAPI and PostGIS backends.
          </Reveal>
          <Reveal className="cta">
            <a href="#projects" className="btn primary">View my work</a>
            <a href="#contact" className="btn ghost">Get in touch</a>
          </Reveal>
          <Reveal className="socials">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><MailIcon /></a>
            <a href={`tel:${profile.phoneLink}`} aria-label="Phone"><PhoneIcon /></a>
          </Reveal>
        </div>
        <Reveal className="hero-card">
          <PhotoFrame />
          <div className="float f1">⚛️ React</div>
          <div className="float f2">🌐 Networking</div>
          <div className="float f3">🎓 {profile.school}</div>
        </Reveal>
      </div>
      <a href="#about" className="scroll-hint" aria-label="Scroll down"><span /></a>
    </section>
  )
}

function Stats() {
  const items = [
    [5, '', 'Projects shown'],
    [skills.length, '', 'Technologies'],
    [3, '', 'Platforms: web, mobile, desktop'],
    [100, '%', 'Commitment'],
  ]
  return (
    <section className="stats container">
      {items.map(([n, s, label], i) => (
        <Reveal key={label} className="stat" delay={i * 70}>
          <CountUp to={n} suffix={s} />
          <span>{label}</span>
        </Reveal>
      ))}
    </section>
  )
}

function About() {
  const cards = [
    ['Frontend', 'React, Next.js, Tailwind, TypeScript, UI/UX'],
    ['Backend', 'Node.js, FastAPI, Flask, C# / .NET,Express.js, REST APIs'],
    ['Data', 'PostgreSQL, PostGIS, SQL Server, SQLite'],
    ['Mobile & Desktop', 'Flutter, Dart, Java, JavaFX'],
    ['Networking', 'Networking Fundamentals, TCP/IP, LAN/WAN, VLANs, Cisco Packet Tracer'],
  ]
  return (
    <section id="about" className="section container">
      <Reveal className="head"><span className="eyebrow">About</span><h2>Building across the whole stack</h2></Reveal>
      <div className="about-grid">
        <Reveal as="p">
          I'm a {profile.studyLevel} at {profile.school} who enjoys turning ideas into complete products.
          I build responsive web apps with React and Next.js, APIs with Node.js, Flask and FastAPI, mobile
          apps with Flutter, and desktop interfaces with Java and JavaFX.
        </Reveal>
        <Reveal as="p">
          My work includes a transport management system with geospatial data (PostgreSQL + PostGIS), a mobile
          help app, and a desktop UI project. I care about clean structure, good UX and shipping things that
          actually work.
        </Reveal>
        <Reveal className="cards">
          {cards.map(([t, d]) => (
            <div className="mini" key={t}><h4>{t}</h4><p>{d}</p></div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Filters({ options, value, onChange }) {
  return (
    <Reveal className="filters">
      {options.map(([id, label]) => (
        <button key={id} className={`chip ${value === id ? 'active' : ''}`} onClick={() => onChange(id)}>
          {label}
        </button>
      ))}
    </Reveal>
  )
}

function Skills() {
  const [f, setF] = useState('all')
  const list = skills.filter((s) => f === 'all' || s[3] === f)
  return (
    <section id="skills" className="section container">
      <Reveal className="head"><span className="eyebrow">Skills</span><h2>Technologies I work with</h2></Reveal>
      <Filters options={skillFilters} value={f} onChange={setF} />
      <div className="skills">
        {list.map(([name, abbr, color], i) => (
          <div className="skill" key={`${f}-${name}`} style={{ animationDelay: `${i * 30}ms` }}>
            <span className="ic" style={{ background: color }}>{abbr}</span>{name}
          </div>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  const [f, setF] = useState('all')
  const list = projects.filter((p) => f === 'all' || p.type === f)
  return (
    <section id="projects" className="section container">
      <Reveal className="head"><span className="eyebrow">Projects</span><h2>Selected work</h2></Reveal>
      <Filters options={projectFilters} value={f} onChange={setF} />
      <div className="projects">
        {list.map((p, i) => (
          <article className="project" key={`${f}-${p.name}`} style={{ animationDelay: `${i * 70}ms` }}>
            <div className="thumb" style={{ background: p.grad }}>
              {p.image && (
                <img
                  src={`${import.meta.env.BASE_URL}${p.image}`}
                  alt={`${p.name} project preview`}
                />
              )}
              <span className="type-tag">{p.type}</span>
              {!p.image && <span className="big">{p.abbr}</span>}
            </div>
            <div className="pbody">
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="plinks">
                {p.live && <a className="live" href={p.live} target="_blank" rel="noopener noreferrer">Live site ↗</a>}
                {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Contact({ say }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [bad, setBad] = useState({})

  const copy = (v) => {
    if (!navigator.clipboard) return say('Copy failed. Select the text manually.')
    navigator.clipboard.writeText(v).then(() => say(`Copied: ${v}`), () => say('Copy failed. Select the text manually.'))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = {
      name: !form.name.trim(),
      email: !/^\S+@\S+\.\S+$/.test(form.email),
      message: !form.message.trim(),
    }
    setBad(errs)
    if (Object.values(errs).some(Boolean)) return say('Please fill in all fields correctly.')
    const body = `${form.message}\n\n— ${form.name} (${form.email})`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Portfolio message from ' + form.name)}&body=${encodeURIComponent(body)}`
    say('Opening your email app...')
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <section id="contact" className="section container">
      <Reveal className="contact-wrap">
        <div>
          <span className="eyebrow">Contact</span>
          <h2>Let's build something great together</h2>
          <p className="muted">Have a project, an idea or an opportunity? Send a message and I'll get back to you.</p>
          <ul className="contact-list">
            <li><span>Email</span><a href={`mailto:${profile.email}`}>{profile.email}</a><button className="copy" onClick={() => copy(profile.email)}>Copy</button></li>
            <li><span>Phone</span><a href={`tel:${profile.phoneLink}`}>{profile.phone}</a><button className="copy" onClick={() => copy(profile.phone)}>Copy</button></li>
            <li><span>LinkedIn</span><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">Mohammednur Seid</a></li>
            <li><span>GitHub</span><a href={profile.github} target="_blank" rel="noopener noreferrer">mohammednurseid46</a></li>
          </ul>
        </div>
        <form className="form" onSubmit={submit} noValidate>
          <label>Name<input className={bad.name ? 'invalid' : ''} value={form.name} onChange={set('name')} placeholder="Your name" /></label>
          <label>Email<input className={bad.email ? 'invalid' : ''} type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" /></label>
          <label>Message<textarea className={bad.message ? 'invalid' : ''} rows="5" value={form.message} onChange={set('message')} placeholder="Tell me about your project..." /></label>
          <button className="btn primary" type="submit">Send message</button>
          <p className="form-note">Opens your email app with the message ready to send.</p>
        </form>
      </Reveal>
    </section>
  )
}

/* ---------------- app ---------------- */

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'contact']

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [pct, scrolled] = useScrollProgress()
  const active = useActiveSection(SECTION_IDS)
  const glowRef = useRef(null)
  const [toast, setToast] = useState('')
  const timer = useRef()

  const say = useCallback((m) => {
    setToast(m)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(''), 2200)
  }, [])

  useEffect(() => {
    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`
        glowRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <>
      <div className="progress" style={{ width: `${pct}%` }} />
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="cursor-glow" ref={glowRef} />
      <Navbar theme={theme} toggleTheme={toggleTheme} active={active} scrolled={scrolled} />
      <main>
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Contact say={say} />
      </main>
      <footer className="footer">
        <div className="container">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <a href="#home" className="top">Back to top ↑</a>
        </div>
      </footer>
      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
    </>
  )
}
