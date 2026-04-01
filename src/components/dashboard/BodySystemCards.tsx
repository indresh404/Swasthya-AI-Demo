'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { mockPatient } from '@/data/mockPatient';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const systems = [
  { id: 'brain', name: 'Brain Health', icon: '🧠', key: 'brain' },
  { id: 'heart', name: 'Cardiac System', icon: '❤️', key: 'heart' },
  { id: 'lungs', name: 'Pulmonary Health', icon: '🫁', key: 'lungs' },
  { id: 'digestive', name: 'Digestive Health', icon: '🫀', key: 'digestive' },
];

export default function BodySystemCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {systems.map((system) => {
        const score = mockPatient.healthIndices[system.key as keyof typeof mockPatient.healthIndices];
        const status = score > 80 ? 'Good' : score > 70 ? 'Monitor' : 'At Risk';
        const colorClass = score > 80 ? 'text-green-500' : score > 70 ? 'text-yellow-500' : 'text-orange-500';
        const bgClass = score > 80 ? 'bg-green-500' : score > 70 ? 'bg-yellow-500' : 'bg-orange-500';

        return (
          <motion.div
            key={system.id}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-card p-5 relative group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                {system.icon}
              </div>
              <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50", colorClass)}>
                {status}
              </span>
            </div>
            
            <h4 className="text-slate-800 font-bold text-sm mb-1">{system.name}</h4>
            <div className="flex items-baseline mb-3">
               <span className="text-2xl font-bold font-mono text-blue-900">{score}</span>
               <span className="text-xs text-slate-400 font-medium ml-1">/100</span>
            </div>

            <div className="w-full h-1.5 bg-blue-50 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${score}%` }}
                 transition={{ duration: 1, ease: 'easeOut' }}
                 className={cn("h-full rounded-full shadow-inner", bgClass)}
               />
            </div>

            <div className="mt-3 flex items-center text-[10px] text-slate-400 font-medium group-hover:text-blue-500 transition-colors">
              View Detailed Analysis →
            </div>
            
            {/* Background pattern */}
            <div className="absolute bottom-0 right-0 p-2 opacity-5">
               <svg width="40" height="40" viewBox="0 0 40 40">
                  <path d="M0 0h40v40H0z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
               </svg>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
