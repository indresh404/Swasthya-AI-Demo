'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { useSection } from '@/hooks/useSection';
import dynamic from 'next/dynamic';

// Placeholder sections (to be built)
const Dashboard = dynamic(() => import('@/components/dashboard/DashboardMain'), { ssr: false });
const Checkin = dynamic(() => import('@/components/checkin/CheckinMain'), { ssr: false });
const Medicines = dynamic(() => import('@/components/medicine/MedicineMain'), { ssr: false });
const Profile = dynamic(() => import('@/components/profile/ProfileMain'), { ssr: false });
const BodyMapPanel = dynamic(() => import('@/components/bodymap/BodyMapPanel'), { ssr: false });

export default function Home() {
  const { activeSection, isBodyMapOpen, setBodyMapOpen } = useSection();

  return (
    <AppShell>
      {activeSection === 'dashboard' && <Dashboard />}
      {activeSection === 'checkin' && <Checkin />}
      {activeSection === 'medicine' && <Medicines />}
      {activeSection === 'profile' && <Profile />}
      
      {isBodyMapOpen && <BodyMapPanel onClose={() => setBodyMapOpen(false)} />}
    </AppShell>
  );
}
