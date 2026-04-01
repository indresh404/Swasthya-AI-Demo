'use client';

import React from 'react';
import WeeklySummaryCard from './WeeklySummaryCard';
import AIChatBot from './AIChatBot';
import CheckinHistory from './CheckinHistory';
import { motion } from 'framer-motion';

export default function CheckinMain() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Top: Weekly Summary */}
      <motion.div variants={item}>
        <WeeklySummaryCard />
      </motion.div>

      {/* Main: Chat + History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={item} className="lg:col-span-2">
          <AIChatBot />
        </motion.div>
        <motion.div variants={item} className="lg:col-span-1">
          <CheckinHistory />
        </motion.div>
      </div>
    </motion.div>
  );
}
