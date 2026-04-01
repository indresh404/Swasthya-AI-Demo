import { create } from 'zustand';

type Section = 'dashboard' | 'checkin' | 'medicine' | 'profile';

interface SectionStore {
  activeSection: Section;
  isBodyMapOpen: boolean;
  setActiveSection: (section: Section) => void;
  setBodyMapOpen: (isOpen: boolean) => void;
}

export const useSection = create<SectionStore>((set) => ({
  activeSection: 'dashboard',
  isBodyMapOpen: false,
  setActiveSection: (section) => set({ activeSection: section }),
  setBodyMapOpen: (isOpen) => set({ isBodyMapOpen: isOpen }),
}));
