'use client'

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
  { time: '0m', spo2: 100, hr: 80 },
  { time: '1m', spo2: 98, hr: 78 },
  { time: '2m', spo2: 99, hr: 82 },
  { time: '3m', spo2: 96, hr: 88 },
  { time: '4m', spo2: 97, hr: 84 },
  { time: '5m', spo2: 95, hr: 90 },
  { time: '6m', spo2: 96, hr: 85 },
  { time: '7m', spo2: 94, hr: 92 },
  { time: 'Now', spo2: 95, hr: 87 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primary text-white text-[10px] px-3 py-2 rounded-lg shadow-xl border border-primary-fixed">
        <p className="font-bold mb-1">{label} Ago</p>
        <p className="font-mono">SpO2: {payload[0].value}%</p>
        <p className="font-mono text-error-container">HR: {payload[1].value} bpm</p>
      </div>
    );
  }
  return null;
};

export default function LiveVitalsChart() {
  return (
    <section className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm overflow-hidden border border-surface-container">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-headline font-bold text-on-surface text-lg">Live Vitals Monitoring</h3>
        <span className="text-[10px] font-bold text-primary border border-primary/20 px-2 py-0.5 rounded-full animate-pulse">
          REALTIME
        </span>
      </div>

      <div className="h-40 w-full relative group">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSpO2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <YAxis domain={['dataMin - 5', 'dataMax + 5']} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-outline)' }} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-outline-variant)', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Line 
              type="monotone" 
              dataKey="spo2" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ r: 3, fill: 'var(--color-primary)', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#fff', stroke: 'var(--color-primary)', strokeWidth: 2 }}
              animationDuration={1500}
            />
            <Line 
              type="stepAfter" 
              dataKey="hr" 
              stroke="var(--color-error)" 
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <div className="text-center group">
          <p className="text-[10px] text-on-surface-variant font-medium group-hover:text-primary transition-colors">Heart Rate</p>
          <p className="font-mono font-bold text-xl text-on-surface mt-1">
            72 <span className="text-[10px] text-outline">BPM</span>
          </p>
        </div>
        <div className="text-center border-x border-surface-container group">
          <p className="text-[10px] text-on-surface-variant font-medium group-hover:text-primary transition-colors">SpO2</p>
          <p className="font-mono font-bold text-xl text-on-surface mt-1">
            98 <span className="text-[10px] text-outline">%</span>
          </p>
        </div>
        <div className="text-center group">
          <p className="text-[10px] text-on-surface-variant font-medium group-hover:text-primary transition-colors">Sleep Score</p>
          <p className="font-mono font-bold text-xl text-on-surface mt-1">
            84 <span className="text-[10px] text-outline">/100</span>
          </p>
        </div>
      </div>
    </section>
  );
}
