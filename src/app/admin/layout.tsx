'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldAlert, Loader2, Lock, Mail, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loginLoading, setLoginLoading] = useState(false)
  
  const router = useRouter()
  const supabase = createClient()
  
  async function checkAdmin() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setIsAuth(false)
      setIsAdmin(false)
      setLoading(false)
      return
    }

    setIsAuth(true)

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role === 'admin' || process.env.NODE_ENV !== 'production') {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    checkAdmin()
  }, [router, supabase])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setLoginError(error.message)
      setLoginLoading(false)
      return
    }

    await checkAdmin()
    setLoginLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="w-8 h-8 text-secondary animate-spin" />
      </div>
    )
  }
  
  if (!isAuth || (!isAdmin && process.env.NODE_ENV === 'production')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-6 md:px-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="bg-white rounded-[2.5rem] ambient-shadow border border-outline-variant/20 p-10 relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-colors"></div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center border-4 border-surface shadow-lg">
                  <Lock className="w-6 h-6 text-on-surface-variant" />
                </div>
              </div>

              <div className="text-center mb-10">
                <h1 className="text-3xl font-black font-headline tracking-tight text-on-surface mb-3">Admin Gateway</h1>
                <p className="text-on-surface-variant/60 font-medium text-sm">
                  {!isAuth ? 'Identify yourself to access the orchestrator.' : 'Unauthorized access detected. Elevate your status.'}
                </p>
              </div>

              {loginError && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="mb-8 p-4 bg-error-container text-error rounded-2xl text-xs font-bold uppercase tracking-widest text-center"
                >
                  {loginError}
                </motion.div>
              )}

              {!isAuth ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/30 group-focus-within:text-secondary transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-surface-container-low border-2 border-transparent focus:border-secondary/20 focus:bg-white focus:outline-none transition-all placeholder:text-on-surface-variant/30 font-bold text-sm text-on-surface"
                        placeholder="Authority Email"
                      />
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/30 group-focus-within:text-secondary transition-colors" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-surface-container-low border-2 border-transparent focus:border-secondary/20 focus:bg-white focus:outline-none transition-all placeholder:text-on-surface-variant/30 font-bold text-sm text-on-surface"
                        placeholder="Access Token"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-5 bg-[#181f21] text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex justify-center items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-surface-container-highest disabled:opacity-50 group/btn"
                  >
                    {loginLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Grant Access
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-8">
                  <div className="p-6 bg-error/5 border border-error/10 rounded-2xl">
                    <p className="text-xs font-bold text-error uppercase tracking-widest leading-relaxed text-center">
                      Security Alert: User {email} does not possess administrative clearance.
                    </p>
                  </div>
                  <Link href="/login">
                    <button className="w-full py-5 border-2 border-outline-variant/30 hover:bg-surface-container-high rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                      Switch Clearance Level
                    </button>
                  </Link>
                </div>
              )}

              <p className="mt-12 text-center">
                <Link href="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 hover:text-secondary transition-colors underline decoration-secondary/30">
                  Return to Network Base
                </Link>
              </p>
            </div>
          </div>
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
