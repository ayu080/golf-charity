'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutClient() {
  return (
    <>
      <nav id="about-nav" className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-[#181f21]/80 backdrop-blur-xl border-b border-outline-variant/20">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" id="about-logo" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-on-surface">
            <span className="material-symbols-outlined text-primary" data-icon="waves" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>waves</span>
            <span className="text-xl font-extrabold tracking-tighter font-headline">The Fairway Collective</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link id="about-btn-dashboard" className="hidden sm:block text-sm font-bold font-headline text-on-surface-variant hover:text-primary transition-colors" href="/dashboard">
              Dashboard
            </Link>
            <Link id="about-btn-join" href="/pricing">
              <button id="btn-about-join" className="bg-primary text-on-primary px-5 py-2 rounded-lg text-sm font-semibold tracking-wide hover:opacity-90 transition-all active:scale-95 shadow-sm">
                Join Us
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h1 id="about-title" className="text-5xl md:text-8xl font-black font-headline tracking-tighter text-primary leading-none mb-12">
            The Philosophy of <br/> Philanthropic Play
          </h1>
          
          <div className="text-xl text-on-surface-variant space-y-10 font-body leading-relaxed">
            <p className="text-3xl leading-tight text-primary font-bold tracking-tight">
              The Fairway Collective was born from a simple observation: the game of golf commands unparalleled dedication, resources, and community. What if that collective energy could be harnessed strictly for global good?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-20">
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                id="about-card-mission"
                className="bg-surface-container-lowest p-10 rounded-2xl shadow-sm border-l-4 border-secondary ambient-shadow"
              >
                <h3 className="text-2xl font-black font-headline mb-4 text-primary uppercase tracking-widest">Our Mission</h3>
                <p className="opacity-80">To transform every round played into measurable impact, driving resources toward clean water, education, and health initiatives worldwide.</p>
              </motion.div>
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                id="about-card-model"
                className="bg-surface-container-lowest p-10 rounded-2xl shadow-sm border-l-4 border-primary ambient-shadow"
              >
                <h3 className="text-2xl font-black font-headline mb-4 text-primary uppercase tracking-widest">The Model</h3>
                <p className="opacity-80">A subscription ecosystem where net proceeds form a benevolent prize pool, distributing winnings to players and mandatory donations to charity.</p>
              </motion.div>
            </div>

            <h2 id="about-transparency-title" className="text-4xl font-black font-headline mt-20 mb-8 text-primary tracking-tight">Transparency & Trust</h2>
            <p className="opacity-90">
              Every dollar processed through The Fairway Collective is recorded on our immutable philanthropy ledger. Players decide which curated partner their winnings support, giving them direct agency over their impact. We audit our impact partners annually to ensure capital efficiency exceeds 85%.
            </p>
            <p className="opacity-90">
              Beyond the monetary contributions, our greatest asset is the community. We are building a global network of leaders who believe in leveraging their passion for the game to serve the world's most vulnerable. Join us on the fairway.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-24 flex justify-center"
          >
            <Link id="about-link-join-bottom" href="/pricing" className="bg-primary text-on-primary px-12 py-6 rounded-2xl font-black text-xl hover:scale-[1.05] transition-transform shadow-2xl silk-gradient active:scale-95">
              Join the Collective
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <footer id="about-footer" className="bg-surface-container-low w-full pt-20 pb-10 border-t border-outline-variant/10">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-8 text-center md:text-left">
           <p className="text-sm font-medium opacity-40">© 2024 The Fairway Collective. All rights reserved.</p>
           <div className="flex gap-8">
              <Link id="about-footer-privacy" href="#" className="text-xs font-bold uppercase tracking-widest hover:text-primary">Privacy</Link>
              <Link id="about-footer-terms" href="#" className="text-xs font-bold uppercase tracking-widest hover:text-primary">Terms</Link>
           </div>
        </div>
      </footer>
    </>
  );
}
