'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import { Zap, Bell } from 'lucide-react';

export default function AdminHeader() {
  return (
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
  );
}
