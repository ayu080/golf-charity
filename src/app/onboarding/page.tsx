'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'
import { Loader2, Heart, CheckCircle2 } from 'lucide-react'

type Charity = {
  id: string
  name: string
  description: string
}

export default function OnboardingPage() {
  const [charities, setCharities] = useState<Charity[]>([])
  const [selectedCharity, setSelectedCharity] = useState<string | null>(null)
  const [percentage, setPercentage] = useState<number>(10)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function loadData() {
      // Mock charities if none exist in DB yet for smooth UX during dev
      const { data, error } = await supabase.from('charities').select('*')
      if (error || !data || data.length === 0) {
        setCharities([
          { id: '1', name: 'Water Equity Foundation', description: 'Providing clean water access globally.' },
          { id: '2', name: 'Youth Golf Initiative', description: 'Empowering underprivileged youth through sports.' },
          { id: '3', name: 'Green Earth Trust', description: 'Reforestation and carbon offsetting.' }
        ])
      } else {
        setCharities(data)
      }
      setLoading(false)
    }
    loadData()
  }, [supabase])

  const handleComplete = async () => {
    if (!selectedCharity) return
    setSaving(true)
    
    // In actual implementation, the selectedCharity id would be a UUID updating the user's profile
    // Here we update the profile using the auth user id
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      // If mock charities were used, we skip absolute DB constraint error by just proceeding if DB call fails
      const { error } = await supabase
        .from('profiles')
        .update({ 
          charity_id: selectedCharity.length > 5 ? selectedCharity : null, 
          charity_contribution_percentage: percentage 
        })
        .eq('id', user.id)
        
      if (error) {
        console.error('Failed to update profile', error)
      }
    }
    
    router.push('/dashboard')
    router.refresh()
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#181f21]" /></div>

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-[#f9f9f9] flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-12">
          <Heart className="w-12 h-12 text-[#46645c] mx-auto mb-4" />
          <h1 className="text-4xl font-bold font-['Manrope'] text-[#181f21]">Choose Your Impact</h1>
          <p className="mt-3 text-lg text-[#586062]">Select a charity to support with your monthly subscription.</p>
        </div>

        <div className="space-y-4 mb-10">
          {charities.map((charity) => (
            <div 
              key={charity.id}
              onClick={() => setSelectedCharity(charity.id)}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                selectedCharity === charity.id 
                  ? 'border-[#46645c] bg-[#c8eadf]/20 shadow-sm' 
                  : 'border-[#e2e2e2] bg-white hover:border-[#c1c8ca]'
              }`}
            >
              <div>
                <h3 className="text-lg font-bold font-['Manrope'] text-[#181f21]">{charity.name}</h3>
                <p className="text-[#586062] mt-1 text-sm">{charity.description}</p>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedCharity === charity.id ? 'bg-[#46645c] text-white' : 'border-2 border-[#c1c8ca]'}`}>
                {selectedCharity === charity.id && <CheckCircle2 className="w-4 h-4" />}
              </div>
            </div>
          ))}
        </div>

        {selectedCharity && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-10 bg-white p-6 rounded-2xl border border-[#e2e2e2]"
          >
            <h3 className="font-bold font-['Manrope'] text-[#181f21] mb-4">Set Your Contribution</h3>
            <p className="text-sm text-[#586062] mb-6">You can voluntarily increase the percentage of your subscription fee that goes to your charity (Minimum 10%).</p>
            
            <div className="flex items-center gap-6">
              <input 
                type="range" 
                min="10" 
                max="100" 
                step="5"
                value={percentage} 
                onChange={(e) => setPercentage(Number(e.target.value))}
                className="w-full h-2 bg-[#f3f3f3] rounded-lg appearance-none cursor-pointer accent-[#46645c]"
              />
              <div className="text-2xl font-bold text-[#46645c] w-20 text-right">{percentage}%</div>
            </div>
          </motion.div>
        )}

        <button
          onClick={handleComplete}
          disabled={!selectedCharity || saving}
          className="w-full py-4 bg-[#181f21] text-white rounded-xl font-medium text-lg flex justify-center items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Complete Setup'}
        </button>
      </motion.div>
    </div>
  )
}
