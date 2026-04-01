"use client";

import { useEffect, useState } from "react";
import { healthData } from "@/constants";

type InfoPanelProps = {
  zone: string | null;
  onClose: () => void;
};

export default function InfoPanel({ zone, onClose }: InfoPanelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (zone) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [zone]);

  if (!zone || !healthData[zone as keyof typeof healthData]) return null;

  const data = healthData[zone as keyof typeof healthData];
  const isHighRisk = data.risk.includes("High");

  const getRiskColor = (risk: string) => {
    if (risk.includes("High")) return "#ff4444";
    if (risk.includes("Moderate")) return "#ff8844";
    if (risk.includes("Mild")) return "#ffdd44";
    return "#44ff44";
  };

  const riskColor = getRiskColor(data.risk);

  return (
    <div
      className={`fixed z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-auto ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      style={{
        // Reposition for high risk vs others
        right: isHighRisk ? "8%" : "4%",
        top: isHighRisk ? "15%" : "50%",
        transform: isHighRisk ? "none" : "translateY(-50%)",
        width: "340px",
      }}
    >
      <div className="relative bg-[rgba(8,10,15,0.85)] backdrop-blur-3xl border border-white/20 rounded-[2.5rem] p-10 shadow-[0_20px_100px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Animated background glow */}
        <div
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[100px] opacity-15 transition-all duration-1000"
          style={{ backgroundColor: riskColor }}
        />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all border border-white/5 active:scale-95"
        >
          <span className="text-2xl mt-[-2px]">×</span>
        </button>

        <div className="relative">
          <div className="flex items-center gap-4 mb-2">
            <div
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{
                backgroundColor: riskColor,
                boxShadow: `0 0 15px ${riskColor}, 0 0 30px ${riskColor}40`
              }}
            />
            <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">
              Neurological Diagnostic
            </span>
          </div>

          <h1 className="text-white text-4xl font-extralight mb-1 capitalize tracking-tight">
            {zone} <span className="text-white/20 font-thin italic">System</span>
          </h1>

          <p className="text-white/60 text-sm mb-8 font-medium">{data.label} Analysis</p>

          <div
            className="inline-flex items-center px-5 py-2 rounded-full text-[11px] font-black tracking-widest uppercase mb-10"
            style={{
              backgroundColor: `${riskColor}15`,
              color: riskColor,
              border: `1px solid ${riskColor}40`,
              boxShadow: `0 0 30px ${riskColor}15`,
            }}
          >
            {data.risk}
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-white/20 text-[10px] uppercase tracking-[0.25em] font-black">Critical Observations</h4>
              <ul className="space-y-3">
                {data.symptoms.map((symptom, idx) => (
                  <li key={idx} className="text-white/90 text-sm flex items-start gap-4 group">
                    <span className="mt-2 w-1.5 h-[1px] bg-white/30 group-hover:bg-white group-hover:w-3 transition-all duration-300" />
                    <span className="flex-1 leading-relaxed font-light">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-3 bg-white/20 rounded-full" />
                <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-none">AI Health Insight</span>
              </div>
              <p className="text-white/60 text-[14px] leading-relaxed italic font-light pl-4 border-l border-white/5">
                "{data.ai_note}"
              </p>
            </div>
          </div>
        </div>

        {/* Scanning line effect */}
        <div className="absolute left-0 right-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-scan opacity-30" />
      </div>
    </div>
  );
}