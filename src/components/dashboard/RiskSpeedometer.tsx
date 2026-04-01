'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { mockPatient } from '@/data/mockPatient';

export default function RiskSpeedometer() {
  const [needleRotation, setNeedleRotation] = useState(-90);
  const score = mockPatient.riskScore;
  
  // Map 0-100 to -90 to 90 degrees
  const targetRotation = (score / 100) * 180 - 90;

  useEffect(() => {
    const timer = setTimeout(() => {
      setNeedleRotation(targetRotation);
    }, 500);
    return () => clearTimeout(timer);
  }, [targetRotation]);

  const getRiskColor = (val: number) => {
    if (val <= 40) return '#10B981'; // green
    if (val <= 70) return '#EAB308'; // yellow
    if (val <= 85) return '#F97316'; // orange
    return '#EF4444'; // red
  };

  const getRiskLabel = (val: number) => {
    if (val <= 40) return 'Low Risk';
    if (val <= 70) return 'Moderate Risk';
    if (val <= 85) return 'High Risk';
    return 'Critical Risk';
  };

  return (
    <div className="glass-card p-8 h-full flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-6 left-6 flex flex-col">
        <h3 className="text-slate-500 text-sm font-medium">Health Risk Score</h3>
        <p className="text-slate-400 text-xs mt-1">Updated today · Apr 1, 2026</p>
      </div>

      <div className="relative w-64 h-32 mt-10">
        {/* Gauge Arc Background */}
        <svg viewBox="0 0 100 50" className="w-full">
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#DBEAFE"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Active Progress Arc */}
          <motion.path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke={getRiskColor(score)}
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ strokeDasharray: '0, 200' }}
            animate={{ strokeDasharray: `${(score / 100) * 126}, 200` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>

        {/* Needle */}
        <motion.div
          className="absolute bottom-0 left-1/2 w-1 h-24 bg-slate-800 origin-bottom rounded-full"
          style={{ x: '-50%', bottom: '2px' }}
          initial={{ rotate: -90 }}
          animate={{ rotate: needleRotation }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rounded-full shadow-lg" />
        </motion.div>
        
        {/* Center Point */}
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-4 border-slate-800 rounded-full" />
      </div>

      <div className="mt-8 text-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-6xl font-bold text-blue-900 block"
        >
          {score}
        </motion.span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xl font-semibold mt-2 block"
          style={{ color: getRiskColor(score) }}
        >
          {getRiskLabel(score)}
        </motion.span>
      </div>

      {/* Decorative details */}
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>
    </div>
  );
}
