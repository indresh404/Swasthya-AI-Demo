'use client';

import React from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Pill,
  History
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeeklySummaryCard() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-[24px] shadow-xl relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-[-20%] right-[-10%] w-60 h-60 bg-white opacity-5 blur-[80px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-40 h-40 bg-blue-400 opacity-10 blur-[60px] rounded-full" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center mb-4">
             <div className="bg-white/20 p-2 rounded-lg mr-3">
               <History className="w-5 h-5 text-white" />
             </div>
             <h3 className="text-xl font-bold font-display">Weekly AI Health Summary</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-300 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Vital Stability</p>
                <p className="text-blue-100 text-xs mt-1">No critical fluctuations in heart rate or SpO2 this week.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-300 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Symptom Watch</p>
                <p className="text-blue-100 text-xs mt-1">Lower back pain reported on 3 consecutive days mid-week.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Pill className="w-5 h-5 text-blue-200 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Medication Adherence</p>
                <p className="text-blue-100 text-xs mt-1">Adherence at 85%. Missed Metformin on Tuesday night.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right flex flex-col items-end shrink-0">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
            <p className="text-[10px] uppercase font-bold tracking-widest text-blue-200">Last Analysed</p>
            <p className="text-sm font-bold mt-1">Today, 8:30 AM</p>
          </div>
          <button className="mt-4 text-xs font-bold bg-white text-blue-700 px-4 py-2 rounded-lg shadow-sm hover:bg-blue-50 transition-all uppercase tracking-wide">
            Detailed Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
