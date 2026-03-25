'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Calendar, Activity } from 'lucide-react'

type Score = {
  id: string
  score: number
  date: string
}

export default function ScoreEntry({ initialScores }: { initialScores: Score[] }) {
  const [scores, setScores] = useState<Score[]>(initialScores || [])
  const [newScore, setNewScore] = useState<string>('')
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newScore || Number(newScore) < 1 || Number(newScore) > 45) return
    setLoading(true)
    
    // Mock DB Call
    setTimeout(() => {
      const addedScore = { id: Math.random().toString(), score: Number(newScore), date }
      setScores(prev => [addedScore, ...prev].slice(0, 5))
      setNewScore('')
      setLoading(false)
    }, 500)
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_20px_40px_rgba(26,28,28,0.03)] border border-[#e2e2e2]">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-6 h-6 text-[#181f21]" />
        <h2 className="text-xl font-bold font-['Manrope'] text-[#181f21]">Rolling Performance</h2>
      </div>

      <form id="form-score-entry" onSubmit={handleSubmit} className="flex gap-4 mb-8">
        <div className="flex-1">
          <label htmlFor="input-score" className="sr-only">Stableford Score</label>
          <input
            id="input-score"
            type="number"
            min="1"
            max="45"
            value={newScore}
            onChange={(e) => setNewScore(e.target.value)}
            placeholder="Score (1-45)"
            required
            className="w-full px-4 py-3 rounded-xl bg-[#f9f9f9] border border-[#e2e2e2] focus:border-[#46645c] focus:outline-none transition-colors"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="input-date" className="sr-only">Date</label>
          <input
            id="input-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#f9f9f9] border border-[#e2e2e2] focus:border-[#46645c] focus:outline-none transition-colors"
          />
        </div>
        <button
          id="btn-submit-score"
          type="submit"
          disabled={loading || !newScore}
          className="px-6 py-3 bg-[#181f21] text-white rounded-xl font-medium flex items-center gap-2 hover:bg-[#2d3436] transition-colors disabled:opacity-50 active:scale-95 duration-100"
        >
          <Plus className="w-5 h-5" /> <span>Add</span>
        </button>
      </form>

      <div>
        <h3 className="text-sm font-medium text-[#959c9f] mb-4 uppercase tracking-wider">Latest 5 Scores</h3>
        <div className="space-y-3">
          {scores.length === 0 ? (
            <p className="text-[#586062] text-center py-4">No scores recorded yet. Submit your first round!</p>
          ) : (
            scores.map((score, i) => (
              <motion.div
                key={score.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-[#f9f9f9] border border-[#e2e2e2]/50"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#c1c8ca]" />
                  <span className="text-[#586062] text-sm">{score.date}</span>
                </div>
                <div className="font-bold text-lg text-[#181f21]">{score.score} <span className="text-sm font-normal text-[#959c9f]">pts</span></div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
