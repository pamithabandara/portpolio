"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  FolderGit2,
} from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import { ProjectItem } from "@/lib/types";

interface ProjectFormProps {
  initialData?: Partial<ProjectItem>;
  isNew?: boolean;
}

export default function ProjectForm({ initialData = {}, isNew = false }: ProjectFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<ProjectItem>>({
    title: "",
    slug: "",
    category: "Power BI & Dashboards",
    technologies: "",
    shortDescription: "",
    fullDescription: "",
    problemStatement: "",
    objectives: "",
    contribution: "",
    developmentProcess: "",
    keyFeatures: "",
    outcomes: "",
    thumbnailUrl: "",
    images: "[]",
    githubUrl: "",
    liveDemoUrl: "",
    featured: true,
    published: true,
    order: 0,
    ...initialData,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const categories = [
    "Power BI & Dashboards",
    "Power Platform & Automation",
    "Full-Stack & Software",
    "Research & Statistics",
  ];

  let galleryImages: string[] = [];
  try {
    galleryImages = JSON.parse(formData.images || "[]");
  } catch {
    galleryImages = [];
  }

  const addGalleryImage = (url: string) => {
    if (!url) return;
    const updated = [...galleryImages, url];
    setFormData({ ...formData, images: JSON.stringify(updated) });
  };

  const removeGalleryImage = (idx: number) => {
    const updated = galleryImages.filter((_, i) => i !== idx);
    setFormData({ ...formData, images: JSON.stringify(updated) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.shortDescription) {
      setError("Title and short description are required");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${formData.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/projects");
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Failed to save project");
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-xl bg-midnight-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {isNew ? "Create New Project" : `Edit: ${formData.title}`}
            </h1>
            <p className="text-xs text-slate-400">
              Publish or modify project case study details, problem statements, and screenshots.
            </p>
          </div>
        </div>

        {success && (
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4" />
            <span>Project saved successfully!</span>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Core Project Details */}
        <div className="p-6 rounded-2xl glass-card border border-sky-900/30 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            1. Core Details &amp; Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Drive Lean Plant Quality Dashboard"
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Category *
              </label>
              <select
                value={formData.category || "Power BI & Dashboards"}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-midnight-950 text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                URL Slug (leave blank to auto-generate)
              </label>
              <input
                type="text"
                placeholder="drive-lean-plant-quality"
                value={formData.slug || ""}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                placeholder="Power BI, Power Query, DAX, SQL"
                value={formData.technologies || ""}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Short Description (Card Summary) *
            </label>
            <textarea
              rows={2}
              required
              placeholder="Brief summary appearing on the portfolio project card..."
              value={formData.shortDescription || ""}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 resize-none"
            ></textarea>
          </div>
        </div>

        {/* Deep Dive Case Study Content */}
        <div className="p-6 rounded-2xl glass-card border border-sky-900/30 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            2. Detailed Case Study Sections
          </h2>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Full Overview
            </label>
            <textarea
              rows={4}
              placeholder="Comprehensive narrative of the project context and scope..."
              value={formData.fullDescription || ""}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Problem Statement &amp; Bottlenecks
              </label>
              <textarea
                rows={4}
                placeholder="Operational challenges, manual spreadsheets, data siloing..."
                value={formData.problemStatement || ""}
                onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Objectives
              </label>
              <textarea
                rows={4}
                placeholder="Core deliverables, automated KPIs, drill-down goals..."
                value={formData.objectives || ""}
                onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                My Contribution
              </label>
              <textarea
                rows={4}
                placeholder="Data modeling, DAX measures formulated, ETL pipelines built..."
                value={formData.contribution || ""}
                onChange={(e) => setFormData({ ...formData, contribution: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Development Process
              </label>
              <textarea
                rows={4}
                placeholder="Steps taken from data discovery to validation and deployment..."
                value={formData.developmentProcess || ""}
                onChange={(e) => setFormData({ ...formData, developmentProcess: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Key Features
              </label>
              <textarea
                rows={4}
                placeholder="• Feature 1&#10;• Feature 2&#10;• Feature 3"
                value={formData.keyFeatures || ""}
                onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Measurable Outcomes &amp; Business Results
              </label>
              <textarea
                rows={4}
                placeholder="Actual outcomes supported by CV (e.g. reduced manual effort, enhanced reporting accuracy)..."
                value={formData.outcomes || ""}
                onChange={(e) => setFormData({ ...formData, outcomes: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Media & Screenshots */}
        <div className="p-6 rounded-2xl glass-card border border-sky-900/30 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            3. Project Thumbnails &amp; Screenshot Gallery
          </h2>

          <ImageUploader
            label="Upload Project Thumbnail / Cover"
            currentUrl={formData.thumbnailUrl}
            onUploadComplete={(url) => setFormData({ ...formData, thumbnailUrl: url })}
            helperText="Thumbnail for project card on portfolio home"
          />

          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <label className="block text-xs font-mono text-slate-300">
              Additional Dashboard Screenshots &amp; Diagrams ({galleryImages.length} attached)
            </label>

            <ImageUploader
              label="Add Another Image to Gallery"
              onUploadComplete={addGalleryImage}
              helperText="Upload additional dashboard screens, reports, or workflow charts"
            />

            {galleryImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {galleryImages.map((img, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden border border-slate-700 bg-midnight-950 p-1 group">
                    <div className="relative aspect-video rounded overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="Gallery item" className="object-cover w-full h-full" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(i)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-rose-950/80 text-rose-300 hover:text-white"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Links & Visibility */}
        <div className="p-6 rounded-2xl glass-card border border-sky-900/30 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            4. External Links &amp; Publishing Controls
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                GitHub Repository URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={formData.githubUrl || ""}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Live Demo / Dashboard URL
              </label>
              <input
                type="url"
                placeholder="https://app.powerbi.com/..."
                value={formData.liveDemoUrl || ""}
                onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featuredProj"
                checked={formData.featured ?? true}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded text-cyan-500 bg-midnight-950 border-slate-700"
              />
              <label htmlFor="featuredProj" className="text-xs text-slate-300">
                Mark as Featured Project
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="publishedProj"
                checked={formData.published ?? true}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 rounded text-cyan-500 bg-midnight-950 border-slate-700"
              />
              <label htmlFor="publishedProj" className="text-xs text-slate-300">
                Publish publicly on website (uncheck for draft)
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/projects"
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 shadow-md shadow-sky-500/20 transition-all disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isNew ? "Create Project" : "Save Changes"}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
