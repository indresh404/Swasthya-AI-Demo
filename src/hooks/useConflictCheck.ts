'use client';

import { useState } from 'react';

export interface Conflict {
  severity: 'Caution' | 'Warning' | 'Critical';
  description: string;
  interactingDrug: string;
}

export const useConflictCheck = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [conflict, setConflict] = useState<Conflict | null>(null);

  const checkConflict = async (medicineName: string): Promise<Conflict | null> => {
    setIsChecking(true);
    // Mock check delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let foundConflict: Conflict | null = null;
    
    // Example: Ibuprofen + Aspirin conflict
    if (medicineName.toLowerCase().includes('ibuprofen')) {
      foundConflict = {
        severity: 'Caution',
        description: "Ibuprofen + Aspirin may reduce effectiveness of antiplatelet action. Consult your doctor before adding.",
        interactingDrug: "Aspirin"
      };
    }

    setConflict(foundConflict);
    setIsChecking(false);
    return foundConflict;
  };

  return { 
    checkConflict, 
    isChecking, 
    conflict,
    clearConflict: () => setConflict(null)
  };
};
