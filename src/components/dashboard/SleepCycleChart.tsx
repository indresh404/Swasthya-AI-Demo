'use client'

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Moon, Sparkles } from 'lucide-react';

const sleepData = [
  { time: '11PM', deep: 0, rem: 0, light: 20 },
  { time: '12AM', deep: 40, rem: 10, light: 30 },
  { time: '1AM', deep: 80, rem: 15, light: 20 },
  { time: '2AM', deep: 60, rem: 40, light: 30 },
  { time: '3AM', deep: 30, rem: 70, light: 40 },
  { time: '4AM', deep: 20, rem: 50, light: 60 },
  { time: '5AM', deep: 10, rem: 30, light: 80 },
  { time: '6AM', deep: 0, rem: 20, light: 90 },
  { time: '7AM', deep: 0, rem: 0, light: 100 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-surface-container text-xs font-bold font-mono">
        <p className="mb-2 text-on-surface-variant uppercase tracking-wider">{label}</p>
        <div className="space-y-1.5 font-bold">
          <p className="text-primary-container">Deep: {payload[0].value}%</p>
          <p className="text-secondary">REM: {payload[1].value}%</p>
          <p className="text-outline">Light: {payload[2].value}%</p>
        </div>
      </div>
    );
  }
  return null;
};

export default function SleepCycleChart() {
  return (
    <section className="bg-surface-container-lowest p-6 md:p-8 rounded-4xl border border-surface-container shadow-sm hover:shadow-lg transition-all h-full flex flex-col group">
      <div className="flex justify-between items-start mb-8">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
               <Moon size={14} />
             </div>
             <h3 className="font-headline font-extrabold text-lg text-on-surface">Sleep Quality Cycles</h3>
           </div>
           <p className="text-xs font-bold text-outline uppercase tracking-[0.2em]">Watch Sync · Last 8h</p>
        </div>
        <div className="flex flex-col items-end">
           <span className="font-headline font-extrabold text-2xl text-primary">8h 24m</span>
           <div className="flex items-center gap-1.5 text-[10px] font-bold text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full mt-1">
             <Sparkles size={10} />
             92% Recovery
           </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sleepData} className="font-bold">
            <defs>
              <linearGradient id="colorDeep" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorREM" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--color-surface-container)" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: 'var(--color-outline)' }} />
            <YAxis hide domain={[0, 110]} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-primary-container)', strokeWidth: 2, strokeDasharray: '4' }} />
            <Area stackId="1" type="monotone" dataKey="deep" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorDeep)" animationDuration={2000} />
            <Area stackId="1" type="monotone" dataKey="rem" stroke="var(--color-secondary)" fillOpacity={1} fill="url(#colorREM)" animationDuration={2000} />
            <Area stackId="1" type="monotone" dataKey="light" stroke="var(--color-outline)" fill="transparent" animationDuration={2000} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 flex items-center justify-between px-2">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-primary" />
               <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Deep</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-secondary" />
               <span className="text-[10px] font-bold text-outline uppercase tracking-wider">REM</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-outline" />
               <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Light</span>
            </div>
         </div>
         <button className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest decoration-2 underline-offset-4 active:scale-95 transition-all">
            Full Analysis
         </button>
      </div>
    </section>
  );
}
