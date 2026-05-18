'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand">
      <div className="w-full max-w-sm">
        <div className="rounded-xl border border-forest/10 bg-ivory p-8 shadow-lg">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-forest">
              <span className="font-fraunces text-xl font-semibold text-ivory">FA</span>
            </div>
            <h1 className="font-fraunces text-2xl font-semibold text-charcoal">
              Admin Login
            </h1>
            <p className="mt-1 text-sm text-muted">
              Sign in to manage Find A Venue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@findavenue.co.za"
                required
                className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal placeholder:text-muted/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-charcoal">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal placeholder:text-muted/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-forest/90 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted">
            Secure admin access only
          </p>
        </div>
      </div>
    </div>
  )
}