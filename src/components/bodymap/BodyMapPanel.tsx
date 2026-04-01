'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, RotateCcw, Info } from 'lucide-react';
import ZoneInfoPanel from './ZoneInfoPanel';
import { HEAT_ZONES } from '@/data/heatZones';

const BodyMapScene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

interface Props {
  onClose: () => void;
}

export default function BodyMapPanel({ onClose }: Props) {
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);

  const selectedZone = HEAT_ZONES.find(z => z.id === selectedZoneId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-md"
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        className="relative bg-white w-full h-full max-w-7xl rounded-[32px] shadow-2xl flex flex-col md:flex-row overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-white/20 hover:bg-white/40 text-slate-400 hover:text-slate-600 rounded-full transition-all z-20 backdrop-blur-sm border border-slate-100"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Half: 3D Scene */}
        <div className="md:w-3/5 h-1/2 md:h-full bg-[#0a0a1a] relative group">
          <div className="absolute top-8 left-8 z-10">
            <h2 className="text-2xl font-bold text-white font-display">Full Body Health Analysis</h2>
            <p className="text-blue-400/80 text-xs mt-1 font-bold uppercase tracking-widest">Interactive 3D Thermal Map</p>
          </div>

          <div className="w-full h-full">
            <BodyMapScene onSelect={(id: any) => setSelectedZoneId(id)} selectedZone={selectedZoneId} />
          </div>

          {/* Controls Overlay */}
          <div className="absolute bottom-8 left-8 flex space-x-3">
             <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white/60 text-[10px] font-bold uppercase">
                Drag to Rotate · Scroll to Zoom
             </div>
             <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 transition-all">
                <RotateCcw className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* Right Half: Zone Details */}
        <div className="md:w-2/5 h-1/2 md:h-full bg-slate-50 overflow-y-auto">
          <div className="p-8 h-full flex flex-col">
            <ZoneInfoPanel 
              selectedZone={selectedZone} 
              onZoneSelect={(id) => setSelectedZoneId(id)} 
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
