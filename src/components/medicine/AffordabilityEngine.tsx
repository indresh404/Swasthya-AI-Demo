'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingDown, Store, BadgePercent, Landmark, MapPin, ChevronRight, Calculator } from 'lucide-react';

export default function AffordabilityEngine() {
  const calculations = {
    branded: 1840,
    generic: 210,
    savings: 1630,
    percentage: 88,
  };

  return (
    <div className="space-y-8">
      {/* 1. Comparison Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Savings Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-12 bg-black text-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-2xl border border-white/10"
        >
          {/* Background Highlight */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
             <div className="space-y-6 flex-1">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
                      <TrendingDown className="text-primary" size={16} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Monthly Cost Optimizer</span>
                </div>
                <h3 className="font-headline font-extrabold text-3xl md:text-5xl tracking-tight leading-tight">
                   Unlock <span className="text-primary">₹1,630</span> Monthly Savings
                </h3>
                <p className="text-white/60 font-medium max-w-md text-sm">
                   Our AI matches your current prescriptions with clinical-grade generic alternatives available at Jan Aushadhi Kendras.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                   <div className="px-4 py-2 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-2">
                      <BadgePercent size={16} className="text-secondary" />
                      <span className="text-xs font-bold whitespace-nowrap">88% Lower Cost</span>
                   </div>
                   <div className="px-4 py-2 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-2">
                      <IndianRupee size={16} className="text-secondary" />
                      <span className="text-xs font-bold whitespace-nowrap">₹19,560 / Year</span>
                   </div>
                </div>
             </div>

             {/* Calculation Visualizer */}
             <div className="w-full md:w-auto shrink-0 bg-white/5 backdrop-blur-md rounded-[2rem] p-6 border border-white/10 shadow-inner">
                <div className="space-y-6 w-full md:w-64">
                   <div className="flex items-center justify-between group">
                      <div className="space-y-1">
                         <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Branded Cost</span>
                         <p className="text-lg font-headline font-bold text-white/90">₹{calculations.branded}</p>
                      </div>
                      <div className="w-1.5 h-12 bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-white/40 group-hover:bg-white/60 transition-all" />
                      </div>
                   </div>
                   
                   <div className="flex items-center justify-between group">
                      <div className="space-y-1">
                         <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Generic (AI Match)</span>
                         <p className="text-xl font-headline font-black text-primary">₹{calculations.generic}</p>
                      </div>
                      <div className="w-1.5 h-12 bg-white/10 rounded-full overflow-hidden">
                         <div className="h-10% bg-primary group-hover:h-15% transition-all" style={{ height: '12%' }} />
                      </div>
                   </div>

                   <button className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2 group">
                      <Calculator size={14} className="group-hover:rotate-12 transition-transform" />
                      View Cost Analysis
                   </button>
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* Government Scheme Card */}
         <SchemeCard 
            icon={Landmark}
            tag="Eligible Program"
            title="PM-JAY (Ayushman Bharat)"
            benefit="Up to ₹5 Lakh/Year"
            desc="You are eligible for cashless secondary & tertiary care hospitalization."
            color="bg-secondary"
            actionLabel="Check Health Status"
         />

         {/* Store Locator Card */}
         <SchemeCard 
            icon={MapPin}
            tag="Nearest Generic Store"
            title="Jan Aushadhi Kendra"
            benefit="1.2 km Away"
            desc="Shivaji Nagar, Sector 4. Open until 9:30 PM today."
            color="bg-primary"
            actionLabel="Get Directions"
         />

         {/* Impact Summary */}
         <div className="bg-surface-container-lowest rounded-[2rem] p-6 border border-surface-container flex flex-col items-center justify-center text-center gap-4 group cursor-default">
            <div className="w-16 h-16 rounded-3xl bg-surface-container-low border border-surface-container flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
               <Store className="text-on-surface-variant" size={28} />
            </div>
            <div className="space-y-1">
               <h4 className="font-headline font-bold text-on-surface">Digital Health Locker</h4>
               <p className="text-xs font-medium text-outline">Your prescriptions are matched in real-time with the latest CDSCO generic inventory.</p>
            </div>
            <div className="w-full h-[1px] bg-surface-container" />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Active Intelligence Layer</span>
         </div>
      </div>
    </div>
  );
}

function SchemeCard({ icon: Icon, tag, title, benefit, desc, color, actionLabel }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-surface-container-lowest rounded-[2rem] p-2 border border-surface-container flex flex-col shadow-sm group"
    >
      <div className="p-6 flex-1 flex flex-col gap-4">
         <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${color}/10 border ${color}/20`}>
               <Icon size={14} className={color.replace('bg-', 'text-')} />
            </div>
            <span className={`text-[9px] font-black uppercase tracking-wider ${color.replace('bg-', 'text-')}`}>{tag}</span>
         </div>
         <div className="space-y-1">
            <h4 className="font-headline font-extrabold text-lg text-on-surface tracking-tight group-hover:text-primary transition-colors">{title}</h4>
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{benefit}</p>
         </div>
         <p className="text-[11px] font-medium text-outline leading-normal line-clamp-2">{desc}</p>
      </div>
      <button className="w-full p-4 rounded-b-[1.8rem] bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white">
         <span className="text-[10px] font-black uppercase tracking-widest">{actionLabel}</span>
         <ChevronRight size={14} />
      </button>
    </motion.div>
  );
}
