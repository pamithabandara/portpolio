"use client";

import React, { useState, useEffect } from "react";
import {
  Wrench,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  Star,
  Search,
} from "lucide-react";
import { SkillItem } from "@/lib/types";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState<Partial<SkillItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = [
    "BI & Reporting",
    "SQL & Databases",
    "Programming & Analytics",
    "Statistics",
    "Data Foundations",
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/admin/skills");
      const data = await res.json();
      if (data.skills) {
        setSkills(data.skills);
      }
    } catch (e) {
      setError("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill?.name || !editingSkill?.category) {
      setError("Name and category are required");
      return;
    }

    setError(null);
    try {
      const url = isNew ? "/api/admin/skills" : `/api/admin/skills/${editingSkill.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSkill),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(isNew ? "Skill added successfully!" : "Skill updated!");
      setTimeout(() => setSuccess(null), 3000);
      setEditingSkill(null);
      setIsNew(false);
      fetchSkills();
    } catch (err: any) {
      setError(err.message || "Failed to save skill");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const res = await fetch(`/api/admin/skills/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setSuccess("Skill deleted");
      setTimeout(() => setSuccess(null), 3000);
      fetchSkills();
    } catch (err: any) {
      setError(err.message || "Failed to delete skill");
    }
  };

  const filtered = skills.filter(
    (s) => filterCategory === "All" || s.category === filterCategory
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Skills Management
          </h1>
          <p className="text-xs text-slate-400">
            Add, update, categorize, and reorder technical skills across your portfolio.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingSkill({
              name: "",
              category: "BI & Reporting",
              order: skills.length + 1,
              featured: false,
            });
            setIsNew(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 shadow-md shadow-sky-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Skill</span>
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

      {/* Edit / Add Modal or Inline Form */}
      {editingSkill && (
        <div className="p-6 rounded-2xl glass-card border border-cyan-500/40 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              {isNew ? "Create New Skill" : "Edit Skill"}
            </h2>
            <button
              onClick={() => {
                setEditingSkill(null);
                setIsNew(false);
              }}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5">
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Skill Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Power BI, DAX, SQL"
                value={editingSkill.name || ""}
                onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Category *
              </label>
              <select
                value={editingSkill.category || "BI & Reporting"}
                onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-midnight-950 text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                value={editingSkill.order ?? 0}
                onChange={(e) => setEditingSkill({ ...editingSkill, order: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="sm:col-span-12 flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featuredSkill"
                  checked={editingSkill.featured ?? false}
                  onChange={(e) => setEditingSkill({ ...editingSkill, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-500 bg-midnight-950 border-slate-700"
                />
                <label htmlFor="featuredSkill" className="text-xs text-slate-300">
                  Highlight as Core Skill (shows badge)
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingSkill(null);
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
                  <span>Save Skill</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setFilterCategory("All")}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
            filterCategory === "All"
              ? "bg-sky-600 text-white"
              : "bg-midnight-900 text-slate-400 border border-slate-800"
          }`}
        >
          All ({skills.length})
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilterCategory(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-colors ${
              filterCategory === c
                ? "bg-sky-600 text-white"
                : "bg-midnight-900 text-slate-400 border border-slate-800"
            }`}
          >
            {c} ({skills.filter((s) => s.category === c).length})
          </button>
        ))}
      </div>

      {/* Skills Table */}
      <div className="rounded-2xl glass-card border border-sky-900/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-midnight-950 text-slate-400 font-mono uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Skill Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Core/Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((skill) => (
                <tr key={skill.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-400">{skill.order}</td>
                  <td className="py-3 px-4 font-semibold text-white">{skill.name}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{skill.category}</td>
                  <td className="py-3 px-4">
                    {skill.featured ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                        Core
                      </span>
                    ) : (
                      <span className="text-slate-600 text-[10px] font-mono">Standard</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingSkill(skill);
                        setIsNew(false);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
