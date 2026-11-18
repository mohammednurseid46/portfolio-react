import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { apiFetch } from '../adminApi'
import Field from '../components/Field'

export default function Profile() {
  const { showToast } = useOutletContext()
  const [form, setForm] = useState({
    username: '', name: '', email: '', phone: '', tagline: '', intro: '',
    linkedin: '', github: '', roles: '', currentPassword: '', newPassword: '', confirmPassword: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    apiFetch('/profile/admin')
      .then(profile => setForm(current => ({
        ...current,
        username: profile.username || '',
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        tagline: profile.tagline || '',
        intro: profile.intro || '',
        linkedin: profile.linkedin || '',
        github: profile.github || '',
        roles: (profile.roles || []).join(', '),
      })))
      .catch(error => showToast(error.message, 'error'))
      .finally(() => setLoading(false))
  }, [])

  const change = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }))

  const submit = async event => {
    event.preventDefault()
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      showToast('New password and confirmation do not match.', 'error')
      return
    }
    setSaving(true)
    try {
      const payload = {
        username: form.username.trim(),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        tagline: form.tagline.trim(),
        intro: form.intro.trim(),
        linkedin: form.linkedin.trim(),
        github: form.github.trim(),
        roles: form.roles.split(',').map(role => role.trim()).filter(Boolean),
      }
      if (form.newPassword) {
        payload.currentPassword = form.currentPassword
        payload.newPassword = form.newPassword
      }
      await apiFetch('/profile', { method: 'PATCH', body: JSON.stringify(payload) })
      setForm(current => ({ ...current, currentPassword: '', newPassword: '', confirmPassword: '' }))
      showToast('Profile and account settings saved')
    } catch (error) {
      showToast(error.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-muted">Loading profile…</p>

  return (
    <div className="grid gap-6">
      <div><p className="section-eyebrow">Content</p><h1 className="mt-2 font-display text-3xl font-bold">Profile</h1><p className="mt-2 text-sm text-muted">Manage account credentials and public portfolio information.</p></div>
      <form className="glass grid gap-8 rounded-2xl p-5 md:p-7" onSubmit={submit}>
        <section className="grid gap-4">
          <h2 className="font-display text-xl font-bold">Account</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Username" name="username" value={form.username} onChange={change} required />
            <Field label="Email" name="email" value={form.email} onChange={change} type="email" required />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Current password" name="currentPassword" value={form.currentPassword} onChange={change} type={showPassword ? 'text' : 'password'} autoComplete="current-password" />
            <Field label="New password" name="newPassword" value={form.newPassword} onChange={change} type={showPassword ? 'text' : 'password'} minLength={8} autoComplete="new-password" />
            <Field label="Confirm new password" name="confirmPassword" value={form.confirmPassword} onChange={change} type={showPassword ? 'text' : 'password'} minLength={8} autoComplete="new-password" />
          </div>
          <button type="button" className="flex w-fit items-center gap-2 text-sm text-muted hover:text-fg" onClick={() => setShowPassword(value => !value)}>
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />} {showPassword ? 'Hide passwords' : 'Show passwords'}
          </button>
        </section>
        <section className="grid gap-4">
          <h2 className="font-display text-xl font-bold">Public profile</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" name="name" value={form.name} onChange={change} required />
            <Field label="Phone" name="phone" value={form.phone} onChange={change} />
            <Field label="Tagline" name="tagline" value={form.tagline} onChange={change} />
            <Field label="LinkedIn URL" name="linkedin" value={form.linkedin} onChange={change} type="url" />
            <Field label="GitHub URL" name="github" value={form.github} onChange={change} type="url" />
            <Field label="Roles (comma separated)" name="roles" value={form.roles} onChange={change} />
          </div>
          <label className="grid gap-2 text-sm font-medium"><span>Introduction</span><textarea name="intro" value={form.intro} onChange={change} rows="4" className="w-full rounded-xl border border-line bg-bg/60 px-3 py-2.5 focus:border-accent focus:outline-none" /></label>
        </section>
        <div className="flex justify-end"><button className="btn btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save profile'}</button></div>
      </form>
    </div>
  )
}
