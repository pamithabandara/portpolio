"use client";

import React, { useState, useEffect } from "react";
import {
  Award,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import { CertificationItem } from "@/lib/types";

export default function AdminCertificationsPage() {
  const [certifications, setCertifications] = useState<CertificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCert, setEditingCert] = useState<Partial<CertificationItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const res = await fetch("/api/admin/certifications");
      const data = await res.json();
      if (data.certifications) {
        setCertifications(data.certifications);
      }
    } catch (e) {
      setError("Failed to load certifications");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert?.title || !editingCert?.issuer) {
      setError("Title and issuer are required");
      return;
    }

    setError(null);
    try {
      const url = isNew ? "/api/admin/certifications" : `/api/admin/certifications/${editingCert.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCert),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(isNew ? "Certification added!" : "Certification updated!");
      setTimeout(() => setSuccess(null), 3000);
      setEditingCert(null);
      setIsNew(false);
      fetchCertifications();
    } catch (err: any) {
      setError(err.message || "Failed to save certification");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certification?")) return;

    try {
      const res = await fetch(`/api/admin/certifications/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setSuccess("Certification deleted");
      setTimeout(() => setSuccess(null), 3000);
      fetchCertifications();
    } catch (err: any) {
      setError(err.message || "Failed to delete certification");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Certifications Management
          </h1>
          <p className="text-xs text-slate-400">
            Add credentials, verification URLs, and upload certificate images or PDF files.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCert({
              title: "",
              issuer: "",
              issueDate: "2026",
              credentialUrl: "",
              imageUrl: "",
              pdfUrl: "",
              order: certifications.length + 1,
            });
            setIsNew(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 shadow-md shadow-sky-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
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

      {/* Certification Editor Form */}
      {editingCert && (
        <div className="p-6 rounded-2xl glass-card border border-cyan-500/40 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              {isNew ? "Add Certification" : "Edit Certification"}
            </h2>
            <button
              onClick={() => {
                setEditingCert(null);
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
                  Certification Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Data Science with Python"
                  value={editingCert.title || ""}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  required
                  placeholder="UCSC or SoloLearn"
                  value={editingCert.issuer || ""}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Issue Date
                </label>
                <input
                  type="text"
                  placeholder="13 January 2026 or 2026"
                  value={editingCert.issueDate || ""}
                  onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Credential Verification URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editingCert.credentialUrl || ""}
                  onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <ImageUploader
                label="Upload Certificate Image"
                currentUrl={editingCert.imageUrl}
                onUploadComplete={(url) => setEditingCert({ ...editingCert, imageUrl: url })}
                helperText="Upload JPG/PNG certificate scan"
              />

              <ImageUploader
                label="Upload Certificate PDF"
                currentUrl={editingCert.pdfUrl}
                accept="application/pdf"
                onUploadComplete={(url) => setEditingCert({ ...editingCert, pdfUrl: url })}
                helperText="Upload PDF official document"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => {
                  setEditingCert(null);
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
                <span>Save Certification</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-5 rounded-2xl glass-card border border-sky-900/30 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-midnight-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">{cert.title}</h3>
              <p className="text-xs text-sky-400 font-semibold">{cert.issuer}</p>
              <p className="text-[11px] font-mono text-slate-400">Issued: {cert.issueDate}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-[10px] text-slate-500 font-mono">No link</span>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingCert(cert);
                    setIsNew(false);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
