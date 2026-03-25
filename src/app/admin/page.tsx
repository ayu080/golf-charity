'use client';

import Link from "next/link";
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Settings2, 
  Heart, 
  ShieldCheck, 
  Search, 
  TrendingUp, 
  Wallet, 
  Plus, 
  Edit3, 
  Check, 
  X,
  Zap,
  ChevronRight,
  Bell
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeUsers, setActiveUsers] = useState<number | null>(null);
  const [totalPrizePool, setTotalPrizePool] = useState(0);
  const [charityContributions, setCharityContributions] = useState(842100);
  const [members, setMembers] = useState<any[]>([]);
  const [verifications, setVerifications] = useState<any[]>([]);
  const [charities, setCharities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('subscription_status', 'active');
      setActiveUsers(usersCount);

      const { data: winnings } = await supabase
        .from('winnings')
        .select('amount');
      const pool = winnings?.reduce((sum, w) => sum + Number(w.amount), 0) || 0;
      setTotalPrizePool(pool);
      if (pool > 0) setCharityContributions(pool * 0.35);

      const { data: profiles } = await supabase
        .from('profiles')
        .select('first_name, last_name, subscription_status, scores(score)')
        .limit(10);
      setMembers(profiles || []);

      const { data: pending } = await supabase
        .from('winnings')
        .select('id, amount, proof_image_url, profiles(first_name, last_name)')
        .eq('status', 'pending');
      setVerifications(pending || []);

      const { data: charityPartners } = await supabase
        .from('charities')
        .select('*')
        .order('created_at', { ascending: false });
      setCharities(charityPartners || []);
      
      setLoading(false);
    }
    fetchData();
  }, [supabase]);

  const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin', active: true },
    { name: 'Subscriptions', icon: Users, href: '/admin' },
    { name: 'Draw Logic', icon: Settings2, href: '/admin' },
    { name: 'Charities', icon: Heart, href: '/impact' },
    { name: 'Verifications', icon: ShieldCheck, href: '/admin' },
  ];

  return (
    <div className="flex min-h-screen bg-surface selection:bg-secondary/20">
      {/* Sidebar */}
      <nav className="fixed left-0 top-0 h-screen w-72 silk-gradient text-white hidden md:flex flex-col z-50 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        
        <div className="px-10 py-12 relative z-10">
          <Link href="/">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-[#181f21] font-black text-xl tracking-tighter">FC</span>
              </div>
              <div>
                <h1 className="text-sm font-black tracking-[0.2em] uppercase leading-none">Philanthropy</h1>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50 mt-1">Ledger</p>
              </div>
            </motion.div>
          </Link>
        </div>

        <div className="flex-1 px-4 space-y-1 relative z-10 overflow-y-auto">
          {sidebarItems.map((item, i) => (
            <Link key={item.name} href={item.href}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`
                  flex items-center space-x-4 py-4 px-6 rounded-2xl transition-all duration-300 group
                  ${item.active 
                    ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${item.active ? 'text-secondary-fixed' : 'group-hover:scale-110 transition-transform'}`} />
                <span className="font-headline tracking-wider text-xs font-bold uppercase">{item.name}</span>
                {item.active && (
                  <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary-fixed shadow-[0_0_10px_rgba(173,205,195,0.8)]" />
                )}
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="p-8 relative z-10">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-inner group overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
              <Zap className="w-16 h-16 text-white" />
            </div>
            <p className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-2">System Status</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <p className="text-xs font-bold text-emerald-400">Operational</p>
            </div>
            <button className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-colors">
              Refresh Node
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <motion.div 
              whileHover={{ rotate: 180 }}
              className="p-2 hover:bg-surface-container-low rounded-xl cursor-pointer transition-colors"
            >
              <Zap className="w-5 h-5 text-on-surface-variant" />
            </motion.div>
            <h2 className="font-headline font-black text-2xl tracking-tight text-on-surface">The Orchestrator</h2>
          </div>

          <div className="flex items-center space-x-8">
            <div className="hidden lg:flex items-center space-x-8">
              {['Overview', 'Analytics', 'Audit'].map((tab, i) => (
                <Link key={tab} href="/admin" className={`
                   text-xs font-black uppercase tracking-[0.2em] transition-all relative group
                   ${i === 0 ? 'text-on-surface' : 'text-on-surface-variant/60 hover:text-on-surface'}
                `}>
                  {tab}
                  {i === 0 && <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-secondary rounded-full" />}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 border-l border-outline-variant/30 pl-8">
              <div className="p-2 hover:bg-surface-container-low rounded-xl cursor-pointer relative">
                <Bell className="w-5 h-5 text-on-surface-variant" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></div>
              </div>
              <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-secondary/20 shadow-lg hover:scale-105 transition-transform cursor-pointer">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLthnc6WHFLntGQbyF9pHVFo-Ygi6Yi7UgFxBl0ggReHntvU5XF-kYswcLzZy8AbttVE8UJ5_rHvZg8FwhLQTgUDsfMPhNEIujzpbThDBytEnN_U79gbKZrXQ6bvIbAMRSosDHxumad9Lvil1sk7-UV_MEAt4eUxa8OdVf2zu_AOLaCVYgFrbdj8K2ZXwiUrfWkbE7q8y6aY4TrySBCleryi1F670z2rVjXYl5ou-zjwY-8RlLeOhh2QqgwYzvE7EnuYFXYjGkkipP" alt="Admin" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-8 lg:p-12 space-y-12 max-w-[1600px] mx-auto w-full">
          {/* Stats Bar */}
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Member Ledger */}
              <section className="bg-white rounded-[2rem] ambient-shadow border border-outline-variant/20 overflow-hidden">
                <div className="p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <div>
                    <h4 className="text-3xl font-black tracking-tight text-on-surface mb-2">Member Ledger</h4>
                    <p className="text-on-surface-variant/70 font-medium italic">Synchronized subscription data from the network.</p>
                  </div>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 group-focus-within:text-secondary transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Search ledger..." 
                      className="bg-surface-container-low border-none rounded-2xl py-3 pl-12 pr-6 text-sm focus:ring-2 focus:ring-secondary/20 w-full sm:w-64 transition-all placeholder:text-on-surface-variant/30 font-bold"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-surface-container-lowest border-y border-outline-variant/10">
                        <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">Node Identifier</th>
                        <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">Authorization</th>
                        <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">Performance</th>
                        <th className="py-6 px-10 text-right text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">Registry</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/5">
                      {members.length > 0 ? members.map((m, i) => (
                        <tr key={i} className="group hover:bg-surface-container-low/50 transition-all duration-300">
                          <td className="py-8 px-10">
                            <div className="flex items-center space-x-5">
                              <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center font-black text-on-surface-variant text-sm border-2 border-outline-variant/20 group-hover:border-secondary/20 transition-colors">
                                {m.first_name?.[0]}{m.last_name?.[0]}
                              </div>
                              <div>
                                <p className="text-sm font-black text-on-surface group-hover:text-secondary transition-colors">{m.first_name} {m.last_name}</p>
                                <div className="flex items-center text-[10px] text-on-surface-variant/50 uppercase tracking-[0.1em] font-bold mt-1">
                                  <Zap className="w-3 h-3 mr-1 text-secondary opacity-50" />
                                  {m.subscription_status} Tier
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-8 px-10">
                            <span className={`
                              inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider
                              ${m.subscription_status === 'active' 
                                ? 'bg-secondary-container text-secondary border border-secondary/20' 
                                : 'bg-surface-container-highest text-on-surface-variant/60'
                              }
                            `}>
                              {m.subscription_status === 'active' && <Check className="w-3 h-3 mr-1.5" />}
                              {m.subscription_status}
                            </span>
                          </td>
                          <td className="py-8 px-10">
                            <div className="flex flex-col">
                              <span className="font-mono text-sm font-black text-on-surface">
                                {m.scores?.length > 0 ? (m.scores.reduce((s:any, c:any) => s + c.score, 0) / m.scores.length).toFixed(1) : '0.0'}
                              </span>
                              <div className="w-24 h-1 bg-surface-container-high rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-secondary rounded-full" style={{ width: '65%' }}></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-8 px-10 text-right">
                            <button className="p-3 bg-surface-container-low rounded-2xl text-on-surface-variant/60 hover:text-secondary hover:bg-secondary-container transition-all">
                              <Edit3 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan={4} className="py-20 text-center font-headline font-bold text-on-surface-variant/30 italic">No node connections detected.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Verification Queue */}
              <section className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-error/10 rounded-2xl flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-error" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black tracking-tight text-on-surface">Verification Queue</h4>
                      <p className="text-on-surface-variant/50 text-xs font-bold uppercase tracking-widest mt-1">Integrity Validation Required</p>
                    </div>
                  </div>
                  <div className="px-5 py-2 bg-error text-white text-[10px] font-black rounded-xl animate-pulse tracking-widest uppercase">
                    {verifications.length} Pending
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {verifications.length > 0 ? verifications.map((v, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-3xl p-6 ambient-shadow border border-outline-variant/20 flex flex-col space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center font-black">
                            {v.profiles?.first_name?.[0]}
                          </div>
                          <div>
                            <p className="text-sm font-black text-on-surface">{v.profiles?.first_name} {v.profiles?.last_name}</p>
                            <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mt-0.5">Applicant</p>
                          </div>
                        </div>
                        <p className="text-lg font-black text-secondary tracking-tighter">${v.amount}</p>
                      </div>

                      <div className="aspect-video rounded-2xl bg-surface-container-low overflow-hidden border border-outline-variant/10 relative group">
                        {v.proof_image_url ? (
                          <img src={v.proof_image_url} alt="Proof" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-on-surface-variant/20">
                            <Zap className="w-12 h-12" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                           <button className="px-6 py-2 bg-white rounded-full text-xs font-black uppercase tracking-widest text-[#181f21]">Audit Image</button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <button className="flex-1 py-4 bg-surface-container-high hover:bg-error/10 hover:text-error rounded-2xl transition-all text-[10px] font-black uppercase tracking-[0.2em]">Reject</button>
                        <button className="flex-1 py-4 bg-secondary text-white rounded-2xl shadow-lg shadow-secondary/20 transition-all text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02]">Authorize</button>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="col-span-2 py-16 bg-surface-container-low/30 rounded-3xl border-2 border-dashed border-outline-variant/20 flex flex-col items-center justify-center space-y-4">
                      <ShieldCheck className="w-12 h-12 text-on-surface-variant/20" />
                      <p className="text-on-surface-variant/40 font-headline font-bold text-lg italic">The network is fully synchronized.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-12">
              {/* Draw Center */}
              <section className="bg-[#181f21] text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors"></div>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-12">
                     <h4 className="text-xs font-black tracking-[0.3em] uppercase opacity-40">System Node</h4>
                     <Settings2 className="w-5 h-5 text-secondary-fixed shadow-[0_0_10px_rgba(173,205,195,0.5)]" />
                  </div>

                  <h3 className="text-3xl font-black tracking-tight mb-8">Draw <br /> Orchestration</h3>

                  <div className="space-y-10 mb-auto">
                    <div>
                      <p className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase mb-4">Architecture Selection</p>
                      <div className="grid grid-cols-2 gap-3 p-2 bg-white/5 rounded-2xl border border-white/5">
                        <button className="py-3 text-[10px] font-black uppercase tracking-widest bg-white/10 rounded-xl shadow-inner shadow-white/5">Random</button>
                        <button className="py-3 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">Algorithmic</button>
                      </div>
                    </div>

                    <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-sm relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-6 opacity-10">
                         <Zap className="w-12 h-12" />
                       </div>
                       <p className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase mb-2">Network Health</p>
                       <div className="flex items-center justify-between mb-8">
                         <span className="text-sm font-black text-secondary-fixed uppercase tracking-widest">Excellent</span>
                         <span className="text-[10px] font-medium opacity-50">v4.2.1-stable</span>
                       </div>
                       <button className="w-full py-5 border-2 border-white/10 hover:bg-white hover:text-[#181f21] rounded-2xl text-[10px] font-black tracking-[0.3em] uppercase transition-all">
                         Run Simulation
                       </button>
                    </div>
                  </div>

                  <button className="mt-12 w-full py-6 bg-secondary text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(70,100,92,0.3)] hover:translate-y-[-4px] active:translate-y-[2px] transition-all">
                    Release Broadcast
                  </button>
                </div>
              </section>

              {/* Charity Partners */}
              <section className="space-y-8">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-black tracking-tight text-on-surface">Benevolent Nodes</h4>
                  <button className="w-10 h-10 bg-surface-container-high hover:bg-secondary hover:text-white rounded-2xl flex items-center justify-center transition-all group">
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  </button>
                </div>

                <div className="space-y-4">
                  {charities.length > 0 ? charities.map((c, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 10 }}
                      className="bg-white p-6 rounded-3xl ambient-shadow border-l-4 border-secondary/30 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center space-x-5">
                        <div className="w-12 h-12 bg-secondary-container rounded-2xl flex items-center justify-center text-secondary font-black border-2 border-secondary/10">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-on-surface group-hover:text-secondary transition-colors">{c.name}</p>
                          <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest truncate max-w-[150px] mt-1">{c.description || 'Verified Partner'}</p>
                        </div>
                      </div>
                      <Edit3 className="w-4 h-4 text-on-surface-variant/20 group-hover:text-secondary transition-colors cursor-pointer" />
                    </motion.div>
                  )) : (
                    <div className="p-10 border-2 border-dashed border-outline-variant/20 rounded-3xl text-center">
                       <p className="text-on-surface-variant/30 font-medium text-sm italic">No partners initialized.</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Progress Trajectory */}
              <section className="bg-surface-container-low rounded-[2.5rem] p-10 border border-outline-variant/10">
                <p className="text-[10px] font-black tracking-[0.3em] text-on-surface-variant/40 uppercase mb-8 ml-2">Delta Trajectory</p>
                <div className="h-32 flex items-end space-x-3">
                  {[40, 65, 50, 85, 70, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.1, duration: 1 }}
                      className={`flex-1 rounded-t-xl ${i === 5 ? 'bg-secondary shadow-[0_0_20px_rgba(70,100,92,0.4)]' : 'bg-secondary/20 hover:bg-secondary/40'} transition-colors cursor-help group relative`}
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#181f21] text-white text-[10px] font-black py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                         {h}%
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
