'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Footprints, Flame, Zap, Activity } from 'lucide-react';

export default function WatchAnalyticsRow() {
  const stats = [
    { label: 'Daily Steps', value: '8,432', target: '10k', icon: Footprints, color: 'primary', progress: 84 },
    { label: 'Active Calories', value: '420', target: '600', icon: Flame, color: 'secondary', progress: 70 },
    { label: 'HRV (Recovery)', value: '64ms', target: 'High', icon: Activity, color: 'secondary', progress: 64 },
    { label: 'Energy Burn', value: '1,250', target: '1.5k', icon: Zap, color: 'primary', progress: 83 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container shadow-sm hover:shadow-xl transition-all group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl bg-surface-container-low text-${stat.color} group-hover:bg-${stat.color} group-hover:text-white transition-all`}>
              <stat.icon size={20} />
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Goal: {stat.target}</span>
              <div className="h-1 w-12 bg-surface-container mt-1 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  className={`h-full bg-${stat.color}`}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wide">{stat.label}</h4>
            <div className="flex items-baseline gap-1">
               <span className="font-headline font-extrabold text-2xl text-on-surface">{stat.value}</span>
               {stat.color === 'secondary' && <span className="text-[10px] font-bold text-secondary">Optimal</span>}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-surface-container-low flex items-center justify-between">
            <span className="text-[10px] font-semibold text-outline">Real-time Watch Sync</span>
            <div className="flex gap-1">
               {[1,2,3].map(j => (
                 <div key={j} className={`w-1 h-1 rounded-full bg-${stat.color} opacity-${j * 20}`} />
               ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
