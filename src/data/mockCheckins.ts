export interface Checkin {
  date: string;
  questions: string[];
  answers: Record<string, string>;
  severity: "Normal" | "Watch" | "Flagged";
  summary: string;
}

export const mockCheckins: Checkin[] = [
  {
    date: "2026-03-26",
    questions: ["How are you feeling?", "Any pain?", "Sleep quality?"],
    answers: { "How are you feeling?": "Good", "Any pain?": "None", "Sleep quality?": "Well" },
    severity: "Normal",
    summary: "Routine check-in, no issues.",
  },
  {
    date: "2026-03-27",
    questions: ["How are you feeling?", "Any pain?", "Sleep quality?"],
    answers: { "How are you feeling?": "Okay", "Any pain?": "Lower back pain", "Sleep quality?": "Fair" },
    severity: "Watch",
    summary: "Reported lower back pain.",
  },
  {
    date: "2026-03-28",
    questions: ["How are you feeling?", "Any pain?", "Sleep quality?"],
    answers: { "How are you feeling?": "Better", "Any pain?": "Slight back pain", "Sleep quality?": "Good" },
    severity: "Watch",
    summary: "Back pain persisting.",
  },
  {
    date: "2026-03-29",
    questions: ["How are you feeling?", "Any pain?", "Sleep quality?"],
    answers: { "How are you feeling?": "Good", "Any pain?": "None", "Sleep quality?": "Well" },
    severity: "Normal",
    summary: "No issues.",
  },
  {
    date: "2026-03-30",
    questions: ["How are you feeling?", "Any pain?", "Sleep quality?"],
    answers: { "How are you feeling?": "Great", "Any pain?": "None", "Sleep quality?": "Excellent" },
    severity: "Normal",
    summary: "No issues.",
  },
  {
    date: "2026-03-31",
    questions: ["How are you feeling?", "Any pain?", "Sleep quality?"],
    answers: { "How are you feeling?": "Okay", "Any pain?": "None", "Sleep quality?": "Okay" },
    severity: "Normal",
    summary: "Missed Metformin.",
  },
  {
    date: "2026-04-01",
    questions: ["How are you feeling?", "Any pain?", "Sleep quality?"],
    answers: {},
    severity: "Normal",
    summary: "Awaiting today's check-in.",
  },
];
