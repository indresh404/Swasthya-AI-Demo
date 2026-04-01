'use client'

import React from 'react';
import { motion } from 'framer-motion';

interface RiskSpeedometerProps {
  score: number;
}

export default function RiskSpeedometer({ score }: RiskSpeedometerProps) {
  // SVG Path constants for a semi-circle
  // Radius = 40, Center = (50, 50)
  // M 10 50 A 40 40 0 0 1 90 50
  
  // Total length of the arc (C = 2 * pi * r)
  // Half circumference = pi * 40 approx 125.66
  const totalLength = 125.66;
  
  // Calculate offset based on score (0 to 100)
  // 100 score = 0 offset (full stroke)
  // 0 score = totalLength offset (no stroke)
  const arcOffset = totalLength - (score / 100) * totalLength;

  const getRiskLabel = (s: number) => {
    if (s < 40) return 'Low Risk';
    if (s < 70) return 'Moderate Risk';
    if (s < 85) return 'Elevated Risk';
    return 'High Risk';
  };

  return (
    <section className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col items-center border border-surface-container h-full">
      <h2 className="w-full text-left font-headline font-bold text-on-surface-variant text-sm uppercase tracking-wider mb-2">
        Aggregate Risk Score
      </h2>
      
      <div className="relative w-64 h-32 overflow-hidden mt-4">
        {/* Semicircle SVG Gauge */}
        <svg className="w-full h-full" viewBox="0 0 100 50">
          {/* Background Track */}
          <path 
            d="M 10 50 A 40 40 0 0 1 90 50" 
            fill="none" 
            stroke="var(--color-surface-container)" 
            strokeLinecap="round" 
            strokeWidth="8"
          />
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-primary-container)" />
              <stop offset="100%" stopColor="var(--color-primary)" />
            </linearGradient>
          </defs>

          {/* Animated Progress Path */}
          <motion.path 
            d="M 10 50 A 40 40 0 0 1 90 50" 
            fill="none" 
            stroke="url(#gauge-gradient)" 
            strokeDasharray={totalLength}
            initial={{ strokeDashoffset: totalLength }}
            animate={{ strokeDashoffset: arcOffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            strokeLinecap="round" 
            strokeWidth="10"
          />
        </svg>

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center translate-y-1">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="font-mono text-5xl font-bold text-on-surface leading-none"
          >
            {score}
          </motion.span>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="font-label text-[10px] font-bold text-primary tracking-widest uppercase mt-2"
          >
            {getRiskLabel(score)}
          </motion.span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 bg-secondary-container/30 px-4 py-1.5 rounded-full border border-secondary-container/20 shadow-sm">
        <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
        <span className="text-[11px] font-bold text-on-secondary-container">+4 pts from last week</span>
      </div>
    </section>
  );
}
