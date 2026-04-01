'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User as UserIcon, Sparkles } from 'lucide-react';
import { mockCheckins } from '@/data/mockCheckins';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import aiPulse from '../../../public/animations/ai_pulse.json';
import loadingAnim from '../../../public/animations/loading.json';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: Date;
}

export default function AIChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial AI message
  useEffect(() => {
    const today = mockCheckins[mockCheckins.length - 1];
    const initialQuestion = today.questions[0] || "How are you feeling today, Arjun?";
    
    setMessages([
      {
        id: '1',
        text: initialQuestion,
        sender: 'ai',
        timestamp: new Date(),
      }
    ]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Mock AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Understood. Can you tell me more about any specific physical symptoms or discomfort you've noticed since this morning?",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="glass-card flex flex-col h-[600px] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-blue-50 flex items-center justify-between bg-white/50 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center relative">
             <div className="absolute inset-0 scale-150 opacity-50">
               <Lottie animationData={aiPulse} loop={true} />
             </div>
             <Sparkles className="w-5 h-5 text-blue-300 relative z-10" />
          </div>
          <div className="ml-3">
             <h4 className="font-bold text-blue-900 text-sm">Swasthya AI Assistant</h4>
             <div className="flex items-center text-[10px] text-green-500 font-bold">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5" />
                Online & Analysing
             </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] flex ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.sender === 'user' ? 'bg-blue-500 ml-2' : 'bg-blue-900 mr-2'
                }`}>
                  {msg.sender === 'user' ? (
                    <UserIcon className="w-4 h-4 text-white" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-blue-300" />
                  )}
                </div>
                
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-blue-50 rounded-tl-none'
                }`}>
                  {msg.text}
                  <div className={`text-[10px] mt-2 opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-blue-50 shadow-sm">
                <div className="w-8 h-4">
                  <Lottie animationData={loadingAnim} loop={true} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI is thinking</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-blue-50">
        <div className="flex items-center space-x-2 bg-slate-100 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-blue-300 transition-all">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your response..."
            className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-sm text-slate-800 placeholder:text-slate-400"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white flex items-center justify-center transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
