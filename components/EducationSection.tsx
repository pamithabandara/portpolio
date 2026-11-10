"use client";

import React from "react";
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Sparkles } from "lucide-react";
import { EducationItem } from "@/lib/types";

interface EducationSectionProps {
  education: EducationItem[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-24 relative bg-midnight-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/70 border border-sky-800/40 text-sky-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Qualifications</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            Formal training combining mathematical statistics, probability theory, data processing, and computer science.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((item, idx) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl glass-card border border-sky-900/30 hover:border-sky-500/40 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-midnight-950 border border-sky-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-semibold text-sky-400 mt-1">
                      {item.institution}
                    </p>
                    {item.location && (
                      <p className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        {item.location}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-midnight-950 text-cyan-300 border border-sky-900">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.startYear} – {item.endYear}
                  </span>
                  {item.grade && (
                    <p className="text-xs font-medium text-slate-300 mt-2">
                      {item.grade}
                    </p>
                  )}
                </div>
              </div>

              {item.description && (
                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-3 border-t border-slate-800/70">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
