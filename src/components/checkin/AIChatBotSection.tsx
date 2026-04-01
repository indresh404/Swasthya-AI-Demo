'use client'

import React from 'react';
import { motion } from 'framer-motion';
import AIChatBot from '@/components/checkin/AIChatBot';
import { Bot, Sparkles, ShieldCheck } from 'lucide-react';

export default function AIChatBotSection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="h-full flex flex-col max-w-4xl mx-auto"
    >
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 px-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-primary/10 p-1.5 rounded-lg border border-primary/20">
              <Sparkles size={16} className="text-primary" />
            </div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Next-Gen Diagnostics</span>
          </div>
          <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-on-surface tracking-tight">
            Swasthya <span className="text-primary">Intelligence Hub</span>
          </h2>
          <p className="font-body font-medium text-on-surface-variant mt-2 max-w-xl">
            Our AI-powered interactive diagnostic system analyzes your real-time vitals and historical trends to provide clinical follow-ups.
          </p>
        </div>
        
        <div className="hidden md:flex items-center gap-3 bg-surface-container-low p-3 rounded-2xl border border-surface-container shadow-sm self-start">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
               <div key={i} className="w-8 h-8 rounded-full border-2 border-surface-container-low bg-primary/10 flex items-center justify-center">
                 <Bot size={14} className="text-primary" />
               </div>
            ))}
          </div>
          <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
            Processing Vitals...
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-surface-container-low/30 rounded-[2rem] p-2 md:p-4 border border-surface-container shadow-inner">
        <AIChatBot />
      </div>

      <div className="mt-4 px-6 flex items-center justify-center gap-6 text-outline pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-secondary" />
          <span className="text-[10px] font-bold uppercase tracking-widest">HiPAA Compliant</span>
        </div>
        <div className="w-[1px] h-3 bg-surface-container" />
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Real-time Analysis</span>
        </div>
      </div>
    </motion.div>
  );
}
