'use client'

import { motion } from 'framer-motion'
import { Trophy, UploadCloud, ChevronRight, Clock } from 'lucide-react'

export default function WinningsOverview() {
  const upcomingDrawDate = '2026-04-01'

  return (
    <div className="bg-[#181f21] p-8 rounded-2xl shadow-[0_20px_40px_rgba(24,31,33,0.15)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2d3436] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <Trophy className="w-6 h-6 text-[#cba72f]" />
          <h2 className="text-xl font-bold font-['Manrope'] text-white">Rewards Hub</h2>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <p className="text-[#959c9f] text-sm uppercase tracking-wider mb-2">Total Won</p>
            <p className="text-4xl font-bold font-['Manrope'] text-white">$450</p>
          </div>
          <div>
            <p className="text-[#959c9f] text-sm uppercase tracking-wider mb-2">Pending</p>
            <p className="text-4xl font-bold font-['Manrope'] text-[#cba72f]">$0</p>
          </div>
        </div>

        <div className="mb-10 bg-[#2d3436] rounded-xl p-5 border border-[#434749]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#c1c8ca]" /> Upcoming Draw
            </h3>
            <span className="text-sm text-[#c1c8ca]">{upcomingDrawDate}</span>
          </div>
          <div className="w-full bg-[#181f21] h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#cba72f] to-[#ffe088] w-2/3 h-full rounded-full"></div>
          </div>
        </div>

        <a href="mailto:billing@fairwaycollective.org" className="w-full py-4 bg-white text-[#181f21] rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#f9f9f9] hover:shadow-lg transition-all block text-center">
          <span className="material-symbols-outlined text-lg">payments</span>
          Withdraw Funds
        </a>
      </div>
    </div>
  )
}
