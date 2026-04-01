'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Hospital } from 'lucide-react';
import SchemesPanel from './SchemesPanel';

export default function SchemesBanner() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.005 }}
        className="relative overflow-hidden rounded-[20px] cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        }}
        onClick={() => setOpen(true)}
      >
        <div className="relative z-10 px-8 py-8 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Hospital className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">
                🏥 You may qualify for free government healthcare coverage
              </h3>
              <p className="text-green-100 text-sm mt-1 max-w-xl">
                Based on your cardiac risk flag and income profile, 3 schemes match
                your profile.
              </p>
            </div>
          </div>
          <button className="bg-white text-green-700 font-bold px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-green-50 transition-colors shadow-lg">
            <span>Search Schemes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full" />
      </motion.div>

      <SchemesPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
