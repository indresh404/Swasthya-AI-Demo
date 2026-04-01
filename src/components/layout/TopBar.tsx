'use client'

import React from 'react';
import { Bell, Activity } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full bg-surface-light px-4 md:px-8 flex items-center justify-between h-[72px] shrink-0 border-b border-surface-container shadow-sm shadow-primary/5">
      
      {/* Brand & Logo */}
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveSection('dashboard')}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg border-2 border-white/50 group-hover:rotate-6 transition-transform">
          <span className="font-headline font-extrabold text-white text-xl">S</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5">
          <span className="font-headline font-bold text-on-surface text-xl tracking-tight">Health Intelligence</span>
        </div>
      </div>

      {/* Desktop Navigation (Hidden on Mobile) */}
      <nav className="hidden md:flex items-center gap-1 bg-surface-container p-1 rounded-2xl border border-outline-variant/30">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`relative px-5 py-2 rounded-[14px] text-sm font-bold transition-all duration-300 ${
                isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="desktop-nav-indicator"
                  className="absolute inset-0 bg-white rounded-[14px] shadow-sm"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 md:gap-4">
        
        {/* Body Map Button */}
        <button
          onClick={() => setBodyMapOpen(true)}
          className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-2 bg-inverse-surface rounded-2xl hover:bg-black transition-all shadow-md group border border-outline-variant/20"
        >
          <Activity size={16} className="text-secondary group-hover:animate-pulse" strokeWidth={3} />
          <span className="hidden md:inline text-[11px] font-bold text-white tracking-widest uppercase font-label">3D Map</span>
        </button>

        {/* Sync Status (Mobile) */}
        <div className="flex md:hidden items-center gap-1.5 bg-surface-container px-3 py-1.5 rounded-full border border-surface-container-highest shadow-sm text-primary">
          <span className="font-body font-bold text-[11px] uppercase tracking-wider">{NAV_ITEMS.find(i => i.id === activeSection)?.label || 'Dashboard'}</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant bg-surface-container-low border border-surface-container shadow-sm active:scale-95">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface-container-lowest pointer-events-none animate-pulse"></span>
        </button>

        {/* User Mini Profile */}
        <button onClick={() => setActiveSection('profile')} className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary-fixed shadow-sm cursor-pointer hover:scale-105 transition-transform overflow-hidden">
          <img 
            alt="User" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5faYP5IVxwwHk_tG1QErOIFrpcTv8UKonvmQfG6S5BkQUASZ13wGkeySUofOqTDZGxjJLuPR79AoGXXEC9syWG22nitNQ0obZurc878f5RLIaFviBhBd_3h1NBhLHVW7D4Yk1JpzCg281NG3_FeIV3-0cbc831mfj6sy4iV08rdonCzcmnVMf_3lErj4NkHrK3DbsLZ8Hy1QnmGxAFt_Q_Nf62H3F_cXHozgvXCANKtkkyMKznlriqnq12nVByN8YyGBu9gm1iII" 
          />
        </button>

      </div>
    </header>
  );
}
