export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between text-muted"><span className="text-sm">{label}</span>{Icon && <Icon size={19} className="text-accent" />}</div>
      <p className="font-display text-3xl font-bold">{value}</p>
    </div>
  )
}
