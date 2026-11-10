"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { EducationItem } from "@/lib/types";

export default function AdminEducationPage() {
  const [educationList, setEducationList] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEdu, setEditingEdu] = useState<Partial<EducationItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const res = await fetch("/api/admin/education");
      const data = await res.json();
      if (data.education) {
        setEducationList(data.education);
      }
    } catch (e) {
      setError("Failed to load education records");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu?.degree || !editingEdu?.institution || !editingEdu?.startYear) {
      setError("Degree, institution, and start year are required");
      return;
    }

    setError(null);
    try {
      const url = isNew ? "/api/admin/education" : `/api/admin/education/${editingEdu.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEdu),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(isNew ? "Education added successfully!" : "Education record updated!");
      setTimeout(() => setSuccess(null), 3000);
      setEditingEdu(null);
      setIsNew(false);
      fetchEducation();
    } catch (err: any) {
      setError(err.message || "Failed to save education record");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education record?")) return;

    try {
      const res = await fetch(`/api/admin/education/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setSuccess("Record deleted");
      setTimeout(() => setSuccess(null), 3000);
      fetchEducation();
    } catch (err: any) {
      setError(err.message || "Failed to delete education record");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Education Management
          </h1>
          <p className="text-xs text-slate-400">
            Manage your degrees, university affiliations, diplomas, and secondary school achievements.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingEdu({
              degree: "",
              institution: "",
              location: "Sri Lanka",
              startYear: "",
              endYear: "Present",
              grade: "",
              description: "",
              order: educationList.length + 1,
            });
            setIsNew(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 shadow-md shadow-sky-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
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

      {/* Education Form */}
      {editingEdu && (
        <div className="p-6 rounded-2xl glass-card border border-cyan-500/40 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              {isNew ? "Add Education Qualification" : "Edit Qualification"}
            </h2>
            <button
              onClick={() => {
                setEditingEdu(null);
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
                  Degree / Certificate Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="BSc in Statistics & Computer Science"
                  value={editingEdu.degree || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Institution Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="University of Kelaniya"
                  value={editingEdu.institution || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Start Year *
                </label>
                <input
                  type="text"
                  required
                  placeholder="2023"
                  value={editingEdu.startYear || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, startYear: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  End Year
                </label>
                <input
                  type="text"
                  placeholder="2026"
                  value={editingEdu.endYear || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, endYear: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Grade / Status
                </label>
                <input
                  type="text"
                  placeholder="Undergraduate / Completed"
                  value={editingEdu.grade || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, grade: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Description / Key Coursework
              </label>
              <textarea
                rows={3}
                placeholder="Coursework, focus areas, research topics..."
                value={editingEdu.description || ""}
                onChange={(e) => setEditingEdu({ ...editingEdu, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              ></textarea>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setEditingEdu(null);
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
                <span>Save Education</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Education Cards */}
      <div className="space-y-4">
        {educationList.map((edu) => (
          <div
            key={edu.id}
            className="p-6 rounded-2xl glass-card border border-sky-900/30 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
          >
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white">{edu.degree}</h3>
              <p className="text-xs font-semibold text-sky-400">{edu.institution}</p>
              <p className="text-[11px] font-mono text-slate-400">{edu.startYear} – {edu.endYear}</p>
              {edu.grade && (
                <p className="text-xs text-cyan-300 font-mono">{edu.grade}</p>
              )}
              {edu.description && (
                <p className="text-xs text-slate-300 pt-2">{edu.description}</p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setEditingEdu(edu);
                  setIsNew(false);
                }}
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(edu.id)}
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
