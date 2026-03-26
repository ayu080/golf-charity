'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export default function HomeClient({ activeMembersCount, charities }: { activeMembersCount: number | null, charities: any[] | null }) {
  const displayCount = activeMembersCount || 14000;
  const charity1 = charities?.[0]?.name || "Clean Water Initiative";
  const charity2 = charities?.[1]?.name || "Youth Education";
  return (
    <>
      <nav id="main-nav" className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-[#181f21]/80 backdrop-blur-xl border-b border-outline-variant/20">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" id="nav-logo" className="flex items-center gap-2 text-on-surface hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-primary" data-icon="waves" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>waves</span>
            <span className="text-xl font-extrabold tracking-tighter font-headline">The Fairway Collective</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6 font-headline font-bold text-xs sm:text-sm text-on-surface-variant">
            <Link id="nav-impact" className="hover:text-primary transition-colors" href="/impact">Impact</Link>
            <Link id="nav-scores" className="hover:text-primary transition-colors hidden sm:block" href="/scores">Leaderboard</Link>
            <Link id="nav-about" className="hover:text-primary transition-colors" href="/about">About Us</Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link id="nav-login" className="text-xs sm:text-sm font-bold font-headline text-on-surface-variant hover:text-primary transition-colors" href="/login">
              Log In
            </Link>
            <Link id="nav-subscribe" href="/pricing">
              <button id="btn-subscribe-nav" className="bg-primary text-on-primary px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity shadow-sm active:scale-95 duration-150">
                Subscribe
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <section id="hero" className="px-6 py-16 md:py-24 max-w-7xl mx-auto overflow-hidden">
          <div className="flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4 max-w-2xl"
            >
              <h1 id="hero-title" className="text-5xl md:text-7xl font-extrabold font-headline tracking-tight text-primary leading-[1.1]">
                Impact Beyond <br />the Green
              </h1>
              <p id="hero-subtitle" className="text-lg text-on-surface-variant font-light leading-relaxed">
                Transforming the world’s most prestigious game into a catalyst for global change. Your dedication on the course fuels meaningful progress off it.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full aspect-[4/5] md:aspect-[21/9] overflow-hidden rounded-xl shadow-2xl"
            >
              <img id="hero-image" alt="Community gathering" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWCWBkhILiirCASHpTuSfwE1YDsotzJ5uqifkkeAFPKapCZdKAdjKsojEThn0CE3xcbnikf8OG5_W8YlfmDcMgZSHiAMolpcsObzBGrc_8QnuBjoMPopIKXGE1sxlHb0m7A-mXO6p6eZeKFr62bQI0IzxsxGEDhWvbilpta3_gdxkdFjDPY_IZ9ZcZmsbXhrubpIhl-insqBSW9DyTivQc1CF3huj-PhQ-5CxEDC9QtMFYcPrK1pr5MwYfvSq6llqXtsBUd19Y_ZEL" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent flex items-end p-8">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="flex items-center gap-4 text-on-primary"
                >
                  <span className="material-symbols-outlined text-3xl" data-icon="volunteer_activism">volunteer_activism</span>
                  <span className="font-medium tracking-wide">Over $2.4M raised this season</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="bg-surface-container-low py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 id="section-how-title" className="text-4xl font-bold font-headline tracking-tight text-primary">How It Works</h2>
              <div className="w-16 h-1 bg-secondary mt-4 rounded-full"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                id="card-play"
                className="md:col-span-7 bg-surface-container-lowest p-10 rounded-2xl flex flex-col justify-between min-h-[350px] group hover:shadow-2xl transition-all duration-500 border border-outline-variant/10 ambient-shadow"
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                    <span className="material-symbols-outlined text-3xl text-primary" data-icon="edit_note">edit_note</span>
                  </div>
                  <h3 className="text-3xl font-bold font-headline">Play</h3>
                  <p className="text-secondary-fixed/60 mt-4 max-w-2xl mx-auto font-medium">
            Every swing counts. Your passion for the game fuels our mission to drive change through sport. It&apos;s more than a leadboard; it&apos;s a movement.
          </p>
      </div>
                <Link id="link-play" href="/dashboard" className="mt-8 flex items-center gap-3 text-primary font-bold text-lg group-hover:gap-5 transition-all w-fit">
                  <span>Enter your scores</span>
                  <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
                </Link>
              </motion.div>

              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:col-span-5 h-[350px] rounded-2xl overflow-hidden shadow-2xl relative group"
              >
                <img id="img-smiling-children" alt="Smiling children" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6kL7VQ2p63-hhTyZ5_BoZzXH6zKaEvUDzVZq749U4s08MRkd8lclDBBeYbkvPCJlttjp7Af5bFs9xEc7dqA1iC8MO_6WjK6ivsiABIhXkF6lSVyCVEpcsz8eAEJdckKNHRbOTNR1LP4nkESXloL47oLNLW8ZhoK7IwP2TKxTBIQdtRiDeSus8wTTAriGZVMYPP3TYZYrzsjgVGg5gH56bfeIYNwIGlt3F9Ul2lLHAtHPpetan1ca4nG5FSAAJUADZF53t4bMbVxlz" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="text-white font-bold tracking-widest uppercase text-xs">Community Impact</span>
                </div>
              </motion.div>

              <motion.div 
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                className="hidden md:block md:col-span-4 h-[400px] rounded-2xl overflow-hidden shadow-lg"
              >
                <img id="img-texture" alt="High quality paper texture" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK2NK0fx35Pgc3VePILC7Bt5lAecEE-rMVnhdScsiAMfTmBcTs6YM21_4mUxR1UI8eKk0PAMsAiUP1Mjw7HSP3LSukJulJ86qFuGXBFTc0IJLo_qSySzynBy4-ysD7n-zGcmEY9Ec-stIvb8UVWoGKRnJyfpopPnXFslm2tdvJjoKg3GBt_-ZDpVhrq7_da0LKxvuvya6PgNr697TjyOVH4PZo_OarUeRzfnDlF62pghJWVkMPECGL6ksqps5-a4ANEe7Rysfzf8u7" />
              </motion.div>

              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                id="card-win"
                className="md:col-span-8 bg-black text-on-primary p-12 rounded-2xl flex flex-col justify-between min-h-[400px] relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 group-hover:scale-[1.8] group-hover:opacity-10 transition-all duration-1000">
                  <span className="material-symbols-outlined text-[150px]" data-icon="workspace_premium" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                </div>
                <div className="space-y-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-white" data-icon="trophy">trophy</span>
                  </div>
                  <h3 className="text-4xl font-bold font-headline">Win</h3>
                  <p className="text-on-primary-container text-xl max-w-lg leading-relaxed opacity-90">Your participation grants you entry into our exclusive monthly prize pool. Win curated luxury experiences and premium gear while doing good.</p>
                </div>
                <Link id="link-win" href="/pricing" className="mt-8 flex items-center gap-3 font-bold text-lg relative z-10 group-hover:gap-5 transition-all w-fit">
                  <span>Enter our monthly prize pool</span>
                  <span className="material-symbols-outlined" data-icon="trending_flat">trending_flat</span>
                </Link>
              </motion.div>

              <motion.div 
                whileInView={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                id="card-empower"
                className="md:col-span-12 bg-secondary/5 border border-secondary/10 p-12 rounded-2xl flex flex-col md:flex-row items-center gap-12 shadow-sm"
              >
                <div className="flex-1 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center shadow-lg shadow-secondary/20">
                    <span className="material-symbols-outlined text-3xl" data-icon="favorite" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  </div>
                  <h3 className="text-4xl font-bold font-headline text-primary">Empower</h3>
                  <p className="text-on-surface-variant text-xl leading-relaxed">This is the heart of the Collective. A portion of every subscription and every round played goes directly to support your chosen charity. Support your community with every round.</p>
                  <div className="pt-6 flex items-center gap-6">
                    <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className={`w-12 h-12 rounded-full border-4 border-surface bg-slate-${200 + i*100}`}></div>
                      ))}
                    </div>
                    <span className="text-base font-bold text-primary">{displayCount > 1000 ? `+${Math.floor(displayCount/1000)}k` : displayCount} Members contributing</span>
                  </div>
                </div>

                <div className="flex-none w-full md:w-2/5 bg-white dark:bg-white/5 backdrop-blur-3xl rounded-2xl p-8 space-y-8 shadow-xl border border-outline-variant/10">
                  <div className="text-xs uppercase tracking-widest font-black text-primary opacity-60">Real-time Impact Tracker</div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-bold text-primary">
                      <span>{charity1}</span>
                      <span>84%</span>
                    </div>
                    <div className="h-3 bg-surface-container rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '84%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-secondary rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-bold text-primary">
                      <span>{charity2}</span>
                      <span>62%</span>
                    </div>
                    <div className="h-3 bg-surface-container rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '62%' }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="cta" className="py-32 px-6 text-center max-w-4xl mx-auto">
          <motion.div
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true }}
          >
            <h2 id="cta-title" className="text-5xl md:text-7xl font-extrabold font-headline mb-8 tracking-tight text-primary leading-tight">Ready to Play <br />for More?</h2>
            <p id="cta-subtitle" className="text-xl text-on-surface-variant mb-12 font-light max-w-2xl mx-auto">Join a community of golfers who believe the game is about more than just the final score.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link id="link-subscribe-cta" href="/pricing">
                <button id="btn-subscribe-cta" className="bg-primary text-on-primary px-12 py-6 rounded-2xl font-bold text-xl hover:scale-[1.05] active:scale-95 transition-all shadow-2xl silk-gradient w-full sm:w-auto">
                  Subscribe Now
                </button>
              </Link>
              <Link id="link-impact-cta" href="/impact">
                <button id="btn-impact-cta" className="bg-surface-container-high text-primary px-12 py-6 rounded-2xl font-bold text-xl hover:bg-surface-container-highest active:scale-95 transition-all w-full sm:w-auto">
                  View Impact
                </button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <footer id="main-footer" className="bg-surface-container-low w-full pt-24 pb-12 border-t border-outline-variant/10">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-12">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <Link href="/" className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl" data-icon="waves" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>waves</span>
              <span className="text-2xl font-black text-primary font-headline tracking-tighter">The Fairway Collective</span>
            </Link>
            <p className="text-sm tracking-wide text-on-surface-variant font-medium text-center md:text-left opacity-60">
              © 2024 The Fairway Collective. <br />Curating global impact through every round played.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link id="footer-impact" className="text-sm font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-all font-headline" href="/impact">Impact Report</Link>
            <Link id="footer-privacy" className="text-sm font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-all font-headline" href="/about">Privacy</Link>
            <Link id="footer-terms" className="text-sm font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-all font-headline" href="/about">Terms</Link>
            <Link id="footer-support" className="text-sm font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-all font-headline" href="/about">Support</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
