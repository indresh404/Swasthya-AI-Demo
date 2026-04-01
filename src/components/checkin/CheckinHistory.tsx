'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { mockCheckins } from '@/data/mockCheckins';

export default function CheckinHistory() {
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

  // Reverse to show most recent first, exclude today if it has no answers
  const historicalData = [...mockCheckins]
    .reverse()
    .filter(c => Object.keys(c.answers).length > 0);

  const toggleExpand = (date: string) => {
    setExpandedDate(prev => prev === date ? null : date);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Normal': return 'text-green-500 bg-green-50';
      case 'Watch': return 'text-orange-500 bg-orange-50';
      case 'Flagged': return 'text-red-500 bg-red-50';
      default: return 'text-slate-500 bg-slate-50';
    }
  };

  const getSeverityIcon = (severity: string): React.ReactNode => {
    switch (severity) {
      case 'Normal': return <CheckCircle2 className="w-4 h-4" />;
      case 'Watch': return <AlertCircle className="w-4 h-4" />;
      case 'Flagged': return <AlertCircle className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-blue-900 font-bold">Past 7 Days</h3>
        <button className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {historicalData.map((checkin) => {
          const isExpanded = expandedDate === checkin.date;
          
          return (
            <motion.div
              key={checkin.date}
              layout
              className="glass-card overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleExpand(checkin.date)}
                className="w-full text-left p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 text-sm">
                      {new Date(checkin.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {Object.keys(checkin.answers).length} questions answered
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getSeverityColor(checkin.severity)}`}>
                    {getSeverityIcon(checkin.severity)}
                    <span>{checkin.severity}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-blue-50 px-4 pb-4"
                  >
                    <div className="mt-4 space-y-4">
                      {Object.entries(checkin.answers).map(([q, a], idx) => (
                        <div key={idx}>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
                            {q}
                          </p>
                          <p className="text-sm text-slate-700 font-medium">
                            {a}
                          </p>
                        </div>
                      ))}
                      
                      <div className="bg-blue-50/50 p-3 rounded-xl mt-4">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-blue-400 mb-1">
                          AI Summary
                        </p>
                        <p className="text-xs text-blue-800 leading-relaxed italic">
                          "{checkin.summary}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {historicalData.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <p className="text-sm text-slate-400">No past check-ins available yet.</p>
        </div>
      )}
    </div>
  );
}
