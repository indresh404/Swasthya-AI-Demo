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
  ReferenceDot,
} from 'recharts';
import { mockVitals } from '@/data/mockVitals';

export default function RiskTrendChart() {
  const data = mockVitals.map((v, i) => ({
    date: v.date,
    risk: Math.round(40 + Math.sin(i * 0.5) * 10 + (v.heartRate - 70) * 1.5),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-3 border border-blue-100 rounded-xl shadow-xl">
          <p className="text-[10px] text-slate-400 mb-1">{label}</p>
          <p className="text-sm font-bold text-blue-900">
            Risk Score: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 h-[400px] flex flex-col">
      <div className="mb-4">
        <h3 className="text-blue-900 font-bold">Risk Trend</h3>
        <p className="text-xs text-slate-400 mt-1">30-day health risk assessment</p>
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="date" hide />
            <YAxis hide domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="risk"
              stroke="#2563EB"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#riskGrad)"
              animationDuration={2500}
            />
            {data.length > 18 && (
              <ReferenceDot
                x={data[18].date}
                y={data[18].risk}
                r={5}
                fill="#EF4444"
                stroke="white"
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>

        <div className="absolute top-2 right-2 flex flex-col items-end pointer-events-none">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
            Monthly Avg
          </span>
          <span className="text-xl font-bold text-blue-900 font-mono">62.4</span>
          <span className="text-[10px] text-green-500 font-bold mt-1">
            ↓ 4.2% from last month
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-blue-50 flex items-center justify-between">
        <span className="text-[10px] text-slate-400">AI Confidence: 94%</span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-1 h-3 bg-blue-200 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
