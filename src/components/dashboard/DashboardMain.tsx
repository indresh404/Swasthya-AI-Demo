'use client'

import React from 'react';
import { motion } from 'framer-motion';
import HealthSummaryCard from './HealthSummaryCard';
import RiskSpeedometer from './RiskSpeedometer';
import AIClinicalInsights from './AIClinicalInsights';
import { SymptomMap, SystemGrid } from './SystemGrid';
import LiveVitalsChart from './LiveVitalsChart';
import RiskTrendChart from './RiskTrendChart';
import WatchAnalyticsRow from './WatchAnalyticsRow';
import SleepCycleChart from './SleepCycleChart';
import SchemesBanner from './SchemesBanner';
import { patient } from '@/data/mockPatient';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

interface DashboardMainProps {
  onBodyMapOpen: () => void;
}

export default function DashboardMain({ onBodyMapOpen }: DashboardMainProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="max-w-[1200px] mx-auto space-y-10 pb-24 px-4 md:px-0"
    >
      <header className="mb-4 pt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
             <div className="bg-primary/10 p-1.5 rounded-lg border border-primary/20">
               <ShieldCheck size={16} className="text-primary" />
             </div>
             <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Clinical Health ID: #SW-9431</span>
           </div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="font-headline font-extrabold text-3xl md:text-5xl text-on-surface tracking-tight"
          >
            Stay fit, <span className="text-primary">{patient.name.split(' ')[0]}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body font-medium text-on-surface-variant mt-2 max-w-xl"
          >
            Your health intelligence is synced from your smart watch and latest clinical check-ins.
          </motion.p>
        </div>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onBodyMapOpen}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-3xl shadow-2xl border border-white/10 hover:border-primary/50 transition-all group min-w-[240px] justify-center"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
             <Activity size={20} className="text-secondary animate-pulse" />
          </div>
          <div className="text-left">
            <span className="block text-[10px] font-bold text-outline uppercase tracking-widest leading-none mb-1">Interactive Diagnostic</span>
            <span className="block font-headline font-extrabold text-sm tracking-wide">3D Body Heat Map</span>
          </div>
        </motion.button>
      </header>

      {/* 0. Smart Watch Metrics (New) */}
      <section>
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-[11px] font-extrabold text-outline uppercase tracking-[0.3em] flex items-center gap-2">
               <Zap size={14} className="text-secondary" />
               Smart Watch Intelligence
            </h3>
            <div className="h-[1px] flex-1 mx-6 bg-surface-container" />
            <span className="text-[10px] font-bold text-secondary">LIVE SYNC</span>
         </div>
         <WatchAnalyticsRow />
      </section>
      
      {/* 1. Risk Score & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <RiskSpeedometer score={67} />
        </div>
        <div className="lg:col-span-8">
          <AIClinicalInsights />
        </div>
      </div>

      {/* 2. Symptom Mapping & Health Index Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <SymptomMap />
        </div>
        <div className="lg:col-span-7">
          <SystemGrid />
        </div>
      </div>

      {/* 3. Sleep & Recovery (New Analytics) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <SleepCycleChart />
        </div>
        <div className="lg:col-span-5 h-full">
           <HealthSummaryCard />
        </div>
      </div>

      {/* 4. Vitals & Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <LiveVitalsChart />
        </div>
        <div className="lg:col-span-4">
          <RiskTrendChart />
        </div>
      </div>

      <SchemesBanner />
    </motion.div>
  );
}
