import { motion } from 'framer-motion'
import { Globe, PenTool, LayoutDashboard, Server, Wrench, LifeBuoy } from 'lucide-react'
import Section, { fadeUp } from './Section'
import { services } from '../data'

const icons = { globe: Globe, pen: PenTool, layout: LayoutDashboard, server: Server, wrench: Wrench, life: LifeBuoy }

export default function Services() {
  return (
    <Section id="services" eyebrow="Services" title="What I bring to the table." intro="Available for freelance work, from a single landing page to a complete full-stack product.">
      <motion.ol
        initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
        variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        className="m-0 grid list-none gap-x-10 p-0 md:grid-cols-2"
      >
        {services.map((s, i) => {
          const Icon = icons[s.icon]
          return (
            <motion.li key={s.title} variants={fadeUp} className="group flex gap-5 border-t border-line py-7 transition-colors hover:border-accent">
              <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1">
                <h3 className="mb-2 flex items-center gap-3 text-xl font-bold">
                  {s.title}
                  <Icon size={18} className="text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                </h3>
                <p className="leading-relaxed text-muted">{s.desc}</p>
              </div>
            </motion.li>
          )
        })}
      </motion.ol>
    </Section>
  )
}
