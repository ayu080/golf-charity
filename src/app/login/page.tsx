'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f9f9f9] px-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-[0_40px_60px_rgba(26,28,28,0.05)] border border-[#e2e2e2]"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-['Manrope'] text-[#181f21]">Welcome Back</h1>
          <p className="text-[#586062] mt-2">Sign in to manage your impact and scores.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#ffdad6] text-[#ba1a1a] rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#434749] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#f3f3f3] border-b-2 border-transparent focus:border-[#46645c] focus:bg-white focus:outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#434749] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#f3f3f3] border-b-2 border-transparent focus:border-[#46645c] focus:bg-white focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-br from-[#181f21] to-[#2d3436] text-white rounded-xl font-medium flex justify-center items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#586062]">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#46645c] font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
