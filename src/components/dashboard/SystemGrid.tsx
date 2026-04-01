'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Wind, Utensils } from 'lucide-react';

export function SymptomMap() {
  return (
    <section className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col items-center border border-surface-container h-full">
      <h4 className="w-full text-left font-label font-bold text-[10px] uppercase tracking-wider text-on-surface-variant mb-6">
        Symptom Map
      </h4>
      <div className="relative flex-grow flex items-center justify-center py-4 w-full h-[180px]">
        {/* Simple body silhouette placeholder */}
        <div className="w-24 h-48 bg-slate-100 rounded-full opacity-20 relative border-2 border-slate-200">
          {/* Head */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-100 rounded-full border-2 border-slate-200" />
          {/* Thorax */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-16 h-20 bg-slate-100 rounded-2xl border-2 border-slate-200" />
          {/* Arms */}
          <div className="absolute top-12 left-0 w-2 h-20 bg-slate-100 rounded-full -translate-x-full border-2 border-slate-200" />
          <div className="absolute top-12 right-0 w-2 h-20 bg-slate-100 rounded-full translate-x-full border-2 border-slate-200" />
          {/* Legs */}
          <div className="absolute bottom-0 left-2 w-6 h-24 bg-slate-100 rounded-full translate-y-1/2 border-2 border-slate-200" />
          <div className="absolute bottom-0 right-2 w-6 h-24 bg-slate-100 rounded-full translate-y-1/2 border-2 border-slate-200" />
        </div>

        {/* Hotspots */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
        </div>
        <div className="absolute top-[50%] left-[45%] w-4 h-4 bg-yellow-400/20 rounded-full flex items-center justify-center animate-bounce">
          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div>
        </div>
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center animate-pulse duration-1000">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        </div>
      </div>
      <p className="text-[11px] text-center text-on-surface-variant mt-4 font-bold tracking-tight bg-surface-container px-3 py-1 rounded-full">
        Chest & Lower Back Focused
      </p>
    </section>
  );
}

const SYSTEM_DATA = [
  { name: 'Brain & Neuro', score: 82, status: 'Stable', icon: Brain, color: 'secondary' },
  { name: 'Heart & Cardiac', score: 71, status: 'Watch', icon: Heart, color: 'error' },
  { name: 'Pulmonary', score: 88, status: 'Stable', icon: Wind, color: 'secondary' },
  { name: 'Digestive', score: 63, status: 'Monitor', icon: Utensils, color: 'tertiary' },
];

export function SystemGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {SYSTEM_DATA.map((item, idx) => (
        <motion.div 
          key={item.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ y: -2 }}
          className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-container flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center mb-1">
            <item.icon size={20} className={item.color === 'error' ? 'text-error' : item.color === 'tertiary' ? 'text-tertiary' : 'text-primary'} />
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
              item.status === 'Stable' 
                ? 'bg-secondary/10 text-secondary' 
                : item.status === 'Watch' 
                  ? 'bg-error/10 text-error' 
                  : 'bg-tertiary/10 text-tertiary'
            }`}>
              {item.status}
            </span>
          </div>
          <div>
            <p className="text-[11px] font-bold text-on-surface-variant mb-1">{item.name}</p>
            <p className="font-mono text-xl font-bold text-on-surface">{item.score}</p>
            <div className="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                className={`h-full rounded-full ${
                  item.status === 'Stable' 
                    ? 'bg-secondary shadow-[0_0_8px_rgba(0,108,73,0.3)]' 
                    : item.status === 'Watch' 
                      ? 'bg-error shadow-[0_0_8px_rgba(186,26,26,0.3)]' 
                      : 'bg-tertiary shadow-[0_0_8px_rgba(61,84,134,0.3)]'
                }`}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
