interface Column {
  key: string
  label: string
  render?: (item: Record<string, unknown>) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: Record<string, unknown>[]
  onRowClick?: (item: Record<string, unknown>) => void
  isLoading?: boolean
  emptyMessage?: string
}

export function DataTable({
  columns,
  data,
  onRowClick,
  isLoading,
  emptyMessage = 'No items found.',
}: DataTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-forest/10 bg-ivory">
        <div className="animate-pulse p-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="mb-4 h-12 rounded bg-sand" />
          ))}
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-forest/10 bg-ivory p-12 text-center">
        <p className="text-muted">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-forest/10 bg-ivory">
      <table className="w-full">
        <thead>
          <tr className="border-b border-forest/10 bg-sand/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-forest/5">
          {data.map((item, i) => (
            <tr
              key={(item.id as string) || i}
              onClick={() => onRowClick?.(item)}
              className={`transition-colors ${
                onRowClick ? 'cursor-pointer hover:bg-sand/50' : ''
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="whitespace-nowrap px-4 py-3 text-sm text-charcoal">
                  {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}