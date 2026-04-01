'use client'

import React from 'react';
import { Home, MessageSquare, Bot, Pill, User } from 'lucide-react';
import { Section } from '@/hooks/useSection';

interface BottomBarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export default function BottomBar({ activeSection, setActiveSection }: BottomBarProps) {
  const items: { id: Section | 'ai'; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'checkin', label: 'Check-in', icon: MessageSquare },
    { id: 'ai', label: 'AI Check-in', icon: Bot },
    { id: 'medicine', label: 'Meds', icon: Pill },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 px-4 w-[min(95vw,420px)] pb-safe outline-none">
      <div className="bg-surface-container-lowest/90 backdrop-blur-xl border border-surface-container rounded-full h-[68px] flex items-center justify-between px-3 shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
        {items.map((item) => {
          const isActive = activeSection === item.id || (item.id === 'ai' && activeSection === 'aichat');
          
          if (item.id === 'ai') {
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection('aichat' as Section)}
                className="relative -top-7 group flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white shadow-[0_8px_32px_rgba(0,74,198,0.4)] border-[5px] border-surface-container-lowest group-hover:scale-105 transition-transform overflow-hidden relative">
                   <div className="absolute inset-0 bg-white/20 animate-pulse" />
                   <Bot size={28} className="relative z-10" />
                </div>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)}
              className={`flex flex-col items-center justify-center w-14 h-full transition-all duration-300 ${
                isActive ? 'text-primary' : 'text-outline hover:text-primary'
              }`}
            >
              <item.icon 
                size={22} 
                className={`transition-all duration-300 ${isActive ? 'mb-1 drop-shadow-sm' : 'mb-0.5 opacity-80'}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
