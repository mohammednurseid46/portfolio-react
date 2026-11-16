export default function DataTable({ columns, rows, empty = 'No records found.', onRowClick }) {
  if (!rows.length) return <div className="glass rounded-2xl p-10 text-center text-muted">{empty}</div>
  return (
    <div className="glass overflow-x-auto rounded-2xl">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-line text-xs uppercase tracking-wider text-muted">
          <tr>{columns.map(column => <th className="px-5 py-4 font-medium" key={column.key}>{column.label}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row, index) => (
            <tr key={row.id || index} className={onRowClick ? 'cursor-pointer transition-colors hover:bg-card' : ''} onClick={() => onRowClick?.(row)}>
              {columns.map(column => <td className="px-5 py-4 align-top" key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
