"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Database,
  Code2,
  PieChart,
  Network,
  Workflow,
  Calculator,
  TrendingUp,
  LayoutDashboard,
  Server,
  HardDrive,
  Layers,
  Binary,
  LineChart,
  Terminal,
  Activity,
  Filter,
  CheckCircle2,
  GitBranch,
  Github,
  Radio,
  Search,
  Sparkles,
} from "lucide-react";
import { SkillItem } from "@/lib/types";

interface SkillsSectionProps {
  skills: SkillItem[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "BI & Reporting",
    "SQL & Databases",
    "Programming & Analytics",
    "Statistics",
    "Data Foundations",
  ];

  // Helper function to map string icon name to Lucide Icon
  const getSkillIcon = (name: string, iconName?: string | null) => {
    const lower = name.toLowerCase();
    if (lower.includes("power bi") || lower.includes("dashboard"))
      return <BarChart3 className="w-5 h-5 text-amber-400" />;
    if (lower.includes("power query") || lower.includes("workflow"))
      return <Workflow className="w-5 h-5 text-cyan-400" />;
    if (lower.includes("dax") || lower.includes("calculator"))
      return <Calculator className="w-5 h-5 text-emerald-400" />;
    if (lower.includes("kpi") || lower.includes("trend"))
      return <TrendingUp className="w-5 h-5 text-sky-400" />;
    if (lower.includes("visualization") || lower.includes("pie"))
      return <PieChart className="w-5 h-5 text-violet-400" />;
    if (lower.includes("sql server") || lower.includes("server"))
      return <Server className="w-5 h-5 text-blue-400" />;
    if (lower.includes("sql") || lower.includes("mysql") || lower.includes("database"))
      return <Database className="w-5 h-5 text-blue-400" />;
    if (lower.includes("mongodb") || lower.includes("layers"))
      return <Layers className="w-5 h-5 text-emerald-500" />;
    if (lower.includes("python") || lower.includes("pandas") || lower.includes("numpy"))
      return <Binary className="w-5 h-5 text-yellow-400" />;
    if (lower.includes(" r ") || lower === "r" || lower.includes("r program"))
      return <LineChart className="w-5 h-5 text-sky-300" />;
    if (lower.includes("git") || lower.includes("github"))
      return <GitBranch className="w-5 h-5 text-orange-400" />;
    if (lower.includes("api") || lower.includes("rest"))
      return <Radio className="w-5 h-5 text-purple-400" />;
    if (lower.includes("modeling") || lower.includes("network"))
      return <Network className="w-5 h-5 text-teal-400" />;
    if (lower.includes("quality"))
      return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    if (lower.includes("statistic") || lower.includes("survey"))
      return <Activity className="w-5 h-5 text-indigo-400" />;
    return <Code2 className="w-5 h-5 text-slate-300" />;
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      selectedCategory === "All" || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 relative bg-midnight-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40 text-cyan-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Toolbox &amp; Expertise</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            Structured analytical disciplines, database engines, BI suites, and scientific computing frameworks verified through real-world deployment.
          </p>
        </div>

        {/* Filters & Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 w-full md:w-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-md shadow-sky-500/20"
                    : "bg-midnight-900/80 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills (e.g. DAX, SQL, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-midnight-900/90 border border-slate-800/80 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="group relative p-4 rounded-xl glass-card border border-sky-900/30 hover:border-sky-400/40 transition-all duration-300 flex items-start gap-3.5"
            >
              <div className="p-2.5 rounded-lg bg-midnight-950 border border-slate-800/90 group-hover:border-sky-500/40 group-hover:scale-105 transition-all">
                {getSkillIcon(skill.name, skill.icon)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-sm font-semibold text-white truncate group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h4>
                  {skill.featured && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                      Core
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                  {skill.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-2xl border border-dashed border-slate-800">
            <p className="text-sm text-slate-400">No skills found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-3 text-xs text-cyan-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
