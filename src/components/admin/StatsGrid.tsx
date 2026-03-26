'use client';

import { motion } from 'framer-motion';
import { Users, Wallet, Heart, TrendingUp, ChevronRight } from 'lucide-react';

interface StatsGridProps {
  activeUsers: number | null;
  totalPrizePool: number;
  charityContributions: number;
}

export default function StatsGrid({ activeUsers, totalPrizePool, charityContributions }: StatsGridProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white rounded-3xl p-8 ambient-shadow border border-outline-variant/20 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
          <Users className="w-24 h-24 text-on-surface" />
        </div>
        <p className="text-[10px] font-black tracking-[0.2em] text-on-surface-variant/60 uppercase mb-6 flex items-center">
          Total Active Users <ChevronRight className="w-3 h-3 ml-1" />
        </p>
        <div className="flex items-end justify-between relative z-10">
          <h3 className="text-6xl font-black text-on-surface tracking-tighter">{activeUsers !== null ? activeUsers : '0'}</h3>
          <div className="flex items-center px-3 py-1.5 bg-secondary-fixed/30 text-secondary font-black text-xs rounded-xl backdrop-blur-sm">
            <TrendingUp className="w-3 h-3 mr-1.5" />
            8.2%
          </div>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white rounded-3xl p-8 ambient-shadow border border-outline-variant/20 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
          <Wallet className="w-24 h-24 text-on-surface" />
        </div>
        <p className="text-[10px] font-black tracking-[0.2em] text-on-surface-variant/60 uppercase mb-6 flex items-center">
          Total Prize Pool <ChevronRight className="w-3 h-3 ml-1" />
        </p>
        <div className="flex items-end justify-between relative z-10">
          <h3 className="text-6xl font-black text-on-surface tracking-tighter">${totalPrizePool.toLocaleString()}</h3>
          <div className="w-12 h-12 bg-surface-container-low rounded-2xl flex items-center justify-center">
            <Wallet className="w-6 h-6 text-on-surface-variant/40" />
          </div>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="silk-gradient rounded-3xl p-8 shadow-2xl relative overflow-hidden group text-white border border-white/10"
      >
        <div className="absolute -right-4 -top-4 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        
        <p className="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase mb-6 flex items-center">
          Impact Generated <Heart className="w-3 h-3 ml-1 text-secondary-fixed shadow-[0_0_10px_rgba(173,205,195,0.5)]" />
        </p>
        <div className="flex items-end justify-between relative z-10">
          <h3 className="text-6xl font-black text-white tracking-tighter">${Math.floor(charityContributions).toLocaleString()}</h3>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md"
          >
            <Heart className="w-6 h-6 text-secondary-fixed shadow-[0_0_10px_rgba(173,205,195,0.8)]" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
