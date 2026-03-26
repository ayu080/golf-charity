'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface Member {
  id: string;
  email: string;
  subscription_status: string;
  created_at: string;
}

interface MemberLedgerProps {
  members: Member[];
}

export default function MemberLedger({ members }: MemberLedgerProps) {
  return (
    <div className="bg-white rounded-[2.5rem] ambient-shadow border border-outline-variant/20 p-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-2xl font-black font-headline tracking-tight text-on-surface">Member Ledger</h3>
          <p className="text-on-surface-variant/60 text-xs font-bold uppercase tracking-widest mt-1 italic">Active Registry / 0xFC-NODE-1</p>
        </div>
        <button className="px-6 py-3 bg-surface-container-low hover:bg-surface-container-high rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center shadow-sm">
          Export Data <ChevronRight className="w-3 h-3 ml-2" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-outline-variant/30">
              <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Identifier</th>
              <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Status</th>
              <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Commit Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {members.length > 0 ? members.map((member, i) => (
              <motion.tr 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={member.id} 
                className="group hover:bg-surface-container-low/50 transition-colors"
              >
                <td className="py-6 pr-6">
                  <div className="font-bold text-sm text-on-surface select-all">{member.email}</div>
                  <div className="text-[10px] font-mono text-on-surface-variant/30 mt-1 uppercase tracking-tighter">{member.id.split('-')[0]}...</div>
                </td>
                <td className="py-6">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-fixed/30 text-secondary text-[10px] font-black uppercase tracking-widest border border-secondary/10 shadow-sm animate-pulse-slow">
                    {member.subscription_status}
                  </div>
                </td>
                <td className="py-6">
                  <div className="text-xs font-bold text-on-surface-variant/60 tracking-wider">
                    {new Date(member.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </td>
              </motion.tr>
            )) : (
              <tr>
                <td colSpan={3} className="py-12 text-center text-on-surface-variant/40 text-xs font-bold uppercase tracking-widest italic">
                  No active protocols discovered in this node.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
