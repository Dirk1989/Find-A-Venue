interface Column<T> {
  key: string
  label: string
  render?: (item: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (item: T) => void
  isLoading?: boolean
  emptyMessage?: string
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  onRowClick,
  isLoading,
  emptyMessage = 'No items found.',
}: DataTableProps<T>) {
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
                  {col.render ? col.render(item) : ((item as unknown) as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}