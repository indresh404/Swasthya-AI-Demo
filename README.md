### Swasthya Al - Family-Centric Preventive Healthcare Platform

![Next.js Demo](https://img.shields.io/badge/Demo-Next_js-blue.svg)
[![Target Platform](https://img.shields.io/badge/Target-React_Native-61DAFB?logo=react)](https://reactnative.dev)
![AI Agents](https://img.shields.io/badge/AI-Agentic_Pipeline-8A2BE2)
![n8n](https://img.shields.io/badge/Workflow-n8n-orange?logo=n8n&logoColor=white)

> **One-Line Pitch:** A family-centric preventive health platform where an agentic Al pipeline learns your complete health story, maps your body's risk zones in real time, detects medicine conflicts, and connects patients to government healthcare schemes autonomously.

## The Problem: Reactive vs. Preventive Healthcare today is **reactive**. Doctors only see the patient when damage has already occurred.

- **The Invisible Gap:** Chronic conditions (Diabetes, Hypertension) build up in the months between doctor visits.

**The Family Blind Spot:** Genetic and environmental risks are stored in disconnected paper files.

- **The Consultation Gap:** Doctors get 10 minutes to gather months of context.

**The Medication Danger:** OTC medication leads to dangerous drug-drug interactions (e.g., Metformin + Ibuprofen).

**The Financial Gap:** Patients are often unaware of government schemes (PM-JAY, RAN) that cover their critical treatments.

## The Solution

Swasthya Al is a **two-sided health intelligence system** powered by an autonomous agentic pipeline. It bridges the gap between daily vitals and clinical action.
### For Patients (Mobile App)

- **Conversational Onboarding:** No forms. A smart Al

builds your profile through natural dialogue. - **Daily Al Check-ins:** Personality-driven follow-ups based on your conditions and wearable data. - **Dynamic Body Heatmap:** A real-time SVG/3D visualization of your body's risk zones.

- **Scheme Eligibility Engine:** One-tap matching with government healthcare schemes (Ayushman Bharat, etc.). **Medicine Safety:** Real-time conflict detection and adaptive reminders.

### For Doctors (Web Dashboard)

**Morning Briefing Card:** An Al-generated summary of

high-risk patients to prioritize today. - **Family QR System:** One scan unlocks a unified family risk profile while maintaining individual privacy. - **7-Day Patient Summary:** A structured RAG-grounded briefing that saves 10 minutes of consultation time. - **Clinical Natural Language Query:** Ask "Has this patient's blood pressure trended up since their last visit?" and get verified answers.

## The Agentic Al Pipeline

Three autonomous agents share a single **Patient Context Store**, operating without manual triggers:

1. **Patient Agent:** Handles daily check-ins, symptom extraction, and updates the Body Heatmap.

2. **Safety Agent:** Monitors drug-drug interactions via

OpenFDA and tracks medicine adherence streaks.

3. **Doctor Agent:** Generates morning briefings, creates 7-day summaries, and answers clinical queries using RAG (Retrieval-Augmented Generation) grounded in WHO/ICMR guidelines.
Key Innovations

### 1. RAG-Augmented Risk Reasoner Instead of a simple percentage, our Al provides a **Clinical Rationale**. It retrieves data from ICMR/WHO guidelines to explain *why* a patient is at high risk, making the Al trustworthy for doctors.

### 2. The Family QR System

A single QR code for the entire household. It allows doctors to see the "Genetic Context" (e.g., family history of Hypertension) without violating the private conversation logs of individual family members.

### 3. Scheme Discovery Engine

Automates the discovery of medical financial aid. When a cardiac risk is flagged, the app instantly reveals nearby empanelled hospitals and eligibility for **PM-JAY** or **Rashtriya Arogya Nidhi**

---

## **Frontend**

* **React Native** → Mobile app (iOS & Android)
* **React.js / Next.js** → Doctor web dashboard
* **Three.js / React Three Fiber** → 3D body heatmap
* **SVG / D3.js** → 2D body heatmap fallback / interactive zones
* **Expo** → Optional for faster React Native development

---

## **Backend & Orchestration**

* **Python (FastAPI / Flask)** → Core AI agents (Patient Agent, Safety Agent, Doctor Agent)
* **n8n** → Workflow orchestration for async tasks, reminders, scheme notifications, adherence monitoring
* **Firebase** → Realtime database for chat logs, vitals, daily check-ins, user authentication, push notifications
* **PostgreSQL / Supabase** → Structured storage for medical records, medications, family groups

---

## **AI / NLP / Risk Scoring**

* **Hugging Face Transformers** → NLP for conversational onboarding, symptom extraction, QnA
* **LangChain / RAG pipeline** → Grounded risk scoring & clinical rationale using WHO / ICMR guidelines
   * **OpenFDA API** → Medicine conflict detection (drug-drug interactions)
* **Python agents** → Continuous monitoring for vitals anomalies, adherence, and high-risk alerts

---

## **Wearables / Integrations**

* **Apple HealthKit / Google Fit / BLE devices** → Wearable vitals integration
* **Push notifications** → Daily AI check-ins, medicine reminders

---

## **DevOps / Hosting**

* **Vercel / Netlify** → Web dashboard hosting
* **Firebase Hosting** → Mobile backend endpoints & notifications
* **Docker + AWS / GCP / Azure** → Python AI agents & workflows
* **GitHub Actions / CI-CD pipelines** → Automatic deployment

---

## **Summary Workflow**

1. **Patient app:** React Native + 2D/3D heatmap → daily AI chat → structured symptoms → body zone updates → risk score
2. **AI agents:** Python → Patient Agent, Safety Agent, Doctor Agent → monitor adherence, medicines, vitals
3. **Doctor dashboard:** React web → scan QR → see patient/family → heatmap + seven-day AI summary + QnA
4. **RAG risk reasoner:** LangChain + Hugging Face → clinical guideline-grounded risk scoring
5. **Medicine conflicts:** OpenFDA API check at prescription/addition

---

💡 **Key design choice:**

* 2D SVG heatmap for **daily dynamic interaction**
* 3D body heatmap as **visual enhancement**, static or semi-dynamic for now
* Hugging Face for NLP / QnA / symptom parsing
* n8n for **automation & orchestration** between agents and Firebase

---
