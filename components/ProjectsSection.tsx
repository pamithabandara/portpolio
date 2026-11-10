"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Github,
  ArrowRight,
  BarChart2,
  Layers,
  Sparkles,
  SlidersHorizontal,
  Workflow,
  PieChart,
} from "lucide-react";
import { ProjectItem } from "@/lib/types";

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Power BI & Dashboards",
    "Power Platform & Automation",
    "Full-Stack & Software",
    "Research & Statistics",
  ];

  const filteredProjects = projects.filter((p) => {
    if (!p.published) return false;
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case "Power BI & Dashboards":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      case "Power Platform & Automation":
        return "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
      case "Full-Stack & Software":
        return "bg-indigo-500/15 text-indigo-300 border-indigo-500/30";
      case "Research & Statistics":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      default:
        return "bg-sky-500/15 text-sky-300 border-sky-500/30";
    }
  };

  return (
    <section id="projects" className="py-24 relative bg-midnight-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40 text-cyan-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Analytics &amp; Projects</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            Real operational BI dashboards, plant quality systems, digital automation flows, and statistical research models.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-md shadow-sky-500/20"
                  : "bg-midnight-900/80 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const techList = project.technologies
              ? project.technologies.split(",").map((t) => t.trim())
              : [];

            return (
              <div
                key={project.id}
                className="group flex flex-col rounded-2xl glass-card overflow-hidden border border-sky-900/30 hover:border-sky-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-950/50"
              >
                {/* Visual Header / Cover */}
                <div className="relative h-48 w-full bg-gradient-to-tr from-midnight-950 via-slate-900 to-sky-950 overflow-hidden border-b border-sky-900/30">
                  {/* Decorative Background Element */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
                  
                  {project.thumbnailUrl && project.thumbnailUrl.startsWith("http") ? (
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-midnight-900/90 border border-sky-500/30 flex items-center justify-center text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
                        {project.category.includes("Power BI") ? (
                          <BarChart2 className="w-7 h-7 text-amber-400" />
                        ) : project.category.includes("Power Platform") ? (
                          <Workflow className="w-7 h-7 text-cyan-400" />
                        ) : project.category.includes("Full-Stack") ? (
                          <Layers className="w-7 h-7 text-indigo-400" />
                        ) : (
                          <PieChart className="w-7 h-7 text-emerald-400" />
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-sky-300 uppercase tracking-widest">
                        {project.category}
                      </span>
                    </div>
                  )}

                  {/* Category Pill Over Image */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border backdrop-blur-md ${getCategoryBadgeStyle(
                        project.category
                      )}`}
                    >
                      {project.category}
                    </span>
                  </div>

                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-400 text-midnight-950 uppercase tracking-wider">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Technology Tags */}
                  <div className="space-y-3 pt-2 border-t border-slate-800/60">
                    <div className="flex flex-wrap gap-1.5">
                      {techList.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-midnight-900 text-slate-300 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                      {techList.length > 4 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                          +{techList.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Bottom Links */}
                    <div className="flex items-center justify-between pt-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                      >
                        <span>View Project Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title="GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveDemoUrl && (
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
