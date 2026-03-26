'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'

// Admin Components
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import StatsGrid from '@/components/admin/StatsGrid'
import MemberLedger from '@/components/admin/MemberLedger'
import VerificationQueue from '@/components/admin/VerificationQueue'
import DrawCenter from '@/components/admin/DrawCenter'
import UserRegistry, { UserProfile } from '@/components/admin/UserRegistry'

interface WinningRecord {
  id: string;
  user_id: string;
  amount: number;
  match_type: number;
  status: string;
}

export default function AdminDashboardPage() {
  const [activeUsers, setActiveUsers] = useState<number | null>(null)
  const [members, setMembers] = useState<UserProfile[]>([])
  const [winnings, setWinnings] = useState<WinningRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [drawLoading, setDrawLoading] = useState(false)
  
  const supabase = createClient()

  async function fetchData() {
    setLoading(true)
    
    // Fetch profiles
    const { data: profileData } = await supabase
      .from('profiles')
      .select('id, email, role, subscription_status, created_at')
      .order('created_at', { ascending: false })
      .limit(10)
    
    if (profileData) {
      setMembers(profileData as UserProfile[])
      setActiveUsers(profileData.filter(p => p.subscription_status === 'active').length)
    }

    // Fetch pending winnings (Verification Queue)
    const { data: pendingWinnings } = await supabase
      .from('winnings')
      .select('id, user_id, amount, match_type, status')
      .eq('status', 'pending')
      .limit(5)
    
    if (pendingWinnings) setWinnings(pendingWinnings)

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [supabase]) // Added supabase to dependencies

  const handleDrawAction = async (logic: string, action: string = 'simulate') => {
    setDrawLoading(true)
    try {
      const res = await fetch('/api/admin/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logic, action })
      })
      const data = await res.json()
      if (data.success) {
        alert(`${action === 'publish' ? 'Draw Published!' : 'Simulation Complete!'} Winning Numbers: ${data.winningNumbers.join(', ')}`)
        fetchData()
      } else {
        alert('Action failed: ' + data.error)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setDrawLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />

      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        <AdminHeader />

        <main className="flex-1 p-8 md:p-12 max-w-[1600px] mx-auto w-full space-y-12">
          {/* Welcome Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-3">Philanthropy Ledger / v2.0.4</p>
              <h1 className="text-5xl font-black font-headline tracking-tighter text-on-surface">Systems Overview</h1>
            </div>
            <div className="flex items-center space-x-3 px-6 py-3 bg-surface-container-high rounded-2xl border border-outline-variant/30 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Live Proxy Established</span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <StatsGrid 
            activeUsers={activeUsers} 
            totalPrizePool={activeUsers ? activeUsers * 5 : 0} 
            charityContributions={activeUsers ? activeUsers * 1.5 : 0} 
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            <div className="xl:col-span-2 space-y-12">
              <MemberLedger members={members.slice(0, 5)} />
              
              {/* User Registry (New Section) */}
              <UserRegistry />
            </div>

            <div className="space-y-12">
              <DrawCenter 
                onSimulate={(logic) => handleDrawAction(logic, 'simulate')}
                onPublish={(logic) => handleDrawAction(logic, 'publish')}
                loading={drawLoading}
                activeUsers={activeUsers}
              />
              
              <VerificationQueue winnings={winnings} />
            </div>
          </div>
        </main>

        <footer className="p-12 border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between text-on-surface-variant/40 gap-6">
          <p className="text-[10px] font-black uppercase tracking-widest">&copy; 2026 The Fairway Collective | Root Authority</p>
          <div className="flex items-center space-x-8 text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="hover:text-secondary cursor-pointer transition-colors">Privacy Encryption</span>
            <span className="hover:text-secondary cursor-pointer transition-colors">Audit Logs</span>
            <span className="hover:text-secondary cursor-pointer transition-colors">Network Health</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
