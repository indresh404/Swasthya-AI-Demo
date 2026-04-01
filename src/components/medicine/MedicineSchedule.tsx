'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { 
  Sun, 
  CloudSun, 
  Moon, 
  CheckCircle2, 
  Clock,
  Pill as PillIcon
} from 'lucide-react';
import { mockMedicines } from '@/data/mockMedicines';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import checkmarkAnim from '../../../public/animations/checkmark.json';

const timeSlots = [
  { id: 'morning', name: 'Morning', icon: Sun, color: 'text-orange-400', bg: 'bg-orange-50' },
  { id: 'afternoon', name: 'Afternoon', icon: CloudSun, color: 'text-blue-400', bg: 'bg-blue-50' },
  { id: 'evening', name: 'Evening', icon: CloudSun, color: 'text-indigo-400', bg: 'bg-indigo-50' },
  { id: 'night', name: 'Night', icon: Moon, color: 'text-slate-600', bg: 'bg-slate-50' },
];

export default function MedicineSchedule() {
  const [medicines, setMedicines] = useState(mockMedicines);
  const [triggeredId, setTriggeredId] = useState<string | null>(null);

  const handleToggleTaken = (id: string, currentlyTaken: boolean) => {
    if (!currentlyTaken) {
      setTriggeredId(id);
      setTimeout(() => setTriggeredId(null), 2000);
    }
    
    setMedicines(prev => prev.map((m: any) => 
      m.id === id ? { ...m, takenToday: !currentlyTaken } : m
    ));
  };

  const getMedicinesForSlot = (slot: string) => {
    // Basic mapping for mock purposes
    if (slot === 'morning') return medicines.filter((m: any) => m.times.some((t: string) => t.includes('AM')));
    if (slot === 'night') return medicines.filter((m: any) => m.times.some((t: string) => t.includes('PM')));
    // Others map based on mock frequencies if relevant
    return [];
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-blue-900 font-bold">Today's Schedule</h3>
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Next dose: 8:00 PM</span>
        </div>
      </div>

      <div className="relative space-y-12">
        {/* Vertical Timeline Line */}
        <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-blue-100/50" />

        {timeSlots.map((slot) => {
          const slotMeds = getMedicinesForSlot(slot.id);
          
          return (
            <div key={slot.id} className="relative pl-14">
              {/* Slot Indicator */}
              <div className={`absolute left-0 top-0 w-12 h-12 rounded-full ${slot.bg} border-4 border-white shadow-sm flex items-center justify-center z-10`}>
                <slot.icon className={`w-5 h-5 ${slot.color}`} />
              </div>

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="shrink-0 w-32 mt-2">
                  <h4 className="font-bold text-blue-900 text-sm uppercase tracking-widest">{slot.name}</h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                    {slot.id === 'morning' ? '8:00 AM - 10:00 AM' : slot.id === 'night' ? '8:00 PM - 10:00 PM' : ''}
                  </p>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {slotMeds.length > 0 ? (
                    slotMeds.map((med) => (
                      <motion.div
                        key={med.id}
                        layout
                        className={`glass-card p-4 flex items-center justify-between relative overflow-hidden transition-all duration-300 ${
                          med.takenToday ? 'opacity-60 grayscale-[0.5]' : 'opacity-100'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            med.takenToday ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-500'
                          }`}>
                            <PillIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-bold text-blue-900 text-sm">{med.name}</h5>
                            <p className="text-xs text-slate-500">{med.dosage} · {med.frequency}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleToggleTaken(med.id, med.takenToday)}
                          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                            med.takenToday 
                              ? 'bg-green-500 text-white' 
                              : 'bg-white border border-blue-200 text-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          {med.takenToday ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Taken</span>
                            </>
                          ) : (
                            <span>Mark Taken</span>
                          )}
                        </button>

                        {/* Success Animation */}
                        <AnimatePresence>
                          {triggeredId === med.id && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm"
                            >
                              <div className="w-16 h-16">
                                <Lottie animationData={checkmarkAnim} loop={false} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-400 italic py-4">No medications scheduled</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
