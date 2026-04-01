export interface MedicalRecord {
  date: string;
  doctor: string;
  description: string;
  type: "checkup" | "lab" | "prescription" | "cardiology" | "uploaded";
}

export const mockRecords: MedicalRecord[] = [
  {
    date: "Mar 28, 2026",
    doctor: "Dr. Sharma",
    description: "Hypertension checkup · BP 142/88",
    type: "checkup",
  },
  {
    date: "Mar 15, 2026",
    doctor: "Lab Results",
    description: "HbA1c 6.2% (Pre-diabetic range)",
    type: "lab",
  },
  {
    date: "Feb 20, 2026",
    doctor: "Prescription",
    description: "Metformin 500mg added",
    type: "prescription",
  },
  {
    date: "Jan 10, 2026",
    doctor: "Cardiology",
    description: "ECG Normal",
    type: "cardiology",
  },
  {
    date: "Dec 5, 2025",
    doctor: "Uploaded",
    description: "Old prescription photo",
    type: "uploaded",
  },
  {
    date: "Nov 18, 2025",
    doctor: "Dr. Patel",
    description: "Annual checkup",
    type: "checkup",
  },
];
