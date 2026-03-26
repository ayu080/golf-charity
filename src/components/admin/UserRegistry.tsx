'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Shield, 
  User as UserIcon, 
  Power, 
  RefreshCcw, 
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  LogIn
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  role: 'admin' | 'user';
  subscription_status: string;
  created_at: string;
}

export default function UserRegistry() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const supabase = createClient();

  const fetchProfiles = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from('profiles')
      .select('id, email, role, subscription_status')
      .order('email');
    
    if (fetchError) setError(fetchError.message);
    else setProfiles((data as UserProfile[]) || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  async function toggleAdmin(id: string, currentRole: string) {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    setActionLoading(`role-${id}`);
    
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', id);

    if (updateError) {
       alert(updateError.message);
    } else {
       await fetchProfiles();
    }
    setActionLoading(null);
  }

  // Mock Impersonation / Quick Login helper
  // In a real app, this would use a secure backend function to issue a temporary token
  // For this dev demo, we can just log the email or simulate the switch
  async function impersonate(email: string) {
    alert(`Authority Note: You are attempting to switch clearance to ${email}. In a production environment, this would initiate a cryptographically secure session handover.`);
  }

  return (
    <div className="bg-white rounded-[2.5rem] ambient-shadow border border-outline-variant/20 p-10 mt-12 overflow-hidden relative group">
      <div className="absolute -left-20 -top-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 relative z-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-secondary/10 rounded-xl">
              <Users className="w-5 h-5 text-secondary" />
            </div>
            <h3 className="text-3xl font-black font-headline tracking-tight text-on-surface">Node Registry</h3>
          </div>
          <p className="text-on-surface-variant/60 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Universal Identity Control & Permission Management</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchProfiles}
            className="p-4 bg-surface-container-low hover:bg-white rounded-2xl transition-all border border-transparent hover:border-outline-variant/30 hover:shadow-lg group/refresh"
          >
            <RefreshCcw className={`w-4 h-4 text-on-surface-variant group-hover/refresh:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <div className="px-6 py-4 bg-[#181f21] rounded-2xl">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Total Identities</p>
            <p className="text-xl font-black text-white leading-none">{profiles.length}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto relative z-10">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-outline-variant/20">
              <th className="pb-8 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 pl-4">Digital Identity</th>
              <th className="pb-8 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Authority Role</th>
              <th className="pb-8 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Network Status</th>
              <th className="pb-8 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 text-right pr-4">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            <AnimatePresence mode="popLayout">
              {profiles.map((profile, i) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.03 }}
                  key={profile.id} 
                  className="group hover:bg-surface-container-low/30 transition-all"
                >
                  <td className="py-8 pl-4 pr-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all ${profile.role === 'admin' ? 'bg-[#181f21] border-[#181f21] text-white' : 'bg-surface-container-low border-outline-variant/20 text-on-surface-variant/40 opacity-50'}`}>
                        {profile.role === 'admin' ? <Shield className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-black text-sm text-on-surface tracking-tight truncate max-w-[200px]">{profile.email}</div>
                        <div className="text-[10px] font-mono text-on-surface-variant/30 mt-1 uppercase tracking-widest">{profile.id.substring(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-8">
                    <button 
                      onClick={() => toggleAdmin(profile.id, profile.role)}
                      disabled={actionLoading === `role-${profile.id}`}
                      className={`
                        inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                        ${profile.role === 'admin' 
                          ? 'bg-secondary text-[#181f21] shadow-lg shadow-secondary/20' 
                          : 'bg-surface-container-high text-on-surface-variant/60 hover:bg-secondary/10 hover:text-secondary'
                        }
                      `}
                    >
                      {actionLoading === `role-${profile.id}` ? (
                        <RefreshCcw className="w-3 h-3 animate-spin" />
                      ) : (
                        <>
                          <Power className="w-3 h-3" />
                          {profile.role}
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-8">
                    <div className="flex items-center gap-3">
                      {profile.subscription_status === 'active' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-on-surface-variant/20" />
                      )}
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${profile.subscription_status === 'active' ? 'text-emerald-500' : 'text-on-surface-variant/30'}`}>
                        {profile.subscription_status}
                      </span>
                    </div>
                  </td>
                  <td className="py-8 pr-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => impersonate(profile.email)}
                        className="p-3 bg-surface-container-low hover:bg-[#181f21] hover:text-white rounded-xl transition-all group/btn border border-transparent hover:border-white/10"
                        title="Assume Identity"
                      >
                        <LogIn className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </button>
                      <button className="p-3 bg-surface-container-low hover:bg-surface-container-high rounded-xl transition-all">
                        <MoreVertical className="w-4 h-4 text-on-surface-variant/40" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {loading && profiles.length === 0 && (
        <div className="py-32 flex flex-col items-center justify-center gap-6 relative z-10">
          <div className="w-16 h-16 border-4 border-secondary/10 border-t-secondary rounded-full animate-spin"></div>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-secondary animate-pulse">Syncing Node Database...</p>
        </div>
      )}

      {!loading && profiles.length === 0 && (
        <div className="py-32 text-center relative z-10">
          <div className="w-20 h-20 bg-surface-container-low rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-on-surface-variant/20" />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/40 italic">Registry synchronization yielded vacuum results.</p>
        </div>
      )}
    </div>
  );
}
