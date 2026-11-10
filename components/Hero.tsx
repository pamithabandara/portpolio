"use client";

import React from "react";
import Image from "next/image";
import {
  BarChart3,
  TrendingUp,
  Database,
  ArrowRight,
  FileDown,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  Layers,
  Activity,
  CheckCircle,
} from "lucide-react";
import { ProfileData } from "@/lib/types";

interface HeroProps {
  profile: ProfileData;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Radial Gradient Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-sky-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-medium text-cyan-300 tracking-wide font-mono">
                {profile.availableForWork ? "Open to Data Analyst & BI Roles" : "Portfolio Active"}
              </span>
            </div>

            {/* Name & Titles */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-mono tracking-wider uppercase">
                <span>Hello, I&apos;m</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {profile.fullName || "Chamoth Bandara"}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300">
                {profile.title || "Junior Data Analyst | Power BI Developer | Data Analytics Enthusiast"}
              </p>
            </div>

            {/* Headline & Description */}
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 leading-snug">
                &ldquo;{profile.headline || "Transforming Data Into Meaningful Insights and Smarter Decisions."}&rdquo;
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {profile.summary ||
                  "Statistics and Computer Science graduate with practical experience in developing interactive Power BI dashboards, automating business intelligence reporting, analyzing operational performance, and transforming complex datasets into actionable insights."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 shadow-lg shadow-sky-500/25 hover:shadow-cyan-500/40 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={profile.cvUrl || "/uploads/Chamoth_Bandara_CV.pdf"}
                download
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-slate-200 bg-midnight-900/80 hover:bg-slate-800/80 border border-sky-800/40 hover:border-sky-500/50 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>Download My CV</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900/50 border border-transparent hover:border-slate-800 transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Links & Highlights */}
            <div className="flex items-center gap-4 pt-3 border-t border-slate-800/60 w-full">
              <span className="text-xs text-slate-400 font-mono">Connect:</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email || "pamithabandara123@gmail.com"}`}
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
                title="Email Chamoth"
              >
                <Mail className="w-4 h-4" />
              </a>

              <div className="h-4 w-[1px] bg-slate-800 mx-2"></div>
              
              <div className="text-xs text-slate-400 font-mono">
                📍 {profile.location || "Thulhiriya / Colombo, Sri Lanka"}
              </div>
            </div>

          </div>

          {/* Right Column: Profile Image & Floating KPI Badges (5 cols) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-72 sm:w-80 lg:w-96">
              
              {/* Outer Decorative Glow Rings */}
              <div className="absolute inset-0 -m-3 rounded-3xl bg-gradient-to-tr from-sky-600/30 via-cyan-500/20 to-indigo-600/30 blur-xl animate-pulse-slow"></div>

              {/* Main Photo Card */}
              <div className="relative rounded-2xl p-1.5 bg-gradient-to-b from-sky-500/40 via-slate-800/60 to-cyan-500/40 backdrop-blur-md shadow-2xl shadow-sky-950/50">
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-midnight-900 border border-sky-900/30">
                  <Image
                    src={profile.avatarUrl || "/uploads/chamoth_profile.jpg"}
                    alt={profile.fullName || "Chamoth Bandara"}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent"></div>
                  
                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-midnight-900/80 backdrop-blur-md border border-slate-700/50">
                    <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      Chamoth Bandara
                    </p>
                    <p className="text-[11px] text-sky-300/90 font-mono">
                      MAS Fabrics – Matrix Intern
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Analytical Badge 1: Power BI & DAX */}
              <div className="absolute -top-4 -left-6 sm:-left-8 glass-panel px-3.5 py-2 rounded-xl shadow-lg border border-sky-400/30 animate-float flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Core Focus</p>
                  <p className="text-xs font-bold text-white">Power BI & DAX</p>
                </div>
              </div>

              {/* Floating Analytical Badge 2: KPI Automation */}
              <div 
                className="absolute -bottom-5 -left-4 sm:-left-6 glass-panel px-3.5 py-2 rounded-xl shadow-lg border border-cyan-400/30 flex items-center gap-2.5"
                style={{ animation: "float 6s ease-in-out infinite 2s" }}
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">MAS Matrix</p>
                  <p className="text-xs font-bold text-white">FTT & Defect KPIs</p>
                </div>
              </div>

              {/* Floating Analytical Badge 3: SQL & Modeling */}
              <div 
                className="absolute top-1/2 -right-6 sm:-right-8 -translate-y-1/2 glass-panel px-3 py-2 rounded-xl shadow-lg border border-sky-500/30 flex items-center gap-2.5"
                style={{ animation: "float 6s ease-in-out infinite 4s" }}
              >
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Data Modeling</p>
                  <p className="text-xs font-bold text-white">SQL & Star Schema</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Live Metrics Ribbon */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card p-4 rounded-xl text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 font-mono">
              6+
            </p>
            <p className="text-xs text-slate-300 mt-1 font-medium">Production Analytics Dashboards</p>
            <p className="text-[11px] text-slate-500">Quality, Lab & Supply Chain</p>
          </div>

          <div className="glass-card p-4 rounded-xl text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 font-mono">
              100%
            </p>
            <p className="text-xs text-slate-300 mt-1 font-medium">Automated Reporting</p>
            <p className="text-[11px] text-slate-500">Eliminating manual spreadsheet delays</p>
          </div>

          <div className="glass-card p-4 rounded-xl text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300 font-mono">
              BSc
            </p>
            <p className="text-xs text-slate-300 mt-1 font-medium">Statistics & Computer Science</p>
            <p className="text-[11px] text-slate-500">University of Kelaniya</p>
          </div>

          <div className="glass-card p-4 rounded-xl text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 font-mono">
              MAS
            </p>
            <p className="text-xs text-slate-300 mt-1 font-medium">Fabrics – Matrix Experience</p>
            <p className="text-[11px] text-slate-500">Lean Plant Quality Operations</p>
          </div>
        </div>

      </div>
    </section>
  );
}
