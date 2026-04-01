'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  AlertTriangle, 
  ShieldAlert, 
  Pill,
  Clock,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { useConflictCheck } from '@/hooks/useConflictCheck';
import ConflictWarning from './ConflictWarning';

interface Props {
  onClose: () => void;
}

export default function AddMedicineModal({ onClose }: Props) {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('once');
  const [timeSlots, setTimeSlots] = useState(['morning']);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const { checkConflict, isChecking, conflict, clearConflict } = useConflictCheck();

  const handleSlotToggle = (slot: string) => {
    setTimeSlots(prev => 
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dosage) return;

    const foundConflict = await checkConflict(name);
    if (!foundConflict) {
      setShowConfirmation(true);
      setTimeout(onClose, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-blue-50 flex items-center justify-between">
          <h3 className="text-xl font-bold text-blue-900">Add New Medication</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-all">
             <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {conflict ? (
            <ConflictWarning 
              conflict={conflict} 
              onCancel={clearConflict} 
              onOverride={() => {
                setShowConfirmation(true);
                setTimeout(onClose, 2000);
              }}
            />
          ) : showConfirmation ? (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="py-12 flex flex-col items-center justify-center text-center"
            >
               <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                 <CheckCircle2 className="w-8 h-8" />
               </div>
               <h4 className="text-lg font-bold text-blue-900">Medicine Added Successfully!</h4>
               <p className="text-sm text-slate-500">Updated today's schedule.</p>
            </motion.div>
          ) : (
            <>
              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                   <label className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1.5">Medicine Name</label>
                   <div className="relative">
                      <Pill className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        required
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ibuprofen, Metformin" 
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-blue-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                      />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1.5">Dosage</label>
                    <input 
                      required
                      type="text" 
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                      placeholder="e.g. 500mg" 
                      className="w-full px-4 py-3 bg-slate-50 border border-blue-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1.5">Frequency</label>
                    <div className="relative">
                       <select 
                         value={frequency}
                         onChange={(e) => setFrequency(e.target.value)}
                         className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-blue-50 rounded-xl text-sm outline-none appearance-none focus:ring-2 focus:ring-blue-300 transition-all"
                       >
                         <option value="once">Once Daily</option>
                         <option value="twice">Twice Daily</option>
                         <option value="thrice">Thrice Daily</option>
                       </select>
                       <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                   <label className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-3">Time Slots</label>
                   <div className="flex flex-wrap gap-2">
                      {['morning', 'afternoon', 'evening', 'night'].map(slot => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => handleSlotToggle(slot)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            timeSlots.includes(slot) 
                              ? 'bg-blue-600 text-white shadow-md' 
                              : 'bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-500'
                          }`}
                        >
                          {slot.charAt(0).toUpperCase() + slot.slice(1)}
                        </button>
                      ))}
                   </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isChecking}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center"
              >
                {isChecking ? (
                   <>
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                     <span>Checking Conflicts...</span>
                   </>
                ) : (
                  <span>Check & Add Medication</span>
                )}
              </button>
            </>
          )}
        </form>
      </motion.div>
    </div>
  );
}

// CheckCircle2 icon needed for confirmation state
function CheckCircle2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
    </svg>
  );
}
