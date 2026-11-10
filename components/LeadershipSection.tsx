"use client";

import React from "react";
import { Users, Calendar, Award, Phone, Mail, Building2, Sparkles } from "lucide-react";
import { LeadershipItem, ReferenceItem } from "@/lib/types";

interface LeadershipAndReferencesProps {
  leadership: LeadershipItem[];
  references: ReferenceItem[];
  showLeadership?: boolean;
  showReferences?: boolean;
}

export default function LeadershipSection({
  leadership,
  references,
  showLeadership = true,
  showReferences = true,
}: LeadershipAndReferencesProps) {
  if (!showLeadership && !showReferences) return null;

  return (
    <section className="py-24 relative bg-midnight-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Leadership & Additional (5 cols) */}
          {showLeadership && leadership.length > 0 && (
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/70 border border-sky-800/40 text-sky-400 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>RESPONSIBILITY &amp; TEAMWORK</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Leadership &amp; Activities
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Managing student fiscal stewardship and organizational execution.
                </p>
              </div>

              <div className="space-y-4">
                {leadership.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 rounded-2xl glass-card border border-sky-900/30 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-midnight-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white">
                            {item.role}
                          </h3>
                          <p className="text-xs font-semibold text-sky-400">
                            {item.organization}
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-midnight-950 text-slate-300 border border-slate-800 shrink-0">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800/60">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Academic & Professional References (7 cols) */}
          {showReferences && references.length > 0 && (
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40 text-cyan-400 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ENDORSEMENTS &amp; ATTESTATIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Professional &amp; Academic References
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Referees available for verification of work ethics, analytical rigor, and project contributions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {references.filter((r) => r.visible).map((ref) => (
                  <div
                    key={ref.id}
                    className="p-6 rounded-2xl glass-card border border-sky-900/30 hover:border-sky-500/40 flex flex-col justify-between space-y-4 transition-all"
                  >
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-white">
                        {ref.name}
                      </h3>
                      <p className="text-xs font-semibold text-cyan-300">
                        {ref.title}
                      </p>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                        <Building2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{ref.organization}</span>
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/70 space-y-2 text-xs font-mono">
                      {ref.email && (
                        <a
                          href={`mailto:${ref.email}`}
                          className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <span className="truncate">{ref.email}</span>
                        </a>
                      )}
                      {ref.phone && (
                        <a
                          href={`tel:${ref.phone}`}
                          className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-slate-500" />
                          <span>{ref.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
