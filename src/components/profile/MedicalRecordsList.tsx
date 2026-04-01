'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Calendar, User, ClipboardList, Activity } from 'lucide-react';

const RECORDS = [
  { id: 1, title: 'Annual Cardiac Screening', date: 'March 15, 2026', doctor: 'Dr. Sameer Varma', type: 'Pathology', status: 'Verified' },
  { id: 2, title: 'Basal Metabolic Profile', date: 'February 28, 2026', doctor: 'Dr. Ananya Iyer', type: 'Blood Test', status: 'Verified' },
  { id: 3, title: 'Chest X-Ray Digital Copy', date: 'January 12, 2026', doctor: 'City Scan Centre', type: 'Radiology', status: 'Verified' },
  { id: 4, title: 'Lipid Profile Summary', date: 'December 05, 2025', doctor: 'Dr. Sameer Varma', type: 'Blood Test', status: 'Archived' },
  { id: 5, title: 'ECG Stress Test Report', date: 'November 20, 2025', doctor: 'Apex Heart Clinic', type: 'Cardiac', status: 'Archived' },
];

export default function MedicalRecordsList() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
           <div className="p-2 rounded-xl bg-primary text-white shadow-lg">
             <ClipboardList size={20} />
           </div>
           <div>
             <h3 className="font-headline font-extrabold text-xl text-on-surface">Clinical Report Archive</h3>
             <p className="text-[10px] font-bold text-outline uppercase tracking-widest mt-1">Total {RECORDS.length} Documents Found</p>
           </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-xl border border-surface-container text-[11px] font-bold text-on-surface-variant hover:bg-surface-container transition-all active:scale-95">
           <Download size={14} />
           Download All
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RECORDS.map((record, i) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group bg-white border border-surface-container rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all relative overflow-hidden"
          >
            {/* Status Badge */}
            <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[9px] font-extrabold tracking-[0.2em] uppercase ${
              record.status === 'Verified' ? 'bg-secondary/10 text-secondary' : 'bg-outline/10 text-outline'
            }`}>
              {record.status}
            </div>

            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <FileText size={20} />
                 </div>
                 <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none mb-1 block">{record.type}</span>
                    <h4 className="font-headline font-extrabold text-sm text-on-surface group-hover:text-primary transition-colors">{record.title}</h4>
                 </div>
              </div>

              <div className="space-y-2.5 mb-6 flex-1">
                 <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-outline" />
                    <span className="text-xs font-semibold text-on-surface-variant">{record.date}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <User size={14} className="text-outline" />
                    <span className="text-xs font-semibold text-on-surface-variant">{record.doctor}</span>
                 </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-surface-container-low">
                <button className="flex-1 py-1.5 rounded-lg bg-surface-container-low text-[10px] font-bold text-on-surface-variant hover:bg-surface-container flex items-center justify-center gap-1.5 transition-all">
                   <Eye size={12} />
                   Preview
                </button>
                <button className="py-1.5 px-3 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all">
                   <Download size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Empty placeholder card */}
        <button className="border-2 border-dashed border-surface-container rounded-3xl p-6 flex flex-col items-center justify-center text-outline hover:border-primary hover:text-primary transition-all group min-h-[220px]">
           <div className="p-4 rounded-full bg-surface-container-low group-hover:bg-primary/5 transition-all mb-4">
              <Activity size={24} className="opacity-40" />
           </div>
           <span className="text-xs font-bold uppercase tracking-widest">Connect Laboratory</span>
           <span className="text-[9px] mt-1 font-medium">Automatic clinical sync</span>
        </button>
      </div>
    </div>
  );
}
