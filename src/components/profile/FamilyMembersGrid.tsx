'use client';

import React from 'react';
import { 
  Heart, 
  ChevronRight, 
  ShieldAlert,
  User as UserIcon
} from 'lucide-react';
import { mockFamily } from '@/data/mockFamily';
import { motion } from 'framer-motion';

export default function FamilyMembersGrid() {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-500 bg-red-50 border-red-100';
      case 'Moderate': return 'text-orange-500 bg-orange-50 border-orange-100';
      case 'Low': return 'text-green-500 bg-green-50 border-green-100';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'High': return '🔴';
      case 'Moderate': return '🟡';
      case 'Low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {mockFamily.map((member) => (
        <motion.div
          key={member.id}
          whileHover={{ x: 4, transition: { duration: 0.2 } }}
          className="glass-card p-4 flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm ${
              member.riskLevel === 'High' ? 'bg-gradient-to-br from-red-500 to-red-600' : 
              member.riskLevel === 'Moderate' ? 'bg-gradient-to-br from-orange-400 to-orange-500' : 
              'bg-gradient-to-br from-green-400 to-green-500'
            }`}>
              {member.name.charAt(0)}
            </div>
            
            <div>
              <h4 className="font-bold text-blue-900 text-sm flex items-center">
                {member.name}
                <span className="ml-2 text-[10px] text-slate-400 font-medium">({member.relation})</span>
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                 <span className="text-[10px] text-slate-500 font-bold">{member.age} Yrs</span>
                 <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full border ${getRiskColor(member.riskLevel)}`}>
                   {getRiskIcon(member.riskLevel)} {member.riskLevel.toUpperCase()}
                 </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
             <div className="text-right hidden md:block">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Risk Score</p>
                <p className="text-sm font-bold text-blue-900">{member.riskScore}</p>
             </div>
             <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
          </div>
        </motion.div>
      ))}

      <button className="w-full py-4 rounded-2xl border-2 border-dashed border-blue-100 text-blue-400 font-bold text-xs uppercase tracking-widest hover:bg-blue-50 hover:border-blue-300 transition-all">
         + Add Family Member
      </button>
    </div>
  );
}
