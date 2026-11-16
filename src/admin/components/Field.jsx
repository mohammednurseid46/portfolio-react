export default function Field({ label, name, value, onChange, type = 'text', required = false, error, children, ...props }) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      <span>{label}{required && <span className="ml-1 text-accent" aria-hidden="true">*</span>}</span>
      {children || <input className="w-full rounded-xl border border-line bg-bg/60 px-3 py-2.5 text-fg placeholder:text-muted focus:border-accent focus:outline-none" id={name} name={name} value={value ?? ''} onChange={onChange} type={type} required={required} {...props} />}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  )
}
