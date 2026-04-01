'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  MessageSquare, 
  Pill, 
  User, 
  Heart,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useSection } from '@/hooks/useSection';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard' },
  { id: 'checkin', icon: MessageSquare, label: 'Daily Check-in' },
  { id: 'medicine', icon: Pill, label: 'Medicines' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const { activeSection, setActiveSection, setBodyMapOpen } = useSection();

  return (
    <motion.aside
      className="fixed left-0 top-0 h-full bg-white border-r border-blue-100 z-40 transition-all duration-300 ease-in-out shadow-lg"
      style={{ width: isHovered ? '220px' : '80px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full py-6 px-4">
        {/* Logo */}
        <div className={cn("flex items-center mb-10 overflow-hidden px-2", isHovered ? "justify-start" : "justify-center")}>
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Heart className="text-white w-5 h-5" fill="white" />
          </div>
          {isHovered && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-3 font-bold text-blue-900 whitespace-nowrap text-lg"
            >
              Swasthya AI
            </motion.span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as any)}
              className={cn(
                "w-full flex items-center py-3 rounded-xl transition-all duration-200 group relative",
                activeSection === item.id 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-blue-500",
                !isHovered && "justify-center"
              )}
            >
              <item.icon className={cn("w-6 h-6 flex-shrink-0", activeSection === item.id ? "text-blue-600" : "group-hover:text-blue-500")} />
              {isHovered && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-4 font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
              {activeSection === item.id && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute left-[-16px] w-1.5 h-8 bg-blue-600 rounded-r-full"
                />
              )}
            </button>
          ))}
        </nav>

        {/* Big Circle Body Map Button */}
        <div className="flex flex-col items-center justify-center mb-6">
          <button
            onClick={() => setBodyMapOpen(true)}
            className={cn(
              "relative bg-slate-900 text-white rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] group overflow-hidden",
              isHovered ? "w-44 h-14" : "w-14 h-14"
            )}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            
            <div className={cn("flex items-center", isHovered ? "justify-start pl-4" : "justify-center")}>
              <div className="relative">
                 <div className="absolute inset-0 bg-blue-400 blur-md opacity-40 animate-pulse" />
                 <Heart className="w-6 h-6 text-white relative z-10" fill="white" />
              </div>
              {isHovered && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-3 font-semibold whitespace-nowrap text-sm tracking-wide uppercase"
                >
                  Body Map
                </motion.span>
              )}
            </div>
          </button>
        </div>

        {/* Footer */}
        <button className={cn(
          "flex items-center py-3 text-slate-400 hover:text-red-500 transition-colors px-2",
          !isHovered && "justify-center"
        )}>
          <LogOut className="w-6 h-6 flex-shrink-0" />
          {isHovered && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-4 font-medium"
            >
              Sign Out
            </motion.span>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
