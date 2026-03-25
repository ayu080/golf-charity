import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ShieldAlert } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  // In a real scenario, protect admin routes. For dev/demo, we might bypass it or assume user role
  const isAdmin = profile?.role === 'admin'
  
  if (!isAdmin && process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] text-[#1a1c1c] text-center p-6">
        <div>
          <ShieldAlert className="w-16 h-16 text-[#ba1a1a] mx-auto mb-4" />
          <h1 className="text-3xl font-bold font-['Manrope'] mb-2">Access Denied</h1>
          <p className="text-[#586062]">You do not have permission to view the Admin Dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      {children}
    </div>
  )
}
