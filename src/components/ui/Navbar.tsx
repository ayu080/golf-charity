'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function Navbar() {
  const pathname = usePathname()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase.auth])

  const handleSignout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  // Do not show navbar on auth pages to maintain immersion
  if (pathname === '/login' || pathname === '/signup') return null;

  return (
    <header id="main-header" className="fixed top-0 left-0 right-0 z-50 bg-[#f9f9f9]/80 backdrop-blur-md border-b border-[#e2e2e2]/50">
      <nav id="main-nav" className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" id="nav-logo">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold font-['Manrope'] tracking-tight text-[#181f21]"
          >
            The Fairway Collective.
          </motion.div>
        </Link>
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link id="nav-link-dashboard" href="/dashboard" className="text-sm font-medium text-[#434749] hover:text-[#181f21] transition-colors">
                Dashboard
              </Link>
              <button 
                id="btn-signout"
                onClick={handleSignout}
                className="text-sm font-medium text-[#cba72f] hover:text-[#735c00] transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link id="nav-link-login" href="/login" className="text-sm font-medium text-[#434749] hover:text-[#181f21] transition-colors">
                Log In
              </Link>
              <Link id="nav-link-signup" href="/signup">
                <button id="btn-signup-nav" className="px-5 py-2.5 bg-[#181f21] text-white text-sm font-medium rounded-full hover:bg-[#2d3436] transition-colors">
                  Join the Mission
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
