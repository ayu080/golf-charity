'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)
  
  // Replace these with actual Stripe Price IDs once created in the dashboard
  const MONTHLY_PRICE_ID = 'price_monthly_mock'
  const YEARLY_PRICE_ID = 'price_yearly_mock'

  const handleSubscribe = async (priceId: string) => {
    setLoading(priceId)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error initiating checkout', error)
    } finally {
      if (!window.location.href.includes('checkout.stripe.com')) {
          setLoading(null) // Only clear loader if we failed to redirect
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8eadf] rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold font-['Manrope'] text-[#181f21] mb-4">Invest in Impact</h1>
        <p className="text-lg text-[#586062] max-w-2xl mx-auto">Choose the plan that suits your play style. Minimum 10% goes directly to the charity of your choice.</p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-3xl border border-[#e2e2e2] shadow-[0_20px_40px_rgba(26,28,28,0.03)] flex flex-col h-full"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-['Manrope'] text-[#181f21]">Monthly Drive</h2>
            <div className="mt-4 flex items-end gap-1">
              <span className="text-5xl font-bold text-[#181f21]">$15</span>
              <span className="text-[#586062] mb-1">/mo</span>
            </div>
            <p className="text-[#586062] mt-4 text-sm">Flexible access, charged rolling monthly.</p>
          </div>
          
          <ul className="space-y-4 mb-10 flex-grow">
             {['10% minimum charity donation', 'Automatic 5-score tracking', 'Entry to monthly algorithmic draws', 'Eligible for progressive jackpot'].map((feature, i) => (
               <li key={i} className="flex items-start gap-3 text-[#434749]">
                 <Check className="w-5 h-5 text-[#46645c] shrink-0" />
                 <span>{feature}</span>
               </li>
             ))}
          </ul>
          
          <button 
            onClick={() => handleSubscribe(MONTHLY_PRICE_ID)}
            disabled={loading !== null}
            className="w-full py-4 bg-white text-[#181f21] border-2 border-[#181f21] rounded-xl font-medium hover:bg-[#f9f9f9] transition-colors flex justify-center items-center h-14"
          >
            {loading === MONTHLY_PRICE_ID ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Choose Monthly'}
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[#181f21] p-8 rounded-3xl border border-[#2d3436] shadow-[0_20px_40px_rgba(24,31,33,0.15)] flex flex-col h-full relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-[#cba72f] text-[#241a00] text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
          <div className="mb-8 relative z-10">
            <h2 className="text-2xl font-bold font-['Manrope'] text-white">Annual Patron</h2>
            <div className="mt-4 flex items-end gap-1">
              <span className="text-5xl font-bold text-white">$150</span>
              <span className="text-[#959c9f] mb-1">/yr</span>
            </div>
            <p className="text-[#c1c8ca] mt-4 text-sm">Two months free. Maximize your impact.</p>
          </div>
          
          <ul className="space-y-4 mb-10 flex-grow relative z-10">
             {['10% minimum charity donation', 'Automatic 5-score tracking', 'Entry to monthly algorithmic draws', 'Eligible for progressive jackpot', 'Priority verification queue'].map((feature, i) => (
               <li key={i} className="flex items-start gap-3 text-[#c1c8ca]">
                 <Check className="w-5 h-5 text-[#cba72f] shrink-0" />
                 <span>{feature}</span>
               </li>
             ))}
          </ul>
          
          <button 
            onClick={() => handleSubscribe(YEARLY_PRICE_ID)}
            disabled={loading !== null}
            className="w-full py-4 bg-gradient-to-r from-[#cba72f] to-[#ffe088] text-[#241a00] rounded-xl font-bold hover:opacity-90 transition-opacity flex justify-center items-center h-14 relative z-10"
          >
           {loading === YEARLY_PRICE_ID ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Choose Annual'}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
