'use client'

import React from 'react';
import { Bell, Activity, ScanFace, LogOut } from 'lucide-react';
import { Section } from '@/hooks/useSection';
import { motion } from 'framer-motion';

interface TopBarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  setBodyMapOpen: (open: boolean) => void;
}

const NAV_ITEMS = [
  { id: 'dashboard' as Section, label: 'Dashboard' },
  { id: 'checkin' as Section, label: 'Daily Check-in' },
  { id: 'medicine' as Section, label: 'Medicines' },
  { id: 'profile' as Section, label: 'Profile' },
];

export default function TopBar({ activeSection, setActiveSection, setBodyMapOpen }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-xl px-4 md:px-10 flex items-center justify-between h-[84px] shrink-0 border-b border-surface-container/50 shadow-md overflow-hidden">
      
      {/* Brand & Logo */}
      <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setActiveSection('dashboard')}>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-xl border-2 border-white/50 group-hover:rotate-6 transition-transform group-hover:scale-105 duration-500">
          <ScanFace size={24} className="text-white" />
        </div>
        <div className="hidden md:flex flex-col">
          <span className="font-headline font-extrabold text-on-surface text-xl tracking-tight leading-none">Swasthya <span className="text-primary truncate font-bold">A.I.</span></span>
          <span className="text-[10px] font-bold text-outline uppercase tracking-[0.4em] mt-1">Suresh Medical Core</span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-2 bg-surface-container-low p-1.5 rounded-2xl border border-surface-container shadow-inner">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`relative px-6 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
                isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary active:scale-95'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="desktop-nav-indicator"
                  className="absolute inset-0 bg-white rounded-xl shadow-md border border-surface-container"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 md:gap-6">
        
        {/* Dynamic Section Indicator (Mobile) */}
        <div className="lg:hidden flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
           <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
           <span className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none">
             {NAV_ITEMS.find(i => i.id === activeSection)?.label || 'Menu'}
           </span>
        </div>

        {/* Sync Status Banner */}
        <div className="hidden xl:flex items-center gap-2.5 px-4 py-2 bg-on-surface text-white rounded-2xl shadow-xl transition-all hover:bg-black group cursor-default border border-white/10">
           <Activity size={16} className="text-secondary animate-pulse" />
           <div className="flex flex-col">
              <span className="text-[9px] font-bold text-outline uppercase tracking-wider leading-none">H.R.M. Sync</span>
              <span className="text-[10px] font-extrabold tracking-widest text-secondary mt-0.5 group-hover:text-white">OPTIMIZED</span>
           </div>
        </div>

        <div className="h-8 w-[1px] bg-surface-container-high hidden md:block" />

        {/* Notifications */}
        <button className="relative p-3 rounded-2xl hover:bg-surface-container transition-all text-on-surface-variant bg-white border border-surface-container shadow-sm active:scale-90 group">
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-white pointer-events-none animate-bounce" />
        </button>

        {/* User Profile */}
        <button 
           onClick={() => setActiveSection('profile')}
           className="flex items-center gap-3 group pl-2 py-1 rounded-2xl hover:bg-surface-container-low transition-all"
        >
          <div className="hidden sm:flex flex-col items-end">
             <span className="text-xs font-extrabold text-on-surface leading-none group-hover:text-primary transition-colors">Indresh S.</span>
             <span className="text-[9px] font-bold text-outline uppercase tracking-widest mt-1">Age 19</span>
          </div>
          <div className="w-12 h-12 rounded-2xl border-2 border-white shadow-xl cursor-pointer hover:rotate-2 transition-all overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary duration-300">
            <img 
              alt="User" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5faYP5IVxwwHk_tG1QErOIFrpcTv8UKonvmQfG6S5BkQUASZ13wGkeySUofOqTDZGxjJLuPR79AoGXXEC9syWG22nitNQ0obZurc878f5RLIaFviBhBd_3h1NBhLHVW7D4Yk1JpzCg281NG3_FeIV3-0cbc831mfj6sy4iV08rdonCzcmnVMf_3lErj4NkHrK3DbsLZ8Hy1QnmGxAFt_Q_Nf62H3F_cXHozgvXCANKtkkyMKznlriqnq12nVByN8YyGBu9gm1iII" 
            />
          </div>
        </button>

      </div>
    </header>
  );
}
