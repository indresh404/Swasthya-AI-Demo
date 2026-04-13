'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, ShieldCheck, User, Activity, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

interface QRScannerModalProps {
  onClose: () => void;
}

export default function QRScannerModal({ onClose }: QRScannerModalProps) {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (scanState === 'scanning') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setScanState('success'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [scanState]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg bg-surface-container-lowest rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-surface-container flex items-center justify-between bg-surface-container-low/50">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                 <QrCode className="text-primary" size={20} />
              </div>
              <div>
                 <h3 className="font-headline font-bold text-on-surface text-lg leading-none">Clinical ID Scanner</h3>
                 <p className="text-[10px] font-bold text-outline uppercase tracking-widest mt-1">Encrypted Patient Identification</p>
              </div>
           </div>
           <button 
             onClick={onClose}
             className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors"
           >
              <X size={20} className="text-on-surface-variant" />
           </button>
        </div>

        {/* Scanner Viewport */}
        <div className="p-8">
           <div className="relative aspect-square w-full max-w-[300px] mx-auto bg-black rounded-[2rem] overflow-hidden border-4 border-surface-container shadow-inner">
              
              {scanState === 'idle' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-8">
                   <div className="w-20 h-20 rounded-3xl border-2 border-white/20 flex items-center justify-center border-dashed">
                      <QrCode className="text-white/30" size={32} />
                   </div>
                   <p className="text-white/60 text-xs font-medium">Position the patient QR code within the frame to begin scanning.</p>
                   <button 
                     onClick={() => setScanState('scanning')}
                     className="px-6 py-2.5 bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
                   >
                     Initialize Scanner
                   </button>
                </div>
              )}

              {scanState === 'scanning' && (
                <div className="absolute inset-0">
                   {/* Scanning Beam */}
                   <motion.div 
                     animate={{ top: ['0%', '100%', '0%'] }}
                     transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                     className="absolute inset-x-0 h-1 bg-primary shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.8)] z-10"
                   />
                   {/* Grid Overlay */}
                   <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ 
                      backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)',
                      backgroundSize: '30px 30px'
                   }} />
                   
                   <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <Loader2 className="text-primary animate-spin" size={32} />
                      <div className="flex flex-col items-center">
                         <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">Decrypting Hash...</span>
                         <span className="text-white font-mono text-xl">{progress}%</span>
                      </div>
                   </div>
                </div>
              )}

              {scanState === 'success' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex flex-col items-center justify-center gap-6"
                >
                   <motion.div 
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/40"
                   >
                      <CheckCircle2 size={40} />
                   </motion.div>
                   <div className="text-center">
                      <h4 className="text-white font-headline font-bold text-xl">Identity Verified</h4>
                      <p className="text-primary text-[10px] font-black uppercase tracking-widest mt-1">Session ID: #AI-992-QX</p>
                   </div>
                </motion.div>
              )}
           </div>
        </div>

        {/* Footer Info */}
        <AnimatePresence mode="wait">
          {scanState === 'success' ? (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="bg-primary/5 border-t border-primary/10 p-6 space-y-4"
            >
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                     <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary">
                        <User size={24} />
                     </div>
                  </div>
                  <div className="flex-1">
                     <div className="flex items-center justify-between">
                        <h4 className="font-headline font-bold text-on-surface">Arjun Sharma</h4>
                        <span className="text-[9px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">Type-2 Diabetic</span>
                     </div>
                     <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1 text-[10px] text-outline font-bold">
                           <Activity size={10} className="text-secondary" /> 
                           SYNCED 2M AGO
                        </div>
                        <div className="w-1 h-1 rounded-full bg-outline-variant" />
                        <div className="flex items-center gap-1 text-[10px] text-outline font-bold uppercase">
                           7 PATIENTS IN QUEUE
                        </div>
                     </div>
                  </div>
               </div>
               <button 
                 onClick={onClose}
                 className="w-full py-3 bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-primary-container shadow-lg shadow-primary/10 transition-all"
               >
                 Open Patient Morning Briefing
               </button>
            </motion.div>
          ) : (
            <div className="px-8 pb-8 pt-2 flex items-center justify-center gap-6 text-outline">
               <div className="flex items-center gap-2">
                 <ShieldCheck size={14} className="text-primary" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">HiPAA Encrypted</span>
               </div>
               <div className="w-[1px] h-3 bg-surface-container" />
               <div className="flex items-center gap-2">
                 <Sparkles size={14} className="text-secondary" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Biometric Guard</span>
               </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
