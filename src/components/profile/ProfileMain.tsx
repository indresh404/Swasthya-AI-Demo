'use client';

import React from 'react';
import ProfileCard from './ProfileCard';
import FamilyQRCard from './FamilyQRCard';
import FamilyMembersGrid from './FamilyMembersGrid';
import MedicalTimeline from './MedicalTimeline';
import { motion } from 'framer-motion';

export default function ProfileMain() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      {/* Left Column */}
      <div className="space-y-8">
        <motion.div variants={item}>
          <ProfileCard />
        </motion.div>
        
        <motion.div variants={item}>
          <FamilyQRCard />
        </motion.div>

        <motion.div variants={item}>
           <h3 className="text-blue-900 font-bold mb-4">Family Health Group</h3>
           <FamilyMembersGrid />
        </motion.div>
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        <motion.div variants={item}>
           <h3 className="text-blue-900 font-bold mb-4">Medical Timeline</h3>
           <MedicalTimeline />
        </motion.div>
      </div>
    </motion.div>
  );
}
