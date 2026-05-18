import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: {
    value: string
    isPositive: boolean
  }
}

export function StatsCard({ title, value, icon: Icon, description, trend }: StatsCardProps) {
  return (
    <div className="rounded-lg border border-forest/10 bg-ivory p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-wider text-muted">
            {title}
          </span>
          <p className="font-fraunces text-2xl font-semibold text-charcoal">{value}</p>
          {description && (
            <p className="text-xs text-muted">{description}</p>
          )}
          {trend && (
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </span>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest/5">
          <Icon className="h-5 w-5 text-forest" />
        </div>
      </div>
    </div>
  )
}