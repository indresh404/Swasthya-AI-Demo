'use client';

import React from 'react';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { HEAT_ZONES, HeatZoneData } from '@/data/heatZones';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  selectedZone?: HeatZoneData;
  onZoneSelect: (id: string) => void;
}

export default function ZoneInfoPanel({ selectedZone, onZoneSelect }: Props) {
  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Critical': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'High': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'Moderate': return <Info className="w-4 h-4 text-yellow-500" />;
      case 'Low': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-50 text-red-600 border-red-100';
      case 'High': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Moderate': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'Low': return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence mode="wait">
        {selectedZone ? (
          <motion.div 
            key={selectedZone.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-blue-900 font-display">{selectedZone.name}</h3>
              <div className={`px-3 py-1 rounded-full border text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 ${getRiskColor(selectedZone.riskLevel)}`}>
                 {getRiskIcon(selectedZone.riskLevel)}
                 <span>{selectedZone.riskLevel}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white p-4 rounded-2xl border border-blue-50">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2">Last Assessment</span>
                  <div className="flex items-center text-sm font-bold text-blue-900">
                     <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                     {selectedZone.lastLogged}
                  </div>
               </div>
               <div className="bg-white p-4 rounded-2xl border border-blue-50">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2">Contribution</span>
                  <div className="flex items-center text-sm font-bold text-blue-900">
                     <Activity className="w-4 h-4 mr-2 text-blue-400" />
                     {selectedZone.riskLevel === 'Low' ? 'Minimal' : 'Moderate'}
                  </div>
               </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-3">Detected Symptoms</label>
              <div className="flex flex-wrap gap-2">
                {selectedZone.symptoms.map(s => (
                  <span key={s} className="px-3 py-1.5 bg-white border border-blue-50 rounded-lg text-xs font-bold text-slate-700 shadow-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-blue-900 text-white p-6 rounded-[24px] shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                 <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="w-4 h-4 text-blue-300" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-blue-300">AI Recommendation</span>
                 </div>
                 <p className="text-sm leading-relaxed font-medium">
                    {selectedZone.aiRecommendation}
                 </p>
               </div>
               <div className="absolute top-[-10%] right-[-10%] w-20 h-20 bg-blue-400/20 blur-2xl rounded-full" />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-3xl"
          >
             <div className="w-16 h-16 bg-blue-50 text-blue-200 rounded-full flex items-center justify-center mb-4">
                <Info className="w-8 h-8" />
             </div>
             <h4 className="text-lg font-bold text-slate-400">Select a Body Zone</h4>
             <p className="text-sm text-slate-300 mt-2 max-w-[200px]">
                Click on the 3D model zones to view detailed diagnostic analysis.
             </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto pt-8">
        <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-4">Detected Hotspots</h4>
        <div className="space-y-3">
          {HEAT_ZONES.map(zone => (
            <button
              key={zone.id}
              onClick={() => onZoneSelect(zone.id)}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                selectedZone?.id === zone.id 
                  ? 'bg-white border-blue-600 shadow-lg' 
                  : 'bg-white border-blue-50 hover:bg-white hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-3">
                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getRiskColor(zone.riskLevel)}`}>
                    <Activity className="w-4 h-4" />
                 </div>
                 <div>
                    <h5 className="text-xs font-bold text-blue-900">{zone.name}</h5>
                    <p className="text-[10px] text-slate-400 font-medium">Status: {zone.riskLevel}</p>
                 </div>
              </div>
              <ChevronRight className={`w-4 h-4 transition-all ${
                selectedZone?.id === zone.id ? 'text-blue-600 translate-x-1' : 'text-slate-200 group-hover:text-blue-300'
              }`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
