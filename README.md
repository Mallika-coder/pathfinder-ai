📍 PathFinder AI
by Sprint Sisters

Mapping the Unmapped. Saving the Unseen.

🌍 Problem Statement

Over 1.1 billion people live in informal or unmapped settlements where:

Lanes are too narrow for ambulances

Roads are blocked dynamically (fires, carts, debris)

Traditional GPS routes fail during emergencies

Recent incidents like the 2025 Kolkata & Bangladesh slum fires showed that minutes lost = lives lost.

🚑 Solution: PathFinder AI

PathFinder AI is a real-time emergency navigation system that combines community intelligence + multimodal AI + live maps to guide ambulances and fire services through previously unmapped, high-risk areas.

Local residents act as “Sentinels”, uploading real-time photos of lanes.
These images are analyzed by Google Gemini 1.5 Pro, which determines whether a path is ambulance-accessible or blocked, and updates routes instantly for responders.

🧠 How It Works (End-to-End Flow)

Sentinel Upload

Resident taps one button

Takes a photo (auto GPS attached)

No forms, no typing

AI Lane Analysis

Google Gemini 1.5 Pro (Vision + Reasoning)

Detects:

Lane width

Obstacles (debris, carts, construction)

Ambulance readiness (Yes / No)

Real-Time Sync

Images → Firebase Cloud Storage

AI results → Firestore

Updates pushed live to all responders

Responder Dashboard

Google Maps with tactical overlays

Standard GPS route vs PathFinder AI Verified Route

Color-coded lanes:

🔴 Blocked

🟢 Ambulance-Ready

🔵 Ambulance Live Location

Immutable Audit Log (Blockchain)

Emergency reports hashed & stored on Polygon

Ensures transparency, prevents tampering

Useful for post-incident analysis & governance

✨ Key Features
🧍 Sentinel Mode (Residents)

Mobile-first UI

One-tap emergency photo upload

Auto geolocation

Panic-free UX

🚒 Responder Mode (Ambulance / Fire)

High-contrast dark mode map

AI-verified safe routes

Live rerouting as conditions change

Gemini “Why This Route?” insight (≤10 words)

🤖 AI Lane Intelligence

Multimodal image understanding

Structured JSON output:

{
  "ambulance_ready": false,
  "lane_width_estimate_m": 1.4,
  "obstacles": ["Construction debris", "Parked cart"],
  "summary": "Lane too narrow for ambulance"
}

🔥 Real-Time Coordination

Firebase Firestore live listeners

Zero-latency updates for responders

🛠 Tech Stack
Frontend

Next.js 14 (App Router)

Tailwind CSS (Crisis Response Theme)

Framer Motion (subtle motion for clarity)

AI / ML

Google Gemini 1.5 Pro

Multimodal vision + reasoning

Real-time lane analysis

Backend & Infra

Firebase Firestore – real-time data sync

Firebase Cloud Storage – image storage

Mapping

Google Maps JavaScript API

Custom tactical overlays & markers

Blockchain

Polygon

Immutable audit trail for emergency reports

📊 Impact Metrics (Simulated for Demo)

⏱️ Average response time reduced: 12–18 minutes

🚑 Active Sentinels: 100+

❤️ Estimated lives saved: 30+

🧩 Project Structure
pathfinder-ai/
├── app/
├── components/
│   ├── MapDashboard.tsx
│   ├── SentinelUpload.tsx
│   ├── GeminiInsightCard.tsx
│   └── AnalyticsPanel.tsx
├── lib/
│   ├── firebase.ts
│   ├── geminiAnalyzer.ts
│   └── mapUtils.ts
├── api/
│   └── analyze-image/
├── public/
└── tailwind.config.ts

🚀 Getting Started (Local Setup)
git clone https://github.com/Mallika-coder/pathfinder-ai
cd pathfinder-ai
npm install
npm run dev

Environment Variables
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
GEMINI_API_KEY=
FIREBASE_API_KEY=
POLYGON_RPC_URL=

🏆 Why PathFinder AI Matters

Designed for informal settlements

Built for panic situations

Uses real multimodal AI

Community-powered, not satellite-dependent

Ready for NGOs, municipalities, and disaster response teams

👩‍🚀 Team

Sprint Sisters
Building technology that reaches where maps don’t.
