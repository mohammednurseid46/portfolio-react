import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Section, { fadeUp } from './Section'
import TiltCard from './TiltCard'
import { aboutSkills, stats } from '../data'

function CountUp({ to, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return undefined
    let raf = 0
    const start = performance.now()
    const tick = now => {
      const p = Math.min((now - start) / 1200, 1)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return <span ref={ref}>{n}{suffix}</span>
}

export default function About() {
  return (
    <Section id="about" eyebrow="About me" title="A passion for building digital products.">
      <div className="grid items-stretch gap-6 lg:grid-cols-[1.4fr_1fr]">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass rounded-3xl p-8 sm:p-10">
          <p className="mb-5 text-lg leading-relaxed text-muted">
            I am a dedicated <strong className="font-semibold text-fg">4th year Information Technology student at Bahir Dar University</strong> with a strong focus on software development. My journey in tech is driven by a desire to create impactful and high-performance digital solutions.
          </p>
          <p className="mb-8 text-lg leading-relaxed text-muted">
            With experience in full-stack development, I enjoy bridging the gap between functional requirements and elegant user experiences. I&apos;m constantly learning new technologies to stay at the forefront of the industry.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {aboutSkills.map(s => (
              <span key={s} className="rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-1 hover:border-accent hover:text-accent">
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
          {stats.map(s => (
            <TiltCard key={s.label} className="glass flex flex-col items-center justify-center rounded-3xl p-8 text-center">
              <div className="text-gradient font-display text-5xl font-extrabold">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 font-medium text-muted">{s.label}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </Section>
  )
}
