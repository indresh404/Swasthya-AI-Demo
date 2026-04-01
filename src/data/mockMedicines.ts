export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string; // once, twice, thrice
  times: string[]; // e.g. ["8:00 AM", "8:00 PM"]
  active: boolean;
  takenToday: boolean;
}

export const mockMedicines: Medicine[] = [
  {
    id: "1",
    name: "Metformin",
    dosage: "500mg",
    frequency: "twice",
    times: ["8:00 AM", "8:00 PM"],
    active: true,
    takenToday: true,
  },
  {
    id: "2",
    name: "Amlodipine",
    dosage: "5mg",
    frequency: "once",
    times: ["9:00 AM"],
    active: true,
    takenToday: true,
  },
  {
    id: "3",
    name: "Aspirin",
    dosage: "75mg",
    frequency: "once",
    times: ["9:00 AM"],
    active: true,
    takenToday: false,
  },
  {
    id: "4",
    name: "Atorvastatin",
    dosage: "10mg",
    frequency: "once",
    times: ["9:00 PM"],
    active: true,
    takenToday: false,
  },
];
