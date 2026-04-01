'use client';

import React from 'react';
import RiskSpeedometer from './RiskSpeedometer';
import HealthSummaryCard from './HealthSummaryCard';
import BodySystemCards from './BodySystemCards';
import VitalsGraph from './VitalsGraph';
import RiskTrendChart from './RiskTrendChart';
import SchemesBanner from './SchemesBanner';
import { motion } from 'framer-motion';

export default function DashboardMain() {
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
      className="space-y-8"
    >
      {/* Row 1: Hero area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={item} className="lg:col-span-2">
          <RiskSpeedometer />
        </motion.div>
        <motion.div variants={item} className="lg:col-span-1">
          <HealthSummaryCard />
        </motion.div>
      </div>

      {/* Row 2: Body Systems */}
      <motion.div variants={item}>
        <BodySystemCards />
      </motion.div>

      {/* Row 3: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={item} className="lg:col-span-2">
          <VitalsGraph />
        </motion.div>
        <motion.div variants={item} className="lg:col-span-1">
          <RiskTrendChart />
        </motion.div>
      </div>

      {/* Row 4: Schemes */}
      <motion.div variants={item}>
        <SchemesBanner />
      </motion.div>
    </motion.div>
  );
}
