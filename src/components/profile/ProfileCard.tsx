'use client';

import React from 'react';
import { 
  MapPin, 
  Dna, 
  ShieldAlert, 
  Droplets,
  Cake,
  TrendingUp
} from 'lucide-react';
import { mockPatient, Patient } from '@/data/mockPatient';
import { motion } from 'framer-motion';

export default function ProfileCard() {
  const patient = mockPatient;

  return (
    <div className="glass-card p-8 flex flex-col items-center relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full pointer-events-none" />

      {/* Profile Image / Initials */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 p-1 shadow-2xl relative mb-6"
      >
        <div className="w-full h-full rounded-full border-4 border-white flex items-center justify-center text-white text-4xl font-black">
          AM
        </div>
        <div className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md animate-pulse">
          <TrendingUp className="w-4 h-4 text-orange-500" />
        </div>
      </motion.div>

      <h3 className="text-2xl font-bold text-blue-900 font-display">Arjun Mehta</h3>
      <div className="flex items-center text-slate-400 text-xs mt-1 space-x-3 mb-6">
        <span className="flex items-center"><Cake className="w-3 h-3 mr-1" /> 34 Yrs</span>
        <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> Mumbai, MH</span>
      </div>

      {/* Main Info Blocks */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-50 flex flex-col items-center">
           <span className="text-[10px] uppercase tracking-widest font-bold text-blue-400 mb-2">Health Risk</span>
           <span className="text-sm font-extrabold text-orange-600 uppercase tracking-wide">Moderate Risk</span>
           <div className="mt-2 w-full h-1 bg-white rounded-full overflow-hidden">
             <motion.div initial={{ width: 0 }} animate={{ width: '67%' }} className="h-full bg-orange-500" />
           </div>
        </div>

        <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-50 flex flex-col items-center">
           <span className="text-[10px] uppercase tracking-widest font-bold text-blue-400 mb-2">Blood Group</span>
           <span className="text-sm font-extrabold text-red-600 uppercase tracking-wide">B+ Positive</span>
           <div className="mt-2 flex items-center space-x-1">
              {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 bg-red-400 rounded-full" />)}
           </div>
        </div>
      </div>

      {/* Tags Section */}
      <div className="w-full mt-6 space-y-4">
        <div>
          <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2 block">Chronic Conditions</label>
          <div className="flex flex-wrap gap-2">
            {patient.conditions.map(c => (
              <span key={c} className="text-[11px] font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2 block">Allergies</label>
          <div className="flex flex-wrap gap-2">
            {patient.allergies.map(a => (
              <span key={a} className="text-[11px] font-bold bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-100 flex items-center">
                <ShieldAlert className="w-3 h-3 mr-1.5" />
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action */}
      <button className="w-full mt-8 py-3 bg-white border border-blue-100 text-blue-600 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-blue-50 transition-all">
         Update Medical Profile
      </button>
    </div>
  );
}
