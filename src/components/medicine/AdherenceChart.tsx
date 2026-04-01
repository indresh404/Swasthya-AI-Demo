'use client';

import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Cell,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { day: 'Mon', taken: 4, skipped: 0 },
  { day: 'Tue', taken: 3, skipped: 1 },
  { day: 'Wed', taken: 4, skipped: 0 },
  { day: 'Thu', taken: 4, skipped: 0 },
  { day: 'Fri', taken: 4, skipped: 0 },
  { day: 'Sat', taken: 4, skipped: 0 },
  { day: 'Sun', taken: 3, skipped: 1 },
];

export default function AdherenceChart() {
  return (
    <div className="glass-card p-6 h-[280px] flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1 w-full md:w-auto h-[200px]">
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-blue-900 font-bold text-sm">7-Day Adherence History</h3>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={0}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#64748B' }} 
            />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border border-blue-50 rounded-xl shadow-lg ring-1 ring-blue-100">
                      <p className="text-[10px] font-bold text-blue-900 mb-1">{payload[0].payload.day}</p>
                      <div className="space-y-1">
                        <p className="text-[10px] text-green-600 font-bold">Taken: {payload[0].value}</p>
                        <p className="text-[10px] text-red-400 font-bold">Skipped: {payload[1].value}</p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" align="right" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
            <Bar dataKey="taken" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} barSize={20} name="Taken" />
            <Bar dataKey="skipped" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={20} name="Skipped" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full md:w-48 bg-blue-50/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
        <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-blue-100" />
              <motion.circle 
                cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" 
                strokeDasharray="226" strokeDashoffset={226 * (1 - 0.85)}
                strokeLinecap="round"
                className="text-blue-600"
                initial={{ strokeDashoffset: 226 }}
                animate={{ strokeDashoffset: 226 * (1 - 0.85) }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-blue-900 leading-none">85%</span>
            </div>
        </div>
        <p className="text-[10px] uppercase font-bold tracking-widest text-blue-400 mt-4 leading-relaxed">
          Adherence <br /> this week
        </p>
      </div>
    </div>
  );
}
