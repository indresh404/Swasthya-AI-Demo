'use client';

import React from 'react';
import { 
  Bell, 
  Search, 
  Calendar as CalendarIcon,
  ChevronDown 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function TopBar() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-blue-100 px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex flex-col">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-blue-900"
        >
          Good morning, Arjun 👋
        </motion.h1>
        <div className="flex items-center text-slate-500 text-sm mt-1">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span>{currentDate}</span>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Search */}
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 w-4 h-4 transition-colors" />
          <input 
            type="text" 
            placeholder="Search health records..." 
            className="pl-10 pr-4 py-2 bg-blue-50/50 hover:bg-blue-50 border border-transparent focus:border-blue-300 rounded-full text-sm w-64 outline-none transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
          <div className="flex flex-col items-end mr-1">
            <span className="font-semibold text-sm text-blue-900">Arjun Mehta</span>
            <span className="text-xs text-slate-500 bg-blue-50 px-2 py-0.5 rounded-full mt-0.5">Middle Income</span>
          </div>
          <button className="flex items-center group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg transition-all">
              AM
            </div>
            <ChevronDown className="w-4 h-4 ml-2 text-slate-400 group-hover:text-blue-500 transition-all" />
          </button>
        </div>
      </div>
    </header>
  );
}
