'use client'

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TriangleAlert } from 'lucide-react';

const forecastData = [
  { day: 'Day 1', risk: 30 },
  { day: 'Day 5', risk: 25 },
  { day: 'Day 10', risk: 28 },
  { day: 'Day 15', risk: 45 }, // Spike
  { day: 'Day 20', risk: 20 },
  { day: 'Day 25', risk: 15 },
  { day: 'Day 30', risk: 10 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-lg shadow-xl border border-primary-fixed text-xs font-mono font-bold">
        {payload[0].value}% Risk
      </div>
    );
  }
  return null;
};

export default function RiskTrendChart() {
  return (
    <section className="bg-surface-container rounded-3xl p-6 relative">
      <h3 className="font-headline font-bold text-on-surface mb-1 text-lg">30-Day Risk Forecast</h3>
      <p className="text-[11px] text-on-surface-variant mb-4">Projected based on current symptomatic indicators</p>
      
      <div className="h-28 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={forecastData} margin={{ top: 15, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary-fixed)" stopOpacity={1}/>
                <stop offset="95%" stopColor="var(--color-primary-fixed)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-primary-fixed-dim)', strokeWidth: 2 }} />
            <Area 
              type="monotone" 
              dataKey="risk" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#forecastGradient)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
        
        {/* Symptom Spike Annotation */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="bg-error text-white text-[9px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
            <TriangleAlert size={12} />
            Symptom Spike
          </div>
        </div>
      </div>
    </section>
  );
}
