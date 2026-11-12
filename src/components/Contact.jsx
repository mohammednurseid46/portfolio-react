import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Mail, Phone, Send } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import Section, { fadeUp } from './Section'
import { profile } from '../data'

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: 'Phone', value: profile.phoneLabel, href: `tel:${profile.phone}`, Icon: Phone },
  { label: 'LinkedIn', value: 'Mohammednur Seid', href: profile.linkedin, Icon: FaLinkedinIn, external: true },
  { label: 'GitHub', value: 'mohammednurseid46', href: profile.github, Icon: FaGithub, external: true },
]

const field = 'w-full rounded-xl border border-line bg-card p-4 text-base text-fg outline-none transition-colors placeholder:text-muted focus:border-accent'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [copied, setCopied] = useState('')
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const copy = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(label)
      window.setTimeout(() => setCopied(''), 1800)
    } catch {
      setCopied('')
    }
  }

  // No backend needed: the form opens the visitor's email app, pre-filled.
  const submit = e => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <Section id="contact" hideHeader>
      <div className="glass grid gap-10 rounded-[2rem] p-8 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="section-eyebrow mb-4">Contact</p>
          <h2 className="max-w-lg text-4xl font-extrabold md:text-5xl">Let&apos;s build something great together</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Have a project, an idea or an opportunity? Send a message and I&apos;ll get back to you.
          </p>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {links.map(({ label, value, href, external }) => (
              <div key={label} className="flex items-center justify-between gap-4 py-4">
                <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} className="min-w-0 no-underline">
                  <span className="block text-xs text-muted">{label}</span>
                  <span className="block truncate font-medium">{value}</span>
                </a>
                {(label === 'Email' || label === 'Phone') && (
                  <button type="button" onClick={() => copy(label, value)} className="flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent">
                    <Copy size={12} /> {copied === label ? 'Copied' : 'Copy'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          onSubmit={submit} className="flex flex-col gap-4"
        >
          <label className="text-sm font-medium text-muted">Name<input className={`${field} mt-2`} type="text" placeholder="Your name" required value={form.name} onChange={set('name')} /></label>
          <label className="text-sm font-medium text-muted">Email<input className={`${field} mt-2`} type="email" placeholder="you@example.com" required value={form.email} onChange={set('email')} /></label>
          <label className="text-sm font-medium text-muted">Message<textarea className={`${field} mt-2 resize-y`} rows={4} placeholder="Tell me about your project…" required value={form.message} onChange={set('message')} /></label>
          <button type="submit" className="btn btn-primary mt-1 w-full py-3.5 text-base">Send message</button>
          <p className="text-sm text-muted">Opens your email app with the message ready to send.</p>
        </motion.form>
      </div>
    </Section>
  )
}
