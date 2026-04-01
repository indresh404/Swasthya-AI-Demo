'use client';

import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { mockVitals } from '@/data/mockVitals';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-blue-100 rounded-xl shadow-xl">
        <p className="text-sm font-bold text-blue-900 mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-xs flex items-center">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
            <span className="text-slate-500 mr-2">Heart Rate:</span>
            <span className="font-bold text-blue-900">{payload[0].value} bpm</span>
          </p>
          <p className="text-xs flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
            <span className="text-slate-500 mr-2">SpO2:</span>
            <span className="font-bold text-blue-900">{payload[1].value}%</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function VitalsGraph() {
  // Get last 7 days
  const data = mockVitals.slice(-7);

  return (
    <div className="glass-card p-6 h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-blue-900 font-bold">Vitals History</h3>
          <p className="text-xs text-slate-400 mt-1">Last 7 days trends</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Heart Rate</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-2" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SpO2</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSpo2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#64748B' }}
              dy={10}
              tickFormatter={(date) => {
                const d = new Date(date);
                return d.toLocaleDateString('en-US', { weekday: 'short' });
              }}
            />
            <YAxis 
              yAxisId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#64748B' }}
              domain={[60, 90]}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#64748B' }}
              domain={[94, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="heartRate" 
              stroke="#2563EB" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorHr)" 
              animationDuration={2000}
            />
            <Area 
              yAxisId="right"
              type="monotone" 
              dataKey="spo2" 
              stroke="#10B981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSpo2)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
