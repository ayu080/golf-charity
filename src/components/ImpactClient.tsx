'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ImpactClient({ charities, charitableDonationTotal }: { charities: any[] | null, charitableDonationTotal: number }) {
  return (
    <>
      <nav id="impact-nav" className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-[#181f21]/80 backdrop-blur-xl border-b border-outline-variant/20">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" id="impact-logo" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-on-surface">
            <span className="material-symbols-outlined text-primary" data-icon="waves" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>waves</span>
            <span className="text-xl font-extrabold tracking-tighter font-headline">The Fairway Collective</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link id="impact-btn-dashboard" className="hidden sm:block text-sm font-bold font-headline text-on-surface-variant hover:text-primary transition-colors" href="/dashboard">
              Dashboard
            </Link>
            <Link id="impact-btn-subscribe" href="/pricing">
              <button id="btn-impact-subscribe" className="bg-primary text-on-primary px-5 py-2 rounded-lg text-sm font-semibold tracking-wide hover:opacity-90 active:scale-95 transition-all shadow-sm">
                Subscribe
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div id="impact-header" className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-9xl font-black font-headline tracking-tighter text-primary leading-[0.9] mb-10"
          >
            Global <br/> Impact
          </motion.h1>
          <p className="text-xl text-on-surface-variant font-medium opacity-80 leading-relaxed">
            Real-time tracking of the capital directed to our benevolent partners through the Collective's efforts.
          </p>
        </div>

        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          id="impact-hero-metrics"
          className="bg-[#1A1A1A] text-white p-12 md:p-20 rounded-[2rem] shadow-2xl mb-24 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 border border-white/5"
        >
          <div className="relative z-10 space-y-4 flex-1">
            <span className="text-white/40 text-xs font-black uppercase tracking-[0.3em] block">Total Charity Contributions</span>
            <div id="impact-total-raised" className="text-7xl md:text-9xl font-headline font-black tracking-tighter text-[#faf7f6]">
              ${Math.floor(charitableDonationTotal).toLocaleString()}
            </div>
            <p className="text-[#adb3b4] text-xl max-w-md font-medium opacity-80 leading-relaxed">Aggregated from member donations, subscription surpluses, and event sponsorships this season.</p>
          </div>
          <div className="relative z-10 flex-none bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-2xl shadow-inner">
            <div className="space-y-10">
              <div id="metric-countries" className="flex items-center gap-6">
                <span className="material-symbols-outlined text-5xl text-secondary">public</span>
                <div>
                  <div className="text-4xl font-black font-headline tracking-tight">12+</div>
                  <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">Countries Reached</div>
                </div>
              </div>
              <div id="metric-lives" className="flex items-center gap-6">
                <span className="material-symbols-outlined text-5xl text-tertiary">water_drop</span>
                <div>
                  <div className="text-4xl font-black font-headline tracking-tight">400k</div>
                  <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">Lives Impacted</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-24 -right-24 w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-primary/20 animate-pulse"></div>
        </motion.section>

        <h2 id="impact-partners-title" className="text-4xl font-black font-headline mb-16 text-primary text-center tracking-tight">Our Benevolent Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {charities && charities.length > 0 ? charities.map((charity, idx) => (
            <motion.div 
              key={idx} 
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              id={`charity-card-${idx}`}
              className="bg-surface-container-lowest p-10 rounded-[1.5rem] shadow-sm border border-outline-variant/10 hover:shadow-2xl transition-all group flex flex-col h-full ambient-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-container text-primary flex items-center justify-center text-2xl font-black mb-8 group-hover:scale-110 transition-transform shadow-sm">
                {charity.name.charAt(0)}
              </div>
              <h3 className="text-2xl font-black font-headline mb-4 text-on-surface tracking-tight group-hover:text-primary transition-colors">{charity.name}</h3>
              <p className="text-on-surface-variant flex-grow text-base mb-8 leading-relaxed opacity-80 font-medium">{charity.description || 'Dedicated partner of the Fairway Collective focused on generating sustainable environmental and social impact worldwide.'}</p>
              <div className="mt-auto pt-8 border-t border-surface-container-highest flex justify-between items-center text-xs font-black tracking-widest uppercase text-primary">
                <span>Verified Partner</span>
                <span className="material-symbols-outlined scale-125" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              </div>
            </motion.div>
          )) : (
            <div id="no-partners" className="md:col-span-3 text-center py-24 text-on-surface-variant bg-surface-container-low rounded-[2rem] border-2 border-dashed border-outline-variant/30">
              <span className="material-symbols-outlined text-6xl mb-4" style={{ fontVariationSettings: "'wght' 200" }}>volunteer_activism</span>
              <p className="text-lg font-bold">Partner data currently unavailable.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
