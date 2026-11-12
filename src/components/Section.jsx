import { motion } from 'framer-motion'

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Section({ id, eyebrow, title, intro, hideHeader = false, children }) {
  return (
    <section id={id} className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {!hideHeader && (
          <motion.header
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
            className="mb-14 max-w-2xl"
          >
            <p className="section-eyebrow mb-3">{eyebrow}</p>
            <h2 className="text-4xl font-extrabold md:text-5xl">{title}</h2>
            {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  )
}
