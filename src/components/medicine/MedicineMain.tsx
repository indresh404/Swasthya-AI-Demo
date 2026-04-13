'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import AdherenceChart from './AdherenceChart';
import MedicineSchedule from './MedicineSchedule';
import AddMedicineModal from './AddMedicineModal';
import AffordabilityEngine from './AffordabilityEngine';
import { Pill, Sparkles, TrendingDown } from 'lucide-react';

export default function MedicineMain() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="space-y-10 pb-24 max-w-[1200px] mx-auto pt-6"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 md:px-0">
        <div>
           <div className="flex items-center gap-2 mb-2">
             <div className="bg-primary/10 p-1.5 rounded-lg border border-primary/20">
               <Pill size={16} className="text-primary" />
             </div>
             <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Clinical Regimen</span>
           </div>
           <h2 className="font-headline font-extrabold text-3xl md:text-5xl text-on-surface tracking-tight">
             Treatment <span className="text-primary">Optimization</span>
           </h2>
           <p className="font-body font-medium text-on-surface-variant mt-2 max-w-xl">
             Manage prescriptions, track adherence, and unlock cost-saving clinical alternatives.
           </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:bg-primary-container transition-all"
        >
           <Plus size={20} />
           <span className="uppercase tracking-widest text-[11px] font-black">Add Prescription</span>
        </motion.button>
      </div>

      {/* Affordability Engine Section (NEW & PROMINENT) */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150 fill-mode-both">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-[11px] font-extrabold text-outline uppercase tracking-[0.3em] flex items-center gap-2">
               <TrendingDown size={14} className="text-primary" />
               Impact & Affordability
            </h3>
            <div className="h-[1px] flex-1 mx-2 md:mx-6 bg-surface-container" />
         </div>
         <AffordabilityEngine />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-extrabold text-outline uppercase tracking-[0.3em]">Daily Schedule</h3>
              <div className="h-[1px] flex-1 mx-2 md:mx-6 bg-surface-container" />
           </div>
           <MedicineSchedule />
        </div>
        
        <div className="xl:col-span-4 space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-extrabold text-outline uppercase tracking-[0.3em]">Analytics</h3>
              <div className="h-[1px] flex-1 mx-2 md:mx-6 bg-surface-container" />
           </div>
           <AdherenceChart />
          
           <div className="bg-surface-container-low rounded-3xl p-6 border border-surface-container shadow-sm flex flex-col gap-4">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                   <Sparkles size={20} />
                </div>
                <h4 className="font-headline font-bold text-on-surface text-sm uppercase tracking-wide">AI Recommendation</h4>
             </div>
             <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                Try setting your evening Metformin reminder closer to your usual dinner time (8:30 PM) to improve absorption and avoid empty stomach side effects.
             </p>
           </div>
        </div>
      </div>

      <AddMedicineModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={(med) => console.log('Added', med)} 
      />
    </motion.div>
  );
}
