'use client'

import React from 'react';
import { Home, MessageSquare, Bot, Pill, User } from 'lucide-react';
import { Section } from '@/hooks/useSection';
import { motion } from 'framer-motion';

interface BottomBarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export default function BottomBar({ activeSection, setActiveSection }: BottomBarProps) {
  const items: { id: Section | 'ai'; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'checkin', label: 'Check-in', icon: MessageSquare },
    { id: 'ai', label: 'AI Hub', icon: Bot },
    { id: 'medicine', label: 'Meds', icon: Pill },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 w-[min(95vw,420px)] pb-safe outline-none">
      <div className="bg-primary shadow-[0_8px_40px_rgba(0,83,219,0.3)] border border-primary-container rounded-[2rem] h-[72px] flex items-center justify-between px-4 relative">
        
        {/* Active Indicator Glow */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white opacity-20" />

        {items.map((item) => {
          const isActive = activeSection === item.id || (item.id === 'ai' && activeSection === 'aichat');
          
          if (item.id === 'ai') {
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection('aichat' as Section)}
                className="relative -top-8 group flex flex-col items-center"
              >
                <motion.div 
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-primary shadow-2xl border-4 border-primary transition-all relative"
                >
                   <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                   <Bot size={28} className="relative z-10" />
                </motion.div>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)}
              className={`flex flex-col items-center justify-center w-14 h-full transition-all duration-300 relative ${
                isActive ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-[6px] bg-white/10 rounded-2xl"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon 
                size={22} 
                className={`transition-all duration-300 relative z-10 ${isActive ? 'mb-1 scale-110' : 'mb-0.5'}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[9px] font-extrabold uppercase tracking-widest relative z-10 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
