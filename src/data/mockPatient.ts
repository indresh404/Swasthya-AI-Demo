export interface Patient {
  name: string;
  age: number;
  gender: string;
  city: string;
  riskScore: number;
  conditions: string[];
  allergies: string[];
  medications: string[];
  incomeCategory: "low" | "middle" | "high";
  healthIndices: {
    brain: number;
    heart: number;
    lungs: number;
    digestive: number;
  };
}

export const mockPatient: Patient = {
  name: "Arjun Mehta",
  age: 34,
  gender: "Male",
  city: "Mumbai",
  riskScore: 67,
  conditions: ["Hypertension", "Pre-diabetes"],
  allergies: ["Penicillin"],
  medications: ["Metformin 500mg", "Amlodipine 5mg"],
  incomeCategory: "middle",
  healthIndices: {
    brain: 82,
    heart: 74,
    lungs: 88,
    digestive: 65,
  },
};
