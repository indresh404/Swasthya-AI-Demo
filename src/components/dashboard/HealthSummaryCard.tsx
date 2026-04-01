'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// Dynamic import for Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import aiPulse from '../../../public/animations/ai_pulse.json';

export default function HealthSummaryCard() {
  return (
    <div className="bg-[#0F2B5B] text-white p-8 rounded-[24px] h-full relative overflow-hidden flex flex-col shadow-2xl">
      {/* Background Pulse Animation */}
      <div className="absolute top-[-20%] right-[-10%] w-40 h-40 opacity-40">
        <Lottie animationData={aiPulse} loop={true} />
      </div>

      <div className="flex items-center mb-6">
        <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
          <Sparkles className="w-5 h-5 text-blue-400" />
        </div>
        <h3 className="text-xl font-bold font-display">AI Health Analysis</h3>
      </div>

      <div className="flex-1 space-y-4">
        <p className="text-blue-100/90 leading-relaxed text-sm">
          Your cardiovascular markers have been <span className="text-blue-300 font-semibold">stable</span> this week. 
          Lower back pain flagged on 3 consecutive days — monitoring recommended.
        </p>
        <p className="text-blue-100/90 leading-relaxed text-sm">
          Medicine adherence at <span className="text-green-400 font-semibold">85%</span> — improve consistency for better outcomes.
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-blue-300 font-bold">✦ Swasthya AI Engine 4.0</span>
        <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all border border-white/10">
          View Detailed report
        </button>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/40 to-transparent pointer-events-none" />
    </div>
  );
}
