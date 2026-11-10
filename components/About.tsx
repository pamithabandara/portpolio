"use client";

import React from "react";
import Image from "next/image";
import {
  GraduationCap,
  Briefcase,
  BarChart,
  Database,
  Binary,
  CheckCircle2,
  Workflow,
  Sparkles,
} from "lucide-react";
import { ProfileData } from "@/lib/types";

interface AboutProps {
  profile: ProfileData;
}

export default function About({ profile }: AboutProps) {
  const highlights = [
    {
      icon: <GraduationCap className="w-5 h-5 text-sky-400" />,
      title: "BSc in Statistics & Computer Science",
      subtitle: "University of Kelaniya (2023–2026)",
      desc: "Strong academic foundation in statistical inference, experimental design, regression modeling, and computer science principles.",
    },
    {
      icon: <Briefcase className="w-5 h-5 text-cyan-400" />,
      title: "MAS Fabrics – Matrix Experience",
      subtitle: "Data Analyst Intern (Thulhiriya)",
      desc: "Hands-on experience in manufacturing plant analytics, FTT tracking, Lean improvement initiatives, and cross-stage inspection modeling.",
    },
    {
      icon: <BarChart className="w-5 h-5 text-amber-400" />,
      title: "Power BI & DAX Mastery",
      subtitle: "Power Query ETL & Data Modeling",
      desc: "Translating messy operational records into clean Star Schema architectures and automated KPI calculations with high performance.",
    },
    {
      icon: <Database className="w-5 h-5 text-indigo-400" />,
      title: "Databases & Statistical Programming",
      subtitle: "SQL, Python, R, MongoDB",
      desc: "Extracting, preprocessing, and transforming multi-source operational data with SQL Server, Python (Pandas/NumPy), and R.",
    },
  ];

  return (
    <section id="about" className="py-24 relative bg-midnight-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/70 border border-sky-800/40 text-sky-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>PROFESSIONAL BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Chamoth Bandara</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            Bridging operational processes, statistical rigor, and executive decision-support tools.
          </p>
        </div>

        {/* 2-Column Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image & Quick Persona Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden glass-card p-3 border border-sky-900/40">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                <Image
                  src={profile.avatarUrl || "/uploads/chamoth_profile.jpg"}
                  alt={profile.fullName || "Chamoth Bandara"}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/90 via-midnight-950/20 to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-medium">
                    Junior Data Analyst
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">Chamoth Bandara</h3>
                  <p className="text-xs text-slate-300">
                    BSc Statistics & Computer Science, University of Kelaniya
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stat Pill */}
            <div className="p-4 rounded-xl glass-panel border border-sky-800/30 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Current Industry Role</p>
                <p className="text-sm font-bold text-white">MAS Fabrics – Matrix Intern</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Primary Domain</p>
                <p className="text-sm font-bold text-cyan-400 font-mono">BI & Analytics</p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Core Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Turning Operational Complexity Into Transparent Decision-Making
              </h3>
              
              <p>
                I am a Data Analyst with a <span className="text-cyan-300 font-medium">BSc in Statistics &amp; Computer Science</span> from the University of Kelaniya and direct industry experience turning complex manufacturing datasets into reliable KPIs, automated dashboards, and actionable insights.
              </p>
              
              <p>
                Currently serving as a <span className="text-sky-300 font-medium">Data Analyst Intern at MAS Fabrics – Matrix (Thulhiriya)</span>, I develop enterprise Power BI solutions utilizing advanced Power Query ETL pipelines and optimized DAX measures. My work encompasses analyzing operational and quality trends across raw material, knitting, bonding/assembly, washing, and sewing lines.
              </p>

              <p>
                By integrating previously fragmented quality, laboratory, inspection, and supplier records, I eliminate data duplication, ensure strict reporting accuracy, and provide plant leadership with real-time target-versus-actual visibility that directly accelerates Lean improvement initiatives.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl glass-card border border-sky-900/30 space-y-2 hover:border-sky-500/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-midnight-950 border border-slate-800">
                      {h.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white leading-tight">
                        {h.title}
                      </h4>
                      <p className="text-[11px] text-cyan-400/90 font-mono">
                        {h.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal pl-0.5">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Personal Aspirations from CV */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/40 to-slate-900/60 border-l-4 border-cyan-400">
              <p className="text-xs text-slate-300 italic">
                &ldquo;Interested in applying data analytics and statistical modeling to healthcare operations, member outcomes, operational excellence, and data-driven decision-making.&rdquo;
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
