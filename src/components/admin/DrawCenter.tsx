'use client';

import { Target, Zap, ShieldAlert, Cpu } from 'lucide-react';

interface DrawCenterProps {
  onSimulate: (logic: string) => void;
  onPublish: (logic: string) => void;
  loading: boolean;
  activeUsers: number | null;
}

export default function DrawCenter({ onSimulate, onPublish, loading, activeUsers }: DrawCenterProps) {
  return (
    <div className="space-y-8">
      <div className="silk-gradient rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group border border-white/10">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
              <Target className="w-6 h-6 text-secondary-fixed" />
            </div>
            <div>
              <h3 className="text-xl font-black font-headline tracking-tight">Draw Engine</h3>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1 italic">Release Protocol: LIVE</p>
            </div>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 mb-8 backdrop-blur-sm group/card overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/card:scale-110 transition-transform">
              <Cpu className="w-16 h-16 text-white" />
            </div>
            <p className="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase mb-4">Network Readiness</p>
            <div className="flex items-center justify-between relative z-10">
              <span className="text-2xl font-black tracking-tighter">{activeUsers || 0} Nodes Peer-to-Peer</span>
              <div className="px-3 py-1 bg-emerald-400/20 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-400/20">Optimal</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onSimulate('random')}
              disabled={loading}
              className="py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50"
            >
              Dry Run
            </button>
            <button
              onClick={() => onPublish('random')}
              disabled={loading}
              className="py-4 bg-secondary-fixed text-[#181f21] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(173,205,195,0.4)] flex items-center justify-center"
            >
              {loading ? 'Processing...' : 'Deploy Final'}
            </button>
          </div>

          <button className="w-full mt-4 py-4 bg-white text-[#181f21] rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 group/btn shadow-xl shadow-[#181f21]/50 transition-all hover:-translate-y-1">
            <Zap className="w-4 h-4 fill-current group-hover/btn:scale-110 transition-transform" />
            Release Broadcast
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 ambient-shadow border border-outline-variant/20 relative overflow-hidden group">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-error/5 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-surface-container-low rounded-2xl flex items-center justify-center border border-outline-variant/10 shadow-sm">
              <ShieldAlert className="w-6 h-6 text-on-surface-variant" />
            </div>
            <div>
              <h3 className="text-xl font-black font-headline tracking-tight text-on-surface">System Alerts</h3>
              <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] mt-1">Status: Stable</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-5 border border-outline-variant/30 rounded-2xl hover:border-secondary/30 transition-colors cursor-pointer group/alert">
              <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Payout Latency</span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]"></span>
              </div>
              <p className="text-xs font-bold text-on-surface-variant/60 leading-relaxed italic group-hover/alert:text-on-surface transition-colors">
                High block congestion detected in node verification queue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
