'use client';

import React, { useState } from 'react';
import AdherenceChart from './AdherenceChart';
import MedicineSchedule from './MedicineSchedule';
import AddMedicineModal from './AddMedicineModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function MedicineMain() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
      {/* Header with Add Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-900 font-display">Medication Management</h2>
          <p className="text-sm text-slate-500 mt-1">Track your daily dosage and adherence</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-blue-200"
        >
          <Plus className="w-5 h-5" />
          <span className="font-bold text-sm tracking-wide">Add Medicine</span>
        </button>
      </div>

      {/* Top: Adherence Chart */}
      <motion.div variants={item}>
        <AdherenceChart />
      </motion.div>

      {/* Main: Today's Timeline */}
      <motion.div variants={item}>
        <MedicineSchedule />
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {isAddModalOpen && (
          <AddMedicineModal onClose={() => setIsAddModalOpen(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
