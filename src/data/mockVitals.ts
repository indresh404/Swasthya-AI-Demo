export interface Vital {
  date: string;
  heartRate: number;
  spo2: number;
  steps: number;
  sleep: number;
  stress: number;
}

const generateVitals = (): Vital[] => {
  const vitals: Vital[] = [];
  const start = new Date("2026-03-01");
  
  for (let i = 0; i < 31; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    
    vitals.push({
      date: date.toISOString().split('T')[0],
      heartRate: 68 + Math.floor(Math.random() * 14), // 68-82
      spo2: 96 + Math.floor(Math.random() * 4), // 96-99
      steps: 4000 + Math.floor(Math.random() * 6000),
      sleep: 5.5 + Math.random() * 2.5, // 5.5-8h
      stress: 20 + Math.floor(Math.random() * 40),
    });
  }
  return vitals;
};

export const mockVitals = generateVitals();
