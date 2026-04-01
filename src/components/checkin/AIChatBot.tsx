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
  const scrollRef = useRef<HTMLDivElement>(null);

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
  }, [messages, isAnalysing]);

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

  return (
    <div className="bg-surface-container-lowest rounded-3xl shadow-lg border border-surface-container h-[600px] flex flex-col overflow-hidden relative">
      {/* Header */}
      <header className="px-6 py-4 border-b border-surface-container flex items-center justify-between bg-surface-container-low/50 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 relative">
             <Bot className="text-primary" size={20} />
             <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse" />
          </div>
          <div>
            <h2 className="font-headline font-bold text-on-surface text-base">Swasthya AI</h2>
            <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Medical Assistant · Live</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant/30">
          <Activity size={12} className="text-primary animate-pulse" />
          <span className="text-[10px] font-bold text-primary">SYNCED</span>
        </div>
      </header>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6 no-scrollbar clinical-grid"
      >
        <AnimatePresence initial={false}>
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
              className="flex justify-center"
            >
              <div className="bg-surface-container-high/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 flex items-center gap-3">
                 <div className="w-6 h-6 shrink-0"><Lottie animationData={loadingAnim} loop /></div>
                 <span className="text-[11px] font-bold text-primary uppercase tracking-widest">Analysing health markers...</span>
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
        
        <p className="text-[9px] text-center text-outline font-bold uppercase tracking-widest py-1 flex items-center justify-center gap-2">
           <Sparkles size={10} className="text-secondary" />
           Encrypted Medical Check-in powered by Swasthya AI
        </p>
      </div>
    </div>
  );
}
