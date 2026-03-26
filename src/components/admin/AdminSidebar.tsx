'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Settings2, 
  Heart, 
  ShieldCheck, 
  Zap,
  LucideIcon
} from 'lucide-react';

interface SidebarItem {
  name: string;
  icon: LucideIcon;
  href: string;
  active?: boolean;
}

export default function AdminSidebar() {
  const sidebarItems: SidebarItem[] = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin', active: true },
    { name: 'Subscriptions', icon: Users, href: '/admin' },
    { name: 'Draw Logic', icon: Settings2, href: '/admin' },
    { name: 'Charities', icon: Heart, href: '/impact' },
    { name: 'Verifications', icon: ShieldCheck, href: '/admin' },
  ];

  return (
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
  );
}
