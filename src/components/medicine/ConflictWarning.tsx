'use client';

import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Info,
  ChevronRight
} from 'lucide-react';
import { Conflict } from '@/hooks/useConflictCheck';
import { motion } from 'framer-motion';

interface Props {
  conflict: Conflict;
  onCancel: () => void;
  onOverride: () => void;
}

export default function ConflictWarning({ conflict, onCancel, onOverride }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="space-y-6"
    >
      <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
        <div className="flex items-start space-x-3">
          <div className="bg-red-100 p-2 rounded-lg shrink-0">
             <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-red-900 uppercase tracking-wide">
              Drug Interaction Detected
            </h4>
            <div className="mt-1 flex items-center space-x-2">
               <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                 conflict.severity === 'Critical' ? 'bg-red-600 text-white' : 'bg-orange-500 text-white'
               }`}>
                 {conflict.severity}
               </span>
               <span className="text-xs text-red-700 font-bold">Interacting with: {conflict.interactingDrug}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-white/50 rounded-xl">
           <p className="text-xs text-red-900 leading-relaxed font-medium">
             {conflict.description}
           </p>
        </div>

        <div className="mt-4 flex items-center p-3 bg-blue-50/50 rounded-lg text-blue-700 text-[10px] font-bold uppercase tracking-widest">
           <Info className="w-3.5 h-3.5 mr-2" />
           Recommend checking with Dr. Sharma before proceed
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <button 
          onClick={onCancel}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center"
        >
          Cancel & Search Alternative
        </button>
        <button 
          onClick={onOverride}
          className="w-full bg-white text-red-600 font-bold py-4 rounded-xl border border-red-200 hover:bg-red-50 transition-all flex items-center justify-center group"
        >
          <span>Add with Override</span>
          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      <p className="text-[10px] text-slate-400 text-center font-medium px-4">
        By clicking override, you acknowledge the potential risks and have consulted a healthcare professional.
      </p>
    </motion.div>
  );
}
