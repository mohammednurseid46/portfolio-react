import { useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import { apiFetch } from '../adminApi'
import ConfirmDialog from '../components/ConfirmDialog'
import DataTable from '../components/DataTable'
import Field from '../components/Field'
import Modal from '../components/Modal'

const emptyProject = { title: '', desc: '', category: 'Web', link: '', image: '', tags: '', features: '', featured: false, position: 1 }
const emptySimple = { title: '', desc: '', icon: '', position: 1 }

function toForm(item, project) {
  if (!item) return project ? { ...emptyProject } : { ...emptySimple }
  return { ...item, tags: item.tags?.join(', ') || '', features: item.features?.join(', ') || '' }
}

function toPayload(form, project) {
  const payload = { ...form, position: Number(form.position) }
  if (project) {
    payload.tags = form.tags.split(',').map(value => value.trim()).filter(Boolean)
    payload.features = form.features.split(',').map(value => value.trim()).filter(Boolean)
    if (!payload.image) delete payload.image
  }
  return payload
}

export default function ResourcePage({ resource, label, project = false }) {
  const { showToast } = useOutletContext()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    apiFetch(`/${resource}`).then(setItems).catch(error => setError(error.message)).finally(() => setLoading(false))
  }
  useEffect(load, [])
  const change = event => {
    const { name, type, value, checked } = event.target
    setForm(current => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }
  const submit = async event => {
    event.preventDefault()
    if (!form.title.trim() || !form.position || Number(form.position) < 0 || (project && !form.link.trim())) {
      showToast(project && !form.link.trim() ? 'Title and link are required.' : 'Title and position are required.', 'error')
      return
    }
    setSaving(true)
    try {
      const payload = toPayload(form, project)
      await apiFetch(form.id ? `/${resource}/${form.id}` : `/${resource}`, { method: form.id ? 'PATCH' : 'POST', body: JSON.stringify(payload) })
      setForm(null)
      load()
      showToast(`${label} ${form.id ? 'updated' : 'created'} successfully`)
    } catch (error) { showToast(error.message, 'error') } finally { setSaving(false) }
  }
  const remove = async () => {
    try {
      await apiFetch(`/${resource}/${deleteId}`, { method: 'DELETE' })
      setDeleteId(null)
      load()
      showToast(`${label} deleted`)
    } catch (error) { showToast(error.message, 'error') }
  }
  const set = (name, value) => setForm(current => ({ ...current, [name]: value }))

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="section-eyebrow">Content</p><h1 className="mt-2 font-display text-3xl font-bold">{label}s</h1></div><button className="btn btn-primary" onClick={() => setForm(toForm(null, project))}><Plus size={18} />Add {label}</button></div>
      {loading ? <p className="text-muted">Loading {label.toLowerCase()}s…</p> : error ? <p role="alert" className="text-red-400">{error}</p> : <DataTable rows={items} empty={`No ${label.toLowerCase()}s yet.`} columns={project ? [
        { key: 'title', label: 'Title', render: item => <span className="font-semibold">{item.title}</span> }, { key: 'category', label: 'Category' }, { key: 'position', label: 'Position' }, { key: 'featured', label: 'Featured', render: item => item.featured ? 'Yes' : 'No' }, { key: 'actions', label: 'Actions', render: item => <Actions onEdit={() => setForm(toForm(item, project))} onDelete={() => setDeleteId(item.id)} /> },
      ] : [
        { key: 'title', label: 'Title', render: item => <span className="font-semibold">{item.title}</span> }, { key: 'desc', label: 'Description', render: item => <span className="block max-w-md truncate text-muted">{item.desc || '—'}</span> }, { key: 'icon', label: 'Icon' }, { key: 'position', label: 'Position' }, { key: 'actions', label: 'Actions', render: item => <Actions onEdit={() => setForm(toForm(item, project))} onDelete={() => setDeleteId(item.id)} /> },
      ]} />}
      <Modal open={Boolean(form)} title={`${form?.id ? 'Edit' : 'Add'} ${label}`} onClose={() => setForm(null)}>
        {form && <form className="grid gap-4" onSubmit={submit}>
          <Field label="Title" name="title" value={form.title} onChange={change} required />
          <Field label="Description" name="desc" value={form.desc} onChange={change} {...(project ? { as: 'textarea' } : {})}><textarea id="desc" name="desc" value={form.desc} onChange={change} rows="3" className="w-full rounded-xl border border-line bg-bg/60 px-3 py-2.5 focus:border-accent focus:outline-none" /></Field>
          {project ? <><Field label="Category" name="category" value={form.category} onChange={change} required><select id="category" name="category" value={form.category} onChange={change} className="rounded-xl border border-line bg-bg/60 px-3 py-2.5 focus:border-accent focus:outline-none"><option>Web</option><option>Mobile</option><option>Desktop</option></select></Field><Field label="Project link" name="link" value={form.link} onChange={change} type="url" required /><Field label="Image path" name="image" value={form.image} onChange={change} /><Field label="Tags (comma separated)" name="tags" value={form.tags} onChange={change} /><Field label="Features (comma separated)" name="features" value={form.features} onChange={change} /><label className="flex items-center gap-3 text-sm"><input type="checkbox" name="featured" checked={form.featured} onChange={change} />Featured project</label></> : <Field label="Icon" name="icon" value={form.icon} onChange={change} required />}
          <Field label="Position" name="position" value={form.position} onChange={change} type="number" min="0" required />
          <div className="mt-2 flex justify-end gap-3"><button type="button" className="btn btn-ghost" onClick={() => setForm(null)}>Cancel</button><button className="btn btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button></div>
        </form>}
      </Modal>
      <ConfirmDialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)} onConfirm={remove} />
    </div>
  )
}

function Actions({ onEdit, onDelete }) {
  return <div className="flex gap-2"><button className="rounded-lg p-2 text-muted hover:bg-accent/15 hover:text-accent" aria-label="Edit" onClick={event => { event.stopPropagation(); onEdit() }}><Pencil size={16} /></button><button className="rounded-lg p-2 text-muted hover:bg-red-500/15 hover:text-red-300" aria-label="Delete" onClick={event => { event.stopPropagation(); onDelete() }}><Trash2 size={16} /></button></div>
}
