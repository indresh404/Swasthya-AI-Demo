'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ShieldAlert, CheckCircle2, AlertTriangle, ChevronDown, Activity, Database, Brain } from 'lucide-react';

interface RiskScoreProps {
  score: number;
}

export default function SemiCircularRiskScore({ score }: RiskScoreProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  // SVG Constants
  const size = 240;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = Math.PI * radius; // Half circle

  // Calculate percentage (0 to 1)
  const percentage = score / 100;
  const strokeDashoffset = circumference * (1 - percentage);

  const getRiskData = (s: number) => {
    if (s < 30) return { label: 'LOW', color: '#10b981', icon: CheckCircle2, desc: 'Optimal health stability detected.' };
    if (s < 60) return { label: 'MODERATE', color: '#f59e0b', icon: Info, desc: 'Standard monitoring required.' };
    if (s < 85) return { label: 'ELEVATED', color: '#f97316', icon: AlertTriangle, desc: 'Clinical attention recommended.' };
    return { label: 'HIGH', color: '#ef4444', icon: ShieldAlert, desc: 'Immediate medical review required.' };
  };

  const risk = getRiskData(score);

  return (
    <section className="bg-surface-container-lowest rounded-[2.5rem] p-8 shadow-xl border border-surface-container overflow-hidden relative group">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Side: The Ring */}
        <div className="relative flex flex-col items-center">
          <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
            <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`}>
              <defs>
                <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />   {/* Green */}
                  <stop offset="50%" stopColor="#f59e0b" />  {/* Yellow */}
                  <stop offset="100%" stopColor="#ef4444" /> {/* Red */}
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Background Track */}
              <path
                d={`M ${strokeWidth/2},${size/2} A ${radius},${radius} 0 0,1 ${size - strokeWidth/2},${size/2}`}
                fill="none"
                stroke="var(--color-surface-container-high)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />

              {/* Progress Ring */}
              <motion.path
                d={`M ${strokeWidth/2},${size/2} A ${radius},${radius} 0 0,1 ${size - strokeWidth/2},${size/2}`}
                fill="none"
                stroke="url(#riskGradient)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 2, ease: "circOut", delay: 0.5 }}
                filter="url(#glow)"
              />
            </svg>

            {/* Score Text Overlay */}
            <div className="absolute inset-x-0 bottom-4 flex flex-col items-center">
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8, type: 'spring' }}
                className="text-6xl font-headline font-extrabold text-on-surface tracking-tighter"
              >
                {score}
              </motion.span>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full border border-outline-variant/30 mt-1">
                <risk.icon size={12} style={{ color: risk.color }} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: risk.color }}>
                  {risk.label}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-on-surface-variant font-medium text-xs mt-4 text-center max-w-[180px]">
            {risk.desc}
          </p>
        </div>

        {/* Right Side: Clinical Logic Breakdown */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-bold text-outline uppercase tracking-[0.2em] flex items-center gap-2">
               <Brain size={14} className="text-primary" />
               Clinical Intelligence
            </h3>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 rounded-xl hover:bg-surface-container-high transition-colors"
            >
              <ChevronDown size={18} className={`text-outline transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2">
             <LogicCard 
                icon={Activity} 
                title="Biological Baseline" 
                value="88%" 
                label="Stable"
                color="text-green-500"
                delay={0.6}
             />
             <LogicCard 
                icon={Database} 
                title="RAG Analysis (ICMR)" 
                value="-12.4" 
                label="Weighted Adjustment"
                color="text-amber-500"
                delay={0.7}
             />
             <LogicCard 
                icon={ShieldAlert} 
                title="Confidence Level" 
                value="94.2%" 
                label="High Precision"
                color="text-primary"
                delay={0.8}
             />
          </div>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-surface-container-high/50 rounded-2xl p-4 mt-2 border border-surface-container border-dashed"
              >
                <h4 className="text-[10px] font-bold text-on-surface uppercase mb-2">AI Reasoning Summary</h4>
                <p className="text-[11px] leading-relaxed text-on-surface-variant font-medium">
                  The risk engine detected a persistent elevation in night-time HRV variability (+15%) combined with reported fatigue. Standard weighted rules flagged a moderate metabolic stressor. No immediate acute risk, but preventive check-in suggested.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function LogicCard({ icon: Icon, title, value, label, color, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="bg-surface-container-low p-3 rounded-2xl border border-surface-container flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-surface-container">
           <Icon size={16} className="text-on-surface-variant" />
        </div>
        <div>
          <h4 className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-wider">{title}</h4>
          <p className="text-[10px] font-medium text-outline">{label}</p>
        </div>
      </div>
      <div className={`text-xs font-black font-mono ${color}`}>{value}</div>
    </motion.div>
  );
}
