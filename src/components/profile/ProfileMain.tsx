'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from './ProfileCard';
import FamilyQRCard from './FamilyQRCard';
import FamilyMembersGrid from './FamilyMembersGrid';
import MedicalTimeline from './MedicalTimeline';
import MedicalRecordsList from './MedicalRecordsList';
import { FileText, ChevronRight } from 'lucide-react';

export default function ProfileMain() {
  const [showRecords, setShowRecords] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-1.5">
             <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
             <span className="text-[10px] font-bold text-outline uppercase tracking-[0.3em]">Patient Identity Portal</span>
           </div>
          <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-on-surface tracking-tight">Personal & <span className="text-primary">Clinical Hub</span></h2>
          <p className="text-sm text-on-surface-variant font-medium mt-2 max-w-xl">Manage your digital biometric profile, connected family health circles, and historical clinical records.</p>
        </div>

        <button 
          onClick={() => setShowRecords(!showRecords)}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-headline font-bold text-sm transition-all shadow-lg border-2 ${
            showRecords 
              ? 'bg-on-surface text-white border-on-surface' 
              : 'bg-white text-on-surface border-surface-container active:scale-95'
          }`}
        >
          <FileText size={18} className={showRecords ? 'text-primary' : ''} />
          {showRecords ? 'Close Records' : 'Medical Records'}
          <ChevronRight size={16} className={`transition-transform duration-300 ${showRecords ? 'rotate-90' : ''}`} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {showRecords ? (
          <motion.section
            key="records"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <MedicalRecordsList />
          </motion.section>
        ) : (
          <motion.div
            key="profile-grid"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-6">
                  <ProfileCard />
               </div>
               <div className="lg:col-span-1 min-h-[220px]">
                  <FamilyQRCard />
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 min-h-[500px]">
                  <MedicalTimeline />
               </div>
               <div className="lg:col-span-1 min-h-[500px]">
                  <FamilyMembersGrid />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
