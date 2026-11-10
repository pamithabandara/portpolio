"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  FileDown,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminCvPage() {
  const [cvUrl, setCvUrl] = useState<string>("/uploads/Chamoth_Bandara_CV.pdf");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCvUrl();
  }, []);

  const fetchCvUrl = async () => {
    try {
      const res = await fetch("/api/admin/cv");
      const data = await res.json();
      if (data.cvUrl) {
        setCvUrl(data.cvUrl);
      }
    } catch (e) {
      setError("Failed to fetch CV status");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = async (url: string) => {
    if (!url) return;
    try {
      const res = await fetch("/api/admin/cv", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvUrl: url }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setCvUrl(url);
      setSuccess("New CV PDF published successfully! All Download CV buttons on your site now point to this file.");
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to update CV");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            CV &amp; Resume Management
          </h1>
          <p className="text-xs text-slate-400">
            Upload and publish your latest official curriculum vitae PDF.
          </p>
        </div>

        {success && (
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4" />
            <span>{success}</span>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Current Active CV Status Card */}
      <div className="p-6 rounded-2xl glass-card border border-sky-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-midnight-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-400">Currently Published CV</p>
            <h2 className="text-sm sm:text-base font-bold text-white mt-0.5 truncate max-w-md">
              {cvUrl}
            </h2>
            <p className="text-[11px] text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Publicly downloadable from navigation bar and hero section</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-slate-300 bg-midnight-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Preview</span>
          </a>

          <a
            href={cvUrl}
            download
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 shadow-md shadow-sky-500/20 transition-all"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Download Test</span>
          </a>
        </div>
      </div>

      {/* Upload Section */}
      <div className="p-6 rounded-2xl glass-card border border-sky-900/30 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
          Upload New CV File (PDF)
        </h2>
        <ImageUploader
          label="Choose New CV Document"
          accept="application/pdf"
          onUploadComplete={handleUploadComplete}
          helperText="Upload official PDF file (max 15MB). The new file will instantly replace the current download link."
        />
      </div>
    </div>
  );
}
