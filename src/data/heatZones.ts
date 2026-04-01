export interface HeatZoneData {
  id: string;
  name: string;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  symptoms: string[];
  lastLogged: string;
  aiRecommendation: string;
  color: string;
  position: [number, number, number];
}

export const HEAT_ZONES: HeatZoneData[] = [
  {
    id: "head",
    name: "Brain & Neural",
    riskLevel: "Low",
    symptoms: ["Occasional fatigue", "Mild headache"],
    lastLogged: "Apr 1, 2026",
    aiRecommendation: "Ensure 7-8 hours of sleep. Neural activity is within normal range.",
    color: "#10B981", // green
    position: [0, 1.25, 0.05]
  },
  {
    id: "heart",
    name: "Cardiovascular",
    riskLevel: "Moderate",
    symptoms: ["Elevated heart rate", "Mild palpitations"],
    lastLogged: "Apr 1, 2026",
    aiRecommendation: "Cardiovascular markers show moderate risk. Monitor BP and reduce sodium intake.",
    color: "#EAB308", // yellow
    position: [-0.08, 0.55, -0.18]
  },
  {
    id: "abdomen",
    name: "Digestive System",
    riskLevel: "High",
    symptoms: ["Bloating", "Acid reflux", "Lower abdominal pain"],
    lastLogged: "Mar 30, 2026",
    aiRecommendation: "Digestive strain detected. Avoid spicy foods and process consultation for gut health.",
    color: "#F97316", // orange
    position: [0, 0.25, 0.12]
  },
  {
    id: "knee",
    name: "Joints & Mobility",
    riskLevel: "Low",
    symptoms: ["Morning stiffness"],
    lastLogged: "Mar 28, 2026",
    aiRecommendation: "Joint health is stable. Maintain regular stretching exercises.",
    color: "#10B981", // green
    position: [0.08, -0.50, 0.05]
  }
];

export const HEAT_POINTS_CONFIG = HEAT_ZONES.map(zone => ({
  id: zone.id,
  position: zone.position,
  color: zone.color,
  intensity: zone.riskLevel === 'High' ? 1.2 : zone.riskLevel === 'Moderate' ? 0.8 : 0.4
}));