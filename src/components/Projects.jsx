import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Smartphone, Monitor, Globe } from 'lucide-react'
import Section from './Section'
import TiltCard from './TiltCard'
import { projects } from '../data'

const BASE = import.meta.env.BASE_URL
const filters = ['All', 'Web', 'Mobile', 'Desktop']
const catIcon = { Web: Globe, Mobile: Smartphone, Desktop: Monitor }

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const list = projects.filter(p => filter === 'All' || p.category === filter)

  return (
    <Section id="projects" eyebrow="Selected work" title="Projects I've built.">
      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {filters.map(f => (
          <button
            key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${filter === f ? 'border-transparent text-[#04070b]' : 'border-line text-muted hover:border-accent hover:text-accent'}`}
            style={filter === f ? { background: 'linear-gradient(120deg, var(--accent), var(--accent2))' } : undefined}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map(p => {
            const Icon = catIcon[p.category]
            return (
              <motion.div
                key={p.title} layout
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className={p.featured && filter === 'All' ? 'md:col-span-2' : ''}
              >
                <TiltCard
                  as="a" href={p.link} target="_blank" rel="noopener noreferrer" max={4}
                  className={`glass group block h-full rounded-3xl no-underline ${p.featured && filter === 'All' ? 'md:grid md:grid-cols-2' : ''}`}
                >
                  <div className={`relative overflow-hidden ${p.featured && filter === 'All' ? 'h-56 md:h-full md:min-h-[280px]' : 'h-52'}`}>
                    {p.image ? (
                      <img
                        src={`${BASE}${p.image}`} alt={`${p.title} preview`} loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center" style={{ background: 'linear-gradient(135deg, rgba(var(--accent-rgb),.25), rgba(139,92,246,.25))' }}>
                        <Icon size={56} className="text-accent transition-transform duration-500 group-hover:scale-110" strokeWidth={1.3} />
                      </div>
                    )}
                    <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold">{p.category}</span>
                  </div>

                  <div className="p-7">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-bold">{p.title}</h3>
                      <ArrowUpRight className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                    </div>
                    <p className="mb-5 leading-relaxed text-muted">{p.desc}</p>
                    {p.features && (
                      <ul className="mb-5 list-disc space-y-1 pl-5 text-sm text-muted">
                        {p.features.map(f => <li key={f}>{f}</li>)}
                      </ul>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map(t => (
                        <span key={t} className="rounded-full border border-line bg-card px-3 py-1 font-mono text-xs text-muted">{t}</span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
