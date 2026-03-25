'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HeartHandshake } from 'lucide-react'

export default function CharityProgress({
  charityName,
  initialPercentage
}: {
  charityName: string
  initialPercentage: number
}) {
  const [percentage, setPercentage] = useState(initialPercentage)
  const [isSaving, setIsSaving] = useState(false)

  const handleDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPercentage(Number(e.target.value))
    setIsSaving(true)
    // Mock DB save debounce
    setTimeout(() => setIsSaving(false), 800)
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_20px_40px_rgba(26,28,28,0.03)] border border-[#e2e2e2] h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <HeartHandshake className="w-6 h-6 text-[#46645c]" />
          <h2 className="text-xl font-bold font-['Manrope'] text-[#181f21]">Impact Tracker</h2>
        </div>
        <p className="text-[#586062] text-sm mb-8">Supporting: <span className="font-semibold text-[#181f21]">{charityName}</span></p>
        
        <div className="mb-2 flex justify-between items-end">
          <span className="text-sm font-medium text-[#434749]">Monthly Contribution</span>
          <span className="text-3xl font-bold text-[#46645c]">{percentage}%</span>
        </div>
        
        <div className="relative h-3 bg-[#f3f3f3] rounded-full overflow-hidden mb-6">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#46645c] to-[#c8eadf]"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm text-[#586062] mb-3">
          Adjust Voluntary Contribution (Min 10%)
        </label>
        <input 
          type="range" 
          min="10" 
          max="100" 
          step="5"
          value={percentage}
          onChange={handleDrag}
          className="w-full h-2 bg-[#f3f3f3] rounded-lg appearance-none cursor-pointer accent-[#46645c]"
        />
        {isSaving && <p className="text-xs text-[#959c9f] mt-2 animate-pulse">Saving preference...</p>}
      </div>
    </div>
  )
}
