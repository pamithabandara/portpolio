"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { ExperienceItem } from "@/lib/types";

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    experiences.length > 0 ? experiences[0].id : null
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const parseResponsibilities = (resp: string): string[] => {
    try {
      if (resp.startsWith("[")) {
        return JSON.parse(resp);
      }
      return resp.split("\n").filter((line) => line.trim().length > 0);
    } catch {
      return resp.split("\n").filter((line) => line.trim().length > 0);
    }
  };

  return (
    <section id="experience" className="py-24 relative bg-midnight-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/70 border border-sky-800/40 text-sky-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CAREER PATHWAY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Experience</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            Demonstrated impact in manufacturing operational intelligence, Lean metrics, and automated decision-support reporting.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical Connecting Line */}
          <div className="absolute left-4 sm:left-8 top-6 bottom-6 w-[2px] bg-gradient-to-b from-sky-500 via-cyan-500/40 to-transparent"></div>

          <div className="space-y-8">
            {experiences.map((exp) => {
              const bullets = parseResponsibilities(exp.responsibilities);
              const isExpanded = expandedId === exp.id;
              const techList = exp.technologies
                ? exp.technologies.split(",").map((t) => t.trim())
                : [];

              return (
                <div key={exp.id} className="relative pl-12 sm:pl-20">
                  
                  {/* Timeline Node Icon */}
                  <div className="absolute left-1.5 sm:left-5.5 top-2 -translate-x-1/2 w-6 h-6 rounded-full bg-midnight-950 border-2 border-cyan-400 shadow-glow flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
                  </div>

                  {/* Card Content */}
                  <div className="glass-card rounded-2xl p-6 sm:p-8 border border-sky-900/40 hover:border-sky-500/40 transition-all duration-300">
                    
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-800/70">
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h3 className="text-xl font-bold text-white tracking-tight">
                            {exp.title}
                          </h3>
                          {exp.current && (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                              Active Role
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-1.5 text-sky-400 text-sm font-semibold">
                          <span>{exp.company}</span>
                          {exp.companyUrl && (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-cyan-400 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>
                            {exp.startDate} – {exp.endDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-sky-400" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Technologies Tag Pills */}
                    {techList.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 my-4">
                        <span className="text-[11px] font-mono text-slate-400 mr-1">
                          Stack:
                        </span>
                        {techList.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md text-xs font-mono bg-midnight-950 text-sky-300 border border-sky-900/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bullet Points with Expandable Control */}
                    <div className="space-y-3 mt-4">
                      {bullets.slice(0, isExpanded ? bullets.length : 3).map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Toggle Button */}
                    {bullets.length > 3 && (
                      <button
                        onClick={() => toggleExpand(exp.id)}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            <span>Show fewer responsibilities</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Show all {bullets.length} responsibilities</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    )}

                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
