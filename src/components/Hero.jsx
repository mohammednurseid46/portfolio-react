import { motion } from 'framer-motion'
import { ArrowRight, Command } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { SiReact, SiNodedotjs, SiPython } from 'react-icons/si'
import { useTypewriter } from '../hooks'
import { profile, roles } from '../data'
import { fadeUp } from './Section'

const BASE = import.meta.env.BASE_URL

export default function Hero({ onOpenPalette }) {
  const role = useTypewriter(roles)

  return (
    <section id="home" className="relative flex min-h-screen items-center px-4 pb-16 pt-28 sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 md:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial="hidden" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col items-center text-center md:items-start md:text-left"
        >
          <motion.div variants={fadeUp} className="glass mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-bold tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            OPEN TO FREELANCING &amp; NEW OPPORTUNITIES
          </motion.div>

          <motion.p variants={fadeUp} className="mb-2 text-lg text-muted">Hi, I&apos;m</motion.p>
          <motion.h1 variants={fadeUp} className="text-5xl font-extrabold sm:text-6xl lg:text-7xl">
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 min-h-[2.2em] font-mono text-lg text-fg sm:min-h-[1.6em] sm:text-xl">
            <span className="caret">{role}</span>
          </motion.p>

          <motion.p variants={fadeUp} className="mt-4 max-w-lg text-lg text-muted">
            <strong className="font-semibold text-fg">{profile.tagline}</strong> {profile.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="btn btn-primary">View my work <ArrowRight size={18} /></a>
            <a href="#contact" className="btn btn-ghost">Get in touch</a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted transition-colors hover:text-accent"><FaGithub size={22} /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted transition-colors hover:text-accent"><FaLinkedinIn size={22} /></a>
            <span className="h-5 w-px bg-line" />
            <button onClick={onOpenPalette} className="hidden items-center gap-2 text-sm text-muted transition-colors hover:text-accent sm:flex">
              <Command size={15} /> Try <span className="kbd">Ctrl K</span> to explore
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm md:ml-auto"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] opacity-40 blur-2xl" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }} />
          <div className="glass relative aspect-[4/5] overflow-hidden rounded-[2rem] p-2">
            <img
              src={`${BASE}mohammednur.jpg`}
              alt={profile.name}
              className="h-full w-full rounded-[1.5rem] object-cover"
            />
          </div>
          {[
            { Icon: SiReact, label: 'React', pos: '-left-4 top-10', delay: 0 },
            { Icon: SiNodedotjs, label: 'Node.js', pos: '-right-4 top-1/2', delay: 1 },
            { Icon: SiPython, label: 'Python', pos: 'bottom-8 -left-2', delay: 2 },
          ].map(({ Icon, label, pos, delay }) => (
            <motion.div
              key={label}
              animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}
              className={`glass absolute ${pos} hidden items-center gap-2 rounded-2xl px-3.5 py-2 text-sm font-semibold shadow-xl sm:flex`}
            >
              <Icon className="text-accent" /> {label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
