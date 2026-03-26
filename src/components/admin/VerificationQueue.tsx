'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, ChevronRight } from 'lucide-react';

interface Winnings {
  id: string;
  user_id: string;
  amount: number;
  match_type: number;
  status: string;
}

interface VerificationQueueProps {
  winnings: Winnings[];
}

export default function VerificationQueue({ winnings }: VerificationQueueProps) {
  return (
    <div className="bg-white rounded-[2.5rem] ambient-shadow border border-outline-variant/20 p-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-2xl font-black font-headline tracking-tight text-on-surface">Verification Queue</h3>
          <p className="text-on-surface-variant/60 text-xs font-bold uppercase tracking-widest mt-1 italic">Pending Claims / 0xFC-NET-SEC</p>
        </div>
        <div className="w-10 h-10 bg-surface-container-low rounded-xl flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-on-surface-variant" />
        </div>
      </div>

      <div className="space-y-4">
        {winnings.length > 0 ? winnings.map((win, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={win.id} 
            className="p-6 border border-outline-variant/20 rounded-2xl hover:border-secondary/30 hover:bg-surface-container-low/30 transition-all group pointer-events-auto cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-surface-container-low rounded-2xl flex items-center justify-center font-black text-xs text-on-surface-variant/40 group-hover:bg-white transition-colors border border-transparent group-hover:border-outline-variant/20">
                  {win.match_type}X
                </div>
                <div>
                  <p className="text-sm font-black text-on-surface tracking-tight truncate max-w-[120px]">{win.user_id}</p>
                  <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mt-1">Match Level {win.match_type}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-on-surface">${Number(win.amount).toLocaleString()}</div>
                <div className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mt-1">Pending Sync</div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/10 flex items-center justify-between">
              <span className="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-tighter italic">ID: {win.id.substring(0, 8)}</span>
              <button className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em] flex items-center group/btn">
                Authorize <ChevronRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )) : (
          <div className="py-20 text-center">
             <div className="w-16 h-16 bg-surface-container-low rounded-3xl flex items-center justify-center mx-auto mb-6 opacity-30">
               <ShieldCheck className="w-8 h-8 text-on-surface-variant" />
             </div>
             <p className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/40 italic">
               The queue is currently decentralized and synchronized.
             </p>
          </div>
        )}
      </div>
    </div>
  );
}
