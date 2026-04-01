'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Pill, Flag } from 'lucide-react';

export default function AIClinicalInsights() {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-container rounded-3xl p-px shadow-xl shadow-primary/10">
      <div className="bg-surface-container-lowest rounded-[23px] p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Bot className="text-primary" size={20} />
            <h3 className="font-headline font-bold text-on-surface">AI Clinical Insights</h3>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute w-4 h-4 bg-primary/20 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
        </div>

        <div className="space-y-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-3 bg-surface-container rounded-2xl cursor-pointer hover:bg-surface-container-high transition-colors"
          >
            <div className="flex items-center gap-3">
              <Pill className="text-primary-container" size={18} />
              <span className="text-sm font-semibold">Metformin Adherence</span>
            </div>
            <span className="font-mono text-primary font-bold">85%</span>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-3 bg-surface-container rounded-2xl cursor-pointer hover:bg-surface-container-high transition-colors"
          >
            <div className="flex items-center gap-3">
              <Flag className="text-error" size={18} />
              <span className="text-sm font-semibold">Active Risk Flags</span>
            </div>
            <span className="font-mono text-error font-bold">03</span>
          </motion.div>

          <div className="p-4 border border-surface-container rounded-2xl bg-surface-container-low/50">
            <p className="text-xs text-on-surface-variant leading-relaxed">
              <span className="font-bold text-secondary">Analysis:</span> 30-day Trend stable-positive. Suggesting follow-up on Pulmonary metrics next session.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
