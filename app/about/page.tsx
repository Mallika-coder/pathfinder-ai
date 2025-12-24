"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Map,
  Brain,
  Siren,
  HeartPulse,
  Compass,
} from "lucide-react";
import Link from "next/link";

export default function AboutPathFinder() {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      {/* ---------- BACKGROUND GLOW ---------- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-1/3 -left-1/3 w-[60%] h-[60%] bg-red-900/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[60%] h-[60%] bg-emerald-900/20 rounded-full blur-[140px]" />
      </div>

      {/* ---------- HEADER ---------- */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
        >
          <ArrowLeft size={18} />
          Home
        </Link>

        <Link
          href="/dashboard"
          className="bg-emerald-500 text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition"
        >
          Live Dashboard
        </Link>
      </header>

      {/* ---------- MAIN ---------- */}
      <main className="relative z-10 pt-44 pb-32 max-w-7xl mx-auto px-6">
        {/* ---------- HERO ---------- */}
        <section className="text-center space-y-10 mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-[11px] font-bold uppercase tracking-widest"
          >
            <Sparkles size={14} />
            About PathFinder AI
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight leading-none"
          >
            When Maps Fail,
            <br />
            <span className="text-emerald-400 drop-shadow-[0_0_40px_rgba(16,185,129,0.4)]">
              Lives Don’t Have To
            </span>
          </motion.h1>

          <p className="max-w-3xl mx-auto text-xl text-slate-300 leading-relaxed">
            PathFinder AI is an emergency navigation intelligence platform built
            for the world’s most vulnerable areas — where traditional GPS,
            addresses, and infrastructure simply do not exist.
          </p>
        </section>

        {/* ---------- CORE PRINCIPLES ---------- */}
        <section className="grid md:grid-cols-3 gap-8 mb-40">
          {[
            {
              icon: <Map size={32} />,
              title: "Unmapped Reality",
              desc: "We operate where Google Maps ends — dense slums, informal settlements, and disaster-hit zones.",
              color: "from-red-500/20",
            },
            {
              icon: <Brain size={32} />,
              title: "AI Reasoning",
              desc: "Our system interprets images, reports, and patterns to predict blockages and guide responders.",
              color: "from-indigo-500/20",
            },
            {
              icon: <Siren size={32} />,
              title: "Seconds Matter",
              desc: "We optimize routes not for distance — but for survival time during emergencies.",
              color: "from-emerald-500/20",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -12 }}
              className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.8rem] p-10 shadow-2xl group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} to-transparent opacity-0 group-hover:opacity-100 transition`}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-black flex items-center justify-center mb-6 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* ---------- MISSION ---------- */}
        <section className="relative mb-40">
          <div className="absolute inset-0 bg-emerald-500/10 blur-[120px] rounded-full" />
          <div className="relative bg-slate-950/70 border border-white/10 rounded-[3.5rem] p-10 md:p-20">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Our Mission
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Emergency services should not fail simply because a community
                  was never officially mapped.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed">
                  PathFinder AI empowers responders with real-time intelligence
                  built from community reports, AI vision, and adaptive routing —
                  turning chaos into clarity.
                </p>

                <div className="flex gap-4 flex-wrap pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-bold uppercase">
                    <ShieldCheck size={14} />
                    Trust First
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold uppercase">
                    <HeartPulse size={14} />
                    Human-Centered
                  </div>
                </div>
              </div>

              {/* Visual */}
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="h-48 bg-slate-900 rounded-3xl border border-red-500/30 flex flex-col items-center justify-center"
                >
                  <Siren className="text-red-500 mb-3" size={40} />
                  <span className="text-xs uppercase tracking-widest text-white/40">
                    Emergency Signals
                  </span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="h-48 bg-slate-900 rounded-3xl border border-emerald-500/30 flex flex-col items-center justify-center"
                >
                  <Compass className="text-emerald-500 mb-3" size={40} />
                  <span className="text-xs uppercase tracking-widest text-white/40">
                    Smart Routing
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-white/90">
            Ready to see PathFinder AI in action?
          </h2>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 px-12 py-5 bg-emerald-500 text-black font-extrabold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition shadow-[0_20px_50px_rgba(16,185,129,0.35)]"
          >
            Launch Live System
            <Compass size={16} />
          </Link>
        </section>
      </main>
    </div>
  );
}
