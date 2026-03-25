'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ScoresClient({ scores }: { scores: any[] | null }) {
  return (
    <>
      <nav id="scores-nav" className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-[#181f21]/80 backdrop-blur-xl border-b border-outline-variant/20">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" id="scores-logo" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-on-surface">
            <span className="material-symbols-outlined text-primary" data-icon="waves" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>waves</span>
            <span className="text-xl font-extrabold tracking-tighter font-headline">The Fairway Collective</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link id="scores-btn-dashboard" className="hidden sm:block text-sm font-bold font-headline text-on-surface-variant hover:text-primary transition-colors" href="/dashboard">
              Dashboard
            </Link>
            <Link id="scores-btn-subscribe" href="/pricing">
              <button id="btn-scores-subscribe" className="bg-primary text-on-primary px-5 py-2 rounded-lg text-sm font-semibold tracking-wide hover:opacity-90 active:scale-95 transition-all shadow-sm">
                Subscribe
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div id="scores-header" className="max-w-4xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-9xl font-black font-headline tracking-tighter text-primary leading-[0.9] mb-8"
          >
            The <br/> Leaderboard
          </motion.h1>
          <p className="text-xl text-on-surface-variant font-medium opacity-80 leading-relaxed max-w-2xl border-l-4 border-secondary pl-8">
            Global rankings of the Collective's top performers. Every point contributes to the benevolent dividend.
          </p>
        </div>

        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-surface-container-lowest rounded-[2rem] shadow-2xl border border-outline-variant/10 overflow-hidden ambient-shadow"
        >
          <div className="overflow-x-auto">
            <table id="scores-table" className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary text-on-primary">
                  <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">Rank</th>
                  <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">Player</th>
                  <th className="px-8 py-6 font-black uppercase tracking-widest text-xs text-right">Score</th>
                  <th className="px-8 py-6 font-black uppercase tracking-widest text-xs text-right">Impact Generated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {scores && scores.length > 0 ? scores.map((score, idx) => (
                  <motion.tr 
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="hover:bg-surface-container-low transition-colors group"
                  >
                    <td className="px-8 py-8">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${idx < 3 ? 'bg-secondary text-on-secondary shadow-lg' : 'bg-surface-container-high text-on-surface'}`}>
                        {idx + 1}
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden border border-outline-variant/20 shadow-sm">
                          <img alt={score.profiles.full_name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(score.profiles.full_name)}&background=random`} />
                        </div>
                        <div>
                          <p className="font-headline font-black text-lg text-primary">{score.profiles.full_name}</p>
                          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Professional Member</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8 text-right font-black text-2xl text-primary font-headline">
                      {score.par_score}
                    </td>
                    <td className="px-8 py-8 text-right">
                      <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-sm">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>paid</span>
                        ${(score.par_score * 12.5).toLocaleString()}
                      </div>
                    </td>
                  </motion.tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-24 text-center text-on-surface-variant">
                       <span className="material-symbols-outlined text-5xl mb-4" style={{ fontVariationSettings: "'wght' 200" }}>leaderboard</span>
                       <p className="text-lg font-bold">No ranking data available for this cycle.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.section>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-10 bg-black text-white p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex-1">
             <h3 className="text-3xl font-black font-headline mb-4 tracking-tighter">Enter the Circuit</h3>
             <p className="text-white/60 text-lg leading-relaxed max-w-md">Your rounds contribute to our monthly draws and impact dividends. Professional subscriptions include automatic entry.</p>
          </div>
          <Link id="scores-link-subscribe-bottom" href="/pricing" className="relative z-10 bg-white text-black px-12 py-6 rounded-2xl font-black text-xl hover:scale-[1.05] transition-transform shadow-2xl active:scale-95 silk-gradient">
             Subscribe Now
          </Link>
          <div className="absolute top-0 right-0 p-10 opacity-5 scale-150">
             <span className="material-symbols-outlined text-[100px]" data-icon="trophy" style={{ fontVariationSettings: "'FILL' 1" }}>trophy</span>
          </div>
        </div>
      </main>
    </>
  );
}
