'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Building2,
  FileText,
  MessageSquare,
  ImageIcon,
  LogOut,
  ChevronLeft,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Venues',
    href: '/admin/venues',
    icon: Building2,
  },
  {
    label: 'Journal',
    href: '/admin/journal',
    icon: FileText,
  },
  {
    label: 'Enquiries',
    href: '/admin/enquiries',
    icon: MessageSquare,
  },
  {
    label: 'Media Library',
    href: '/admin/media',
    icon: ImageIcon,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-forest/10 bg-ivory">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-forest/10 px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest">
            <span className="font-fraunces text-sm font-semibold text-ivory">FA</span>
          </div>
          <div>
            <span className="font-fraunces text-lg font-semibold text-charcoal">
              Find A Venue
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-eyebrow text-gold">
              Admin
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-forest text-ivory'
                      : 'text-muted hover:bg-forest/5 hover:text-charcoal'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Back to site + Sign out */}
      <div className="border-t border-forest/10 p-3">
        <Link
          href="/"
          className="mb-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-forest/5 hover:text-charcoal transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to site
        </Link>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}