'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import dynamic from 'next/dynamic';
import aiPulse from '../../../public/animations/ai_pulse.json';
import loadingAnim from '../../../public/animations/loading.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  type?: 'status' | 'default';
};

const INITIAL_SUGGESTIONS = ["Feeling stable today", "Some chest tightness", "Forgot my evening meds"];

export default function AIChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);
  const [agentStatus, setAgentStatus] = useState<string | null>(null);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  const script = [
    "Hello Arjun, I'm your Swasthya AI assistant. Based on your heart rate trend today, I see a 5% increase. How are you feeling overall?",
    "I've noted that. Have you experienced any dizziness or shortness of breath along with that tightness?",
    "Understood. Your medicine adherence is at 85%. Have you taken your Metformin dose yet?",
    "Thank you. I'm finishing your daily analysis. I recommend a brief 10-minute rest. Your summary has been shared with your family group."
  ];

  useEffect(() => {
    // Initial message
    const timer = setTimeout(() => {
      addAiMessage(script[0]);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAnalysing, agentLogs]);

  const addAiMessage = (text: string) => {
    setIsTyping(true);
    const id = Date.now().toString();
    
    // Simulate typing
    setTimeout(() => {
      const newMessage: Message = {
        id,
        sender: 'ai',
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    
    if (step < script.length - 1) {
      setIsAnalysing(true);
      setTimeout(() => {
        setIsAnalysing(false);
        const nextStep = step + 1;
        setStep(nextStep);
        addAiMessage(script[nextStep]);
      }, 2000);
    }
  };

  const startDemo = async () => {
    setMessages([]);
    setStep(0);
    setIsAnalysing(true);
    setAgentLogs([]);
    
    // Agent 1: Clinical Context
    setAgentStatus("Agent Core: Clinical Context");
    const logs1 = ["Scanning historical vitals database...", "Extracting symptom patterns...", "Generating behavioral summary..."];
    for (const log of logs1) {
      setAgentLogs(prev => [...prev, log]);
      await new Promise(r => setTimeout(r, 600));
    }
    await new Promise(r => setTimeout(r, 400));
    
    // Agent 2: Risk Intelligence
    setAgentStatus("Agent Intel: Risk Assessment");
    const logs2 = ["Running isolation forest (anomaly)...", "Calculating baseline delta (+5%)...", "Mapping risk to score: 67."];
    for (const log of logs2) {
      setAgentLogs(prev => [...prev, log]);
      await new Promise(r => setTimeout(r, 600));
    }
    await new Promise(r => setTimeout(r, 400));

    // Agent 3: RAG Engine
    setAgentStatus("Agent Knowledge: RAG Engine");
    const logs3 = ["Querying WHO/ICMR clinical vault...", "Matching symptoms with dengue protocols...", "Refining logic for platelet trends..."];
    for (const log of logs3) {
      setAgentLogs(prev => [...prev, log]);
      await new Promise(r => setTimeout(r, 600));
    }
    await new Promise(r => setTimeout(r, 400));

    // Agent 4: Response Architect
    setAgentStatus("Agent Voice: Response Architect");
    const logs4 = ["Structuring clinical prompt...", "Synthesizing empathetic check-in...", "Finalizing agent output..."];
    for (const log of logs4) {
      setAgentLogs(prev => [...prev, log]);
      await new Promise(r => setTimeout(r, 600));
    }
    
    setIsAnalysing(false);
    setAgentStatus(null);
    setAgentLogs([]);
    
    // Direct Notification from Doctor (Async QnA)
    const doctorMsg: Message = {
      id: 'doc-1',
      sender: 'ai',
      text: "🚨 DOCTOR ALERT: Dr. Verma has requested missing data. 'Has the patient had dengue in the last 6 months to explain recent platelet drop?'",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'status'
    };
    setMessages([doctorMsg]);
    
    await new Promise(r => setTimeout(r, 2000));
    
    addAiMessage("Arjun, your doctor noticed a trend in your blood work. To clarify the clinical context, have you had a dengue infection recently?");
  };

  return (
    <div className="bg-surface-container-lowest flex-1 h-[calc(100vh-160px)] flex flex-col overflow-hidden relative mb-0">
      {/* Header */}
      <header className="px-6 py-4 border-b border-surface-container flex items-center justify-between bg-surface-container-low/50 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 relative">
             <Bot className="text-primary" size={20} />
             <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse" />
          </div>
          <div>
            <h2 className="font-headline font-bold text-on-surface text-base">Swasthya AI</h2>
            <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Clinical Assistant · Live</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startDemo}
            disabled={isTyping || isAnalysing}
            className="flex items-center gap-2 px-6 py-2 bg-black text-[#FFD700] rounded-xl shadow-xl border-2 border-[#FFD700]/50 hover:bg-[#FFD700] hover:text-black transition-all disabled:opacity-50"
          >
             <Sparkles size={14} />
             <span className="text-[10px] font-black uppercase tracking-widest ">Play Demo</span>
          </motion.button>

          <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant/30">
            <Activity size={12} className="text-primary animate-pulse" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">Synced</span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6 no-scrollbar clinical-grid"
      >
        <AnimatePresence initial={false}>
          {messages.length === 0 && !isAnalysing && !isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col items-center justify-center text-center p-8 gap-6"
            >
               <div className="w-24 h-24 rounded-[2rem] bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                  <Sparkles size={40} className="text-primary animate-pulse" />
               </div>
               <div className="space-y-2">
                  <h3 className="font-headline font-bold text-xl text-on-surface">Experience Swasthya AI</h3>
                  <p className="text-xs font-medium text-on-surface-variant max-w-xs">
                     Witness our multi-agent autonomous diagnostic system in action.
                  </p>
               </div>
               <button 
                 onClick={startDemo}
                 className="px-10 py-4 bg-black text-[#FFD700] rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl border border-white/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
               >
                  <Bot size={18} />
                  Run AI Diagnostic Demo
               </button>
            </motion.div>
          )}

          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div 
                  className={`px-4 py-3 shadow-sm relative ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-[20px_4px_20px_20px]' 
                      : 'bg-white border border-surface-container text-on-surface rounded-[4px_20px_20px_20px]'
                  }`}
                >
                  <p className="font-body text-sm leading-relaxed">{msg.text}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 px-1">
                  <span className="text-[9px] font-bold text-outline uppercase">{msg.time}</span>
                  {msg.sender === 'ai' && <ShieldCheck size={10} className="text-primary" />}
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white border border-surface-container rounded-[4px_20px_20px_20px] p-4 flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                </div>
              </div>
            </motion.div>
          )}

          {isAnalysing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center w-full"
            >
              <div className="bg-surface-container-high/80 backdrop-blur-sm px-6 py-4 rounded-[1.5rem] border border-primary/20 flex flex-col items-center gap-4 w-full max-w-md shadow-xl">
                 <div className="flex items-center gap-3 w-full border-b border-primary/10 pb-3">
                    <div className="w-8 h-8 shrink-0"><Lottie animationData={loadingAnim} loop /></div>
                    <div className="flex-1">
                       <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Executing Pipeline</span>
                       <h4 className="text-xs font-headline font-bold text-on-surface">{agentStatus || "Analysing..."}</h4>
                    </div>
                 </div>

                 {/* Agent Logs */}
                 <div className="w-full space-y-2 max-h-40 overflow-y-auto no-scrollbar font-mono">
                    <AnimatePresence>
                      {agentLogs.map((log, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 text-[9px] text-on-surface-variant/70"
                        >
                           <span className="text-primary/50 text-[8px]">{'>'}</span>
                           <span>{log}</span>
                           {i === agentLogs.length - 1 && <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 h-3 bg-primary/40 inline-block align-middle" />}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                 </div>

                 <div className="w-full h-1 bg-primary/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      className="h-full bg-primary w-1/3 shadow-[0_0_10px_var(--color-primary)]"
                    />
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-surface-container-lowest border-t border-surface-container flex flex-col gap-3">
        {/* Chips */}
        {step === 0 && messages.length === 1 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {INITIAL_SUGGESTIONS.map((sug) => (
              <button 
                key={sug}
                onClick={() => handleSend(sug)}
                className="px-4 py-2 rounded-xl bg-white border border-surface-container hover:border-primary hover:bg-primary/5 text-[11px] font-bold text-on-surface-variant transition-all hover:text-primary whitespace-nowrap active:scale-95"
              >
                {sug}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
            placeholder="Describe your health state..."
            className="flex-1 bg-surface-container-low border border-surface-container rounded-2xl py-4 pl-5 pr-14 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
          <button
            onClick={() => handleSend(inputValue)}
            disabled={!inputValue.trim() || isAnalysing || isTyping}
            className="absolute right-2 fill-primary w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-container transition-all disabled:opacity-50 active:scale-90 shadow-lg shadow-primary/20"
          >
            <Send size={18} />
          </button>
        </div>
        
        <p className="text-[10px] text-center text-outline font-bold uppercase tracking-widest py-1 flex items-center justify-center gap-2">
           <Sparkles size={10} className="text-secondary" />
           Encrypted Medical Check-in powered by Swasthya AI
        </p>
      </div>
    </div>
  );
}
