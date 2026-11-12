import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Network, Palette, Router, Server, Smartphone } from 'lucide-react'
import {
  SiCisco, SiDotnet, SiFastapi, SiFlask, SiFlutter, SiJavascript, SiNextdotjs,
  SiNodedotjs, SiPostgresql, SiPython, SiReact, SiSqlite, SiTailwindcss, SiTypescript,
} from 'react-icons/si'
import Section, { fadeUp } from './Section'
import { skills } from '../data'

const icons = {
  javascript: SiJavascript, typescript: SiTypescript, react: SiReact, next: SiNextdotjs,
  tailwind: SiTailwindcss, design: Palette, node: SiNodedotjs, python: SiPython,
  fastapi: SiFastapi, flask: SiFlask, csharp: SiDotnet, sql: Database, postgres: SiPostgresql,
  postgis: Database, sqlite: SiSqlite, sqlserver: Server, java: Smartphone, flutter: SiFlutter,
  networking: Network, tcpip: Router, lan: Network, cisco: SiCisco,
}

const categories = ['All', 'Frontend', 'Backend', 'Databases', 'Mobile & Desktop', 'Networking']
const categoryByIcon = {
  javascript: 'Frontend',
  typescript: 'Frontend',
  react: 'Frontend',
  next: 'Frontend',
  tailwind: 'Frontend',
  design: 'Frontend',
  node: 'Backend',
  python: 'Backend',
  fastapi: 'Backend',
  flask: 'Backend',
  csharp: 'Backend',
  sql: 'Databases',
  postgres: 'Databases',
  postgis: 'Databases',
  sqlite: 'Databases',
  sqlserver: 'Databases',
  java: 'Mobile & Desktop',
  flutter: 'Mobile & Desktop',
  networking: 'Networking',
  tcpip: 'Networking',
  lan: 'Networking',
  cisco: 'Networking',
}
const iconColors = {
  javascript: '#f7df1e',
  typescript: '#3178c6',
  react: '#22b8d2',
  next: '#111827',
  tailwind: '#14b8a6',
  design: '#ec4899',
  node: '#43a047',
  python: '#3776ab',
  fastapi: '#10a88f',
  flask: '#4b5563',
  csharp: '#7c3aed',
  sql: '#f97316',
  postgres: '#336791',
  postgis: '#129b8f',
  sqlite: '#168bd0',
  sqlserver: '#dc2626',
  java: '#e91e4d',
  flutter: '#2196f3',
  networking: '#315de6',
  tcpip: '#169bb6',
  lan: '#129b8f',
  cisco: '#315de6',
}

export default function Skills() {
  const [category, setCategory] = useState('All')
  const filteredSkills = useMemo(
    () => skills.filter(skill => category === 'All' || categoryByIcon[skill.icon] === category),
    [category],
  )

  return (
    <Section id="skills" eyebrow="Skills" title="Technologies I work with.">
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(item => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
              category === item
                ? 'border-accent bg-accent text-[#04070b] shadow-lg shadow-accent/20'
                : 'border-line bg-card text-muted hover:-translate-y-0.5 hover:border-accent hover:text-accent'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <motion.div
        key={category}
        initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      >
        {filteredSkills.map(s => {
          const Icon = icons[s.icon]
          return (
            <motion.div key={s.title} variants={fadeUp}>
              <div className="skill-tile glass group flex min-h-20 items-center gap-3 rounded-2xl px-3.5 py-3 transition-all">
                <span
                  className="skill-icon grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[10px] font-extrabold text-white transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: iconColors[s.icon] }}
                >
                  <Icon size={18} />
                </span>
                <h3 className="text-sm font-semibold leading-snug">{s.title}</h3>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
