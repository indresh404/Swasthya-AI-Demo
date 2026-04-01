'use client';

import React from 'react';
import { 
  Stethoscope, 
  Pill, 
  Beaker, 
  FileText, 
  Activity, 
  Calendar,
  ChevronRight,
  Download
} from 'lucide-react';
import { mockRecords } from '@/data/mockRecords';
import { motion } from 'framer-motion';

const getIcon = (type: string) => {
  switch (type) {
    case 'checkup': return <Stethoscope className="w-4 h-4" />;
    case 'lab': return <Beaker className="w-4 h-4" />;
    case 'prescription': return <Pill className="w-4 h-4" />;
    case 'cardiology': return <Activity className="w-4 h-4" />;
    case 'uploaded': return <FileText className="w-4 h-4" />;
    default: return <FileText className="w-4 h-4" />;
  }
};

const getColor = (type: string) => {
  switch (type) {
    case 'checkup': return 'text-blue-600 bg-blue-100';
    case 'lab': return 'text-indigo-600 bg-indigo-100';
    case 'prescription': return 'text-green-600 bg-green-100';
    case 'cardiology': return 'text-red-600 bg-red-100';
    case 'uploaded': return 'text-slate-600 bg-slate-100';
    default: return 'text-slate-600 bg-slate-100';
  }
};

export default function MedicalTimeline() {
  return (
    <div className="relative space-y-6">
      {/* Vertical Line */}
      <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-blue-50/50" />

      {mockRecords.map((record, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative pl-14 group"
        >
          {/* Dot Indicator */}
          <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-white border-4 border-slate-50 shadow-sm flex items-center justify-center z-10 transition-transform group-hover:scale-110">
            <div className={`p-1.5 rounded-lg ${getColor(record.type)}`}>
               {getIcon(record.type)}
            </div>
          </div>

          <div className="glass-card p-5 group-hover:shadow-md transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-blue-400 bg-blue-50 px-2 py-0.5 rounded-full">
                  {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-xs font-bold text-blue-900">{record.doctor}</span>
              </div>
              <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors md:opacity-0 group-hover:opacity-100">
                <Download className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
            
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
               {record.description}
            </p>

            <div className="mt-3 pt-3 border-t border-blue-50 flex items-center justify-between">
               <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Record Attached</span>
               <div className="flex items-center space-x-1 cursor-pointer">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none">View File</span>
                  <ChevronRight className="w-3 h-3 text-blue-600" />
               </div>
            </div>
          </div>
        </motion.div>
      ))}

      <button className="w-full mt-4 py-4 rounded-2xl bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-widest hover:bg-blue-100 transition-all">
         Load Older Records
      </button>
    </div>
  );
}
