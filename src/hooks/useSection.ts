import { useState } from 'react';

export type Section = 'dashboard' | 'checkin' | 'medicine' | 'profile' | 'aichat';

export function useSection() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [bodyMapOpen, setBodyMapOpen] = useState(false);

  return { 
    activeSection, 
    setActiveSection, 
    bodyMapOpen, 
    setBodyMapOpen 
  };
}
