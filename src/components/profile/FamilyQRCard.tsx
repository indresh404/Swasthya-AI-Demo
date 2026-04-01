'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  QrCode, 
  Share2, 
  Download, 
  Users,
  Copy
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function FamilyQRCard() {
  const familyGroupId = "MEHTA-FAM-2026-X92";

  return (
    <div className="glass-card p-8 flex flex-col items-center">
      <div className="flex items-center space-x-3 mb-8 w-full">
         <div className="bg-blue-900 p-2 rounded-lg">
           <Users className="w-5 h-5 text-blue-300" />
         </div>
         <div>
            <h3 className="text-blue-900 font-bold leading-none">Family Sync QR</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Mehta Family Group</p>
         </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-xl ring-1 ring-blue-50 relative group">
        {/* Decorative corner accents */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-blue-600 rounded-tl-lg" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-blue-600 rounded-tr-lg" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-blue-600 rounded-bl-lg" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-blue-600 rounded-br-lg" />
        
        <QRCodeSVG 
          value={familyGroupId} 
          size={180} 
          bgColor={"#ffffff"}
          fgColor={"#0F2B5B"}
          level={"H"}
          includeMargin={false}
          imageSettings={{
            src: "",
            x: undefined,
            y: undefined,
            height: 24,
            width: 24,
            excavate: true,
          }}
        />
      </div>

      <div className="mt-8 text-center px-4">
        <p className="text-sm font-bold text-blue-900">Share with family or doctor</p>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
           Grant view-only access to your health metrics and medication history.
        </p>
      </div>

      <div className="w-full mt-8 flex space-x-3">
        <button className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-lg transition-all">
           <Download className="w-4 h-4" />
           <span className="text-xs font-bold uppercase tracking-wide">Download</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-2 bg-white border border-blue-100 text-blue-900 py-3 rounded-xl hover:bg-blue-50 transition-all">
           <Share2 className="w-4 h-4" />
           <span className="text-xs font-bold uppercase tracking-wide">Share</span>
        </button>
      </div>
    </div>
  );
}
