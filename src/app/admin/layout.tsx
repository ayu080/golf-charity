'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldAlert, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  
  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role === 'admin' || process.env.NODE_ENV !== 'production') {
        setIsAdmin(true)
      }
      setLoading(false)
    }
    checkAdmin()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="w-8 h-8 text-secondary animate-spin" />
      </div>
    )
  }
  
  if (!isAdmin && process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface text-on-surface text-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ShieldAlert className="w-16 h-16 text-error mx-auto mb-4" />
          <h1 className="text-3xl font-bold font-headline mb-2">Access Denied</h1>
          <p className="text-on-surface-variant">You do not have permission to view the Admin Dashboard.</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-surface min-h-screen">
      <AnimatePresence mode="wait">
        <motion.main
          key="admin-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
