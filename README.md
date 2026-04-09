---

# 🧠 Swasthya AI — Preventive Healthcare Intelligence Platform

## 🚀 Overview

**Swasthya AI** is an AI-powered, event-driven preventive healthcare platform designed to transform reactive healthcare into proactive health monitoring.

It enables continuous health tracking through conversational AI, risk prediction, and intelligent doctor-patient collaboration — ensuring early detection, improved outcomes, and accessible healthcare for all.

---

## 🎯 One-Line Pitch

> A memory-aware AI healthcare system that continuously monitors patient health, predicts risks, prevents medication conflicts, and autonomously connects doctors and patients before conditions become critical.

---

## 🧩 Problem Statement

Healthcare today is:

* ❌ Reactive (patients seek help after symptoms worsen)
* ❌ Fragmented (no unified patient or family health data)
* ❌ Time-constrained (doctors lack full context)
* ❌ Unsafe (drug interactions often ignored)
* ❌ Inaccessible (patients unaware of government support)

---

## 💡 Solution

Swasthya AI introduces:

* 🧠 Memory-aware conversational AI
* 📊 Continuous health monitoring
* ⚠️ Early risk detection
* 👨‍⚕️ Doctor intelligence dashboard
* 🏥 Government scheme awareness
* 👨‍👩‍👧‍👦 Family health intelligence

---

## 🔑 Core Features

### 🧍 Patient Side

#### 1. 🤖 Conversational AI Health Assistant

* Natural chat-based interaction (no forms)
* Understands patient history
* References past symptoms
* Personalized follow-up questions

---

#### 2. 📅 Daily AI Check-In

* AI-generated personalized questions
* Based on:

  * Past symptoms
  * Conditions
  * Wearable data
* Tracks daily health changes

---

#### 3. 🧠 Smart Symptom Extraction

* Converts natural language into structured data:

```json
{
  "symptom": "stomach pain",
  "severity": 6,
  "duration": "2 hours",
  "zone": "stomach"
}
```

---

#### 4. 📊 Risk Score Engine

* Combines:

  * Symptoms
  * Conditions
  * Adherence
  * Family history
* Produces:

  * Risk score (0–100)
  * Risk level
  * Explanation
  * Confidence score

---

#### 5. 🧍‍♂️ Body Heatmap (Visual Health)

* Color-coded body zones
* Shows where risk is concentrated
* Real-time updates

---

#### 6. 💊 Drug Interaction Detection

* Prevents unsafe medicine combinations
* Provides:

  * Severity level
  * Explanation
  * Recommendation

---

#### 7. ⏱️ Medicine Adherence Tracking

* Tracks missed medicines
* Alerts doctor if critical meds skipped
* Adjusts reminder timing automatically

---

#### 8. 🧬 Family Health Intelligence

* Shared family health overview
* Detects:

  * Common symptoms
  * Environmental risks
* Maintains individual privacy

---

#### 9. 🏥 Government Scheme Matching

* Suggests schemes based on:

  * Condition
  * Age
  * Income
* Includes:

  * Eligibility
  * Coverage
  * Required documents

---

---

### 👨‍⚕️ Doctor Dashboard

#### 1. 🌅 Morning Briefing Card

* Auto-generated summary
* Shows:

  * High-risk patients
  * Alerts
  * Priorities

---

#### 2. 📊 Patient Health Analytics

* Risk trends
* Symptom history
* Adherence logs
* Heatmap visualization

---

#### 3. 🧾 AI-Generated 7-Day Summary

* Complete patient overview in seconds
* Includes:

  * Symptoms evolution
  * Risk changes
  * Alerts

---

#### 4. 💬 Doctor-AI QnA System

* Ask questions like:

  * “How long has this symptom existed?”
* If answer not found:

  * System asks patient automatically
  * Updates doctor when answered

---

#### 5. 🔁 Async QnA Loop (Key Innovation)

* Doctor → Question → Patient → Answer → Doctor notified
* No manual coordination required

---

---

## 🏗️ System Architecture

### ⚡ Architecture Principle

```
n8n → Orchestration (WHEN & WHERE)
FastAPI → Logic & AI (WHAT)
LLM (Groq) → Reasoning
Supabase → Data Storage
```

---

## 🧠 AI System Design

### Multi-Agent Concept (Simplified)

| Agent         | Role                    |
| ------------- | ----------------------- |
| Patient Agent | Chat + symptom tracking |
| Safety Agent  | Risk detection + alerts |
| Doctor Agent  | Summaries + QnA         |

---

## 🔄 Data Flow

1. Patient sends message
2. n8n triggers FastAPI
3. FastAPI:

   * Generates response
   * Extracts symptom
4. Data saved to DB
5. Session ends → Summary generated
6. Risk score calculated
7. If critical → Doctor notified

---

## 🧮 Risk Scoring System

### Step 1: Base Score (Logic)

* Conditions → +15 each
* Severe symptoms → +20
* Missed meds → +15
* Family history → +10

---

### Step 2: AI Adjustment

* LLM adjusts score ±15
* Based on medical guidelines

---

### Step 3: Confidence Score

```
confidence = 
(history_days/7)*40 + 
(symptoms_count/10)*40 + 
(profile_completeness*20)
```

---

## 🧠 NLP & AI Capabilities

* Context-aware conversations
* Memory-based reasoning
* Structured JSON outputs
* Symptom extraction
* Clinical summarization

---

## 🧾 Tech Stack

### 🖥️ Backend

* Python (FastAPI)
* Pydantic (validation)
* httpx (API calls)

---

### ⚙️ Orchestration

* n8n (workflow automation)

---

### 🧠 AI Layer

* Groq (LLaMA 3.3)
* LangChain (RAG pipeline)
* Sentence Transformers

---

### 🗄️ Database

* Supabase (PostgreSQL)
* Real-time sync

---

### 📱 Frontend

* React Native (patient app)
* Next.js (doctor dashboard)

---

### 📊 Visualization

* SVG / Three.js (heatmap)

---

### 🔗 Integrations

* OpenFDA (drug interactions)
* Firebase (auth + notifications)
* Wearables (Google Fit / Apple Health)

---

## 🔍 RAG System

* Uses WHO & ICMR guidelines
* Vector DB: FAISS / Chroma
* Enables:

  * Explainable risk scoring
  * Evidence-backed decisions

---

## 🔐 System Safety Rules

* No raw LLM output stored
* All outputs validated via schema
* Risk scoring is NOT fully AI-based
* Doctor answers must include source
* No hallucination allowed

---

## 🧪 Hackathon Demo Scope

### ✅ Implement:

* Chat with memory
* Symptom extraction
* Daily summary
* Risk scoring
* Doctor QnA
* Async QnA loop

---

### ⚠️ Mock:

* Wearables
* Heatmap
* Schemes

---

## 🏆 Key Differentiators

* 🔁 Async Doctor-Patient loop
* 🧠 Memory-aware AI
* 📊 Explainable risk scoring
* 👨‍👩‍👧‍👦 Family intelligence
* ⚠️ Preventive alerts (not reactive)

---

## 🚀 Future Scope

* Real wearable integration
* Advanced RAG with more datasets
* Multi-language support
* Predictive disease modeling
* Hospital integration

---

## 📌 Conclusion

Swasthya AI is not just a healthcare app —
it is a **continuous health intelligence system** that bridges the gap between patients, doctors, and data.

---

## ⚡ Built For

**Smart India Hackathon**
Preventive Healthcare Track

---



Just tell me 👍
