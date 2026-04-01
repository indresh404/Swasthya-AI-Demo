export interface Scheme {
  id: string;
  name: string;
  category: string[];
  coverage: string;
  eligibility: string;
  documents: string[];
  hospitals: { name: string; distance: string }[];
}

export const schemes: Scheme[] = [
  {
    id: "s1",
    name: "Ayushman Bharat PM-JAY",
    category: ["Cardiac", "Cancer", "Renal"],
    coverage: "₹5 Lakh/year",
    eligibility: "BPL / Low Income Families",
    documents: ["Aadhar", "Ration Card", "Income Certificate"],
    hospitals: [
      { name: "Surya Multispeciality", distance: "2.4 km" },
      { name: "City General Hospital", distance: "4.1 km" },
      { name: "Hinduja Memorial", distance: "5.8 km" }
    ]
  },
  {
    id: "s2",
    name: "Rashtriya Arogya Nidhi (RAN)",
    category: ["Cardiac", "Cancer", "Life-threatening"],
    coverage: "Up to ₹15 Lakh",
    eligibility: "BPL patients in Government Hospitals",
    documents: ["BPL Certificate", "Hospital Referral Letter"],
    hospitals: [
      { name: "KEM Hospital", distance: "3.2 km" },
      { name: "JJ Hospital", distance: "6.5 km" }
    ]
  },
  {
    id: "s3",
    name: "Pradhan Mantri Jan Arogya Yojana",
    category: ["1,393+ Treatment Packages"],
    coverage: "₹5 Lakh/family/year",
    eligibility: "SECC Listed Families",
    documents: ["Aadhar Card", "PMJAY e-Card"],
    hospitals: [
      { name: "All Empaneled Hospitals", distance: "Various" }
    ]
  },
  {
    id: "s4",
    name: "Maharashtra MJPJAY",
    category: ["996 Procedures including Cardiac"],
    coverage: "₹1.5 Lakh - ₹2.5 Lakh",
    eligibility: "Maharashtra Residents",
    documents: ["Aadhar", "Domicile Certificate"],
    hospitals: [
      { name: "Lilavati Hospital", distance: "7.1 km" },
      { name: "Fortis Mulund", distance: "12.3 km" }
    ]
  }
];
