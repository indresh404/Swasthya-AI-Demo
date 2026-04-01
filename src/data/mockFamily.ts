export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  relation: string;
  riskScore: number;
  riskLevel: "Low" | "Moderate" | "High";
  conditions: string[];
}

export const mockFamily: FamilyMember[] = [
  {
    id: "f1",
    name: "Ramesh Mehta",
    age: 62,
    relation: "Father",
    riskScore: 88,
    riskLevel: "High",
    conditions: ["Cardiac", "Diabetes"],
  },
  {
    id: "f2",
    name: "Sunita Mehta",
    age: 58,
    relation: "Mother",
    riskScore: 54,
    riskLevel: "Moderate",
    conditions: ["Hypertension"],
  },
  {
    id: "f3",
    name: "Priya Mehta",
    age: 28,
    relation: "Sister",
    riskScore: 22,
    riskLevel: "Low",
    conditions: [],
  },
];
