'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from './ProfileCard';
import FamilyQRCard from './FamilyQRCard';
import FamilyMembersGrid from './FamilyMembersGrid';
import MedicalTimeline from './MedicalTimeline';
import MedicalRecordsList from './MedicalRecordsList';
import { FileText, ChevronRight, Activity, Database } from 'lucide-react';

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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
               <div className="lg:col-span-8 space-y-8">
                  <div className="flex items-center justify-between">
                     <h3 className="text-[11px] font-extrabold text-outline uppercase tracking-[0.3em] flex items-center gap-2">
                        <Activity size={14} className="text-primary" />
                        Clinical Timeline
                     </h3>
                     <div className="h-[1px] flex-1 mx-2 md:mx-6 bg-surface-container" />
                  </div>
                  <MedicalTimeline />
               </div>
               
               <div className="lg:col-span-4 space-y-8">
                  <div className="flex items-center justify-between">
                     <h3 className="text-[11px] font-extrabold text-outline uppercase tracking-[0.3em] flex items-center gap-2">
                        <Database size={14} className="text-secondary" />
                        Extraction Log
                     </h3>
                     <div className="h-[1px] flex-1 mx-2 md:mx-6 bg-surface-container" />
                  </div>
                  
                  <div className="bg-surface-container-low rounded-[2rem] p-6 border border-surface-container shadow-sm space-y-6">
                     <div className="space-y-4">
                        <div className="p-4 bg-white rounded-2xl border border-surface-container-high relative">
                           <span className="absolute -top-2 left-4 px-2 bg-white text-[9px] font-black text-outline uppercase border border-surface-container rounded-full">Raw Patient Input</span>
                           <p className="text-[11px] font-medium text-on-surface-variant italic">"I've been feeling some sharp pain in my chest when I walk fast, and my heart feels like it's racing."</p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-1">
                           <div className="w-0.5 h-4 bg-primary/20" />
                           <div className="bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                              <span className="text-[9px] font-black text-primary uppercase">Agent: Neural Extractor</span>
                           </div>
                           <div className="w-0.5 h-4 bg-primary/20" />
                        </div>

                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 border-dashed space-y-3">
                           <span className="text-[9px] font-black text-primary uppercase tracking-widest">Structured Output</span>
                           <div className="space-y-2">
                              <div className="flex justify-between items-center group">
                                 <span className="text-[10px] font-bold text-outline">SYMPTOM</span>
                                 <span className="text-[10px] font-black text-on-surface bg-white px-2 py-0.5 rounded border border-surface-container group-hover:border-primary transition-colors">Angina-like Sensation</span>
                              </div>
                              <div className="flex justify-between items-center group">
                                 <span className="text-[10px] font-bold text-outline">TRIGGER</span>
                                 <span className="text-[10px] font-black text-on-surface bg-white px-2 py-0.5 rounded border border-surface-container group-hover:border-primary transition-colors">Physical Exertion</span>
                              </div>
                              <div className="flex justify-between items-center group">
                                 <span className="text-[10px] font-bold text-outline">CONDITION</span>
                                 <span className="text-[10px] font-black text-on-surface bg-white px-2 py-0.5 rounded border border-surface-container group-hover:border-primary transition-colors">Tachycardia Suspicion</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center justify-between">
                     <h3 className="text-[11px] font-extrabold text-outline uppercase tracking-[0.3em]">Health Circle</h3>
                     <div className="h-[1px] flex-1 mx-2 md:mx-6 bg-surface-container" />
                  </div>
                  <FamilyMembersGrid />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
