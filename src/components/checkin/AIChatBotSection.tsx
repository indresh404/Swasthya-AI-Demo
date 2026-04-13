'use client'

import React from 'react';
import { motion } from 'framer-motion';
import AIChatBot from '@/components/checkin/AIChatBot';

export default function AIChatBotSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col max-w-l mx-auto pt-2"
    >
      <div className="flex-1 min-h-0 bg-surface-container-lowest rounded-[2.5rem] overflow-hidden border border-surface-container shadow-2xl">
        <AIChatBot />
      </div>
    </motion.div>
  );
}
