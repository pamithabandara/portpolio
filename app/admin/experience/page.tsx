"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { ExperienceItem } from "@/lib/types";

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExp, setEditingExp] = useState<Partial<ExperienceItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const res = await fetch("/api/admin/experience");
      const data = await res.json();
      if (data.experiences) {
        setExperiences(data.experiences);
      }
    } catch (e) {
      setError("Failed to load experience");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp?.title || !editingExp?.company || !editingExp?.startDate) {
      setError("Title, company, and start date are required");
      return;
    }

    setError(null);
    try {
      const url = isNew ? "/api/admin/experience" : `/api/admin/experience/${editingExp.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingExp),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(isNew ? "Experience record created!" : "Experience record updated!");
      setTimeout(() => setSuccess(null), 3000);
      setEditingExp(null);
      setIsNew(false);
      fetchExperience();
    } catch (err: any) {
      setError(err.message || "Failed to save experience");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience record?")) return;

    try {
      const res = await fetch(`/api/admin/experience/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setSuccess("Record deleted");
      setTimeout(() => setSuccess(null), 3000);
      fetchExperience();
    } catch (err: any) {
      setError(err.message || "Failed to delete experience");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Experience Management
          </h1>
          <p className="text-xs text-slate-400">
            Manage your employment history, intern roles, responsibilities, and key metrics.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingExp({
              title: "",
              company: "",
              companyUrl: "",
              location: "Sri Lanka",
              startDate: "",
              endDate: "Present",
              current: false,
              responsibilities: "",
              technologies: "",
              order: experiences.length + 1,
            });
            setIsNew(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 shadow-md shadow-sky-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Work Experience</span>
        </button>
      </div>

      {success && (
        <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Experience Editor Form */}
      {editingExp && (
        <div className="p-6 rounded-2xl glass-card border border-cyan-500/40 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              {isNew ? "Add New Experience" : "Edit Experience Record"}
            </h2>
            <button
              onClick={() => {
                setEditingExp(null);
                setIsNew(false);
              }}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Data Analyst Intern"
                  value={editingExp.title || ""}
                  onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  required
                  placeholder="MAS Fabrics – Matrix"
                  value={editingExp.company || ""}
                  onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Start Date *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mar 2026"
                  value={editingExp.startDate || ""}
                  onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  End Date
                </label>
                <input
                  type="text"
                  placeholder="Sep 2026 or Present"
                  value={editingExp.endDate || ""}
                  onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Thulhiriya, Sri Lanka"
                  value={editingExp.location || ""}
                  onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Technologies / Tools Used (comma-separated)
              </label>
              <input
                type="text"
                placeholder="Power BI, Power Query, DAX, SQL, Data Modeling"
                value={editingExp.technologies || ""}
                onChange={(e) => setEditingExp({ ...editingExp, technologies: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Responsibilities &amp; Achievements (Enter one bullet point per line)
              </label>
              <textarea
                rows={5}
                placeholder="Develop and maintain interactive Power BI dashboards using Power Query and DAX.&#10;Automate KPI reporting for FTT, rejection, and defects.&#10;Analyze operational trends and drill-downs."
                value={
                  typeof editingExp.responsibilities === "string" && editingExp.responsibilities.startsWith("[")
                    ? JSON.parse(editingExp.responsibilities).join("\n")
                    : editingExp.responsibilities || ""
                }
                onChange={(e) => setEditingExp({ ...editingExp, responsibilities: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-sans"
              ></textarea>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="currentRole"
                  checked={editingExp.current ?? false}
                  onChange={(e) => setEditingExp({ ...editingExp, current: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-500 bg-midnight-950 border-slate-700"
                />
                <label htmlFor="currentRole" className="text-xs text-slate-300">
                  Current employment (active role)
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingExp(null);
                    setIsNew(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 shadow"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Experience</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Experience Cards */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-6 rounded-2xl glass-card border border-sky-900/30 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-base font-bold text-white">{exp.title}</h3>
                {exp.current && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    Current
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-sky-400">{exp.company} • {exp.location}</p>
              <p className="text-[11px] font-mono text-slate-400">{exp.startDate} – {exp.endDate}</p>
              <p className="text-xs text-slate-400 font-mono pt-1">Technologies: {exp.technologies}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setEditingExp(exp);
                  setIsNew(false);
                }}
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
