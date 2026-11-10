"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, AlertCircle, Eye } from "lucide-react";
import { SiteSettingsData } from "@/lib/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Partial<SiteSettingsData>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
      }
    } catch (e) {
      setError("Failed to load site settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Website &amp; SEO Settings
          </h1>
          <p className="text-xs text-slate-400">
            Control metadata, search engine optimization tags, and section visibility toggles.
          </p>
        </div>

        {success && (
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved successfully!</span>
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
        {/* SEO Metadata */}
        <div className="p-6 rounded-2xl glass-card border border-sky-900/30 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            1. Search Engine Optimization (SEO)
          </h2>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Browser Title (Meta Title)
            </label>
            <input
              type="text"
              required
              value={settings.siteTitle || ""}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Meta Description (Google Search Snippet)
            </label>
            <textarea
              rows={3}
              value={settings.metaDescription || ""}
              onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-midnight-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 resize-none"
            ></textarea>
          </div>
        </div>

        {/* Section Visibility Controls */}
        <div className="p-6 rounded-2xl glass-card border border-sky-900/30 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            2. Section Visibility Toggles
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-midnight-950/70 border border-slate-800">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  Academic &amp; Professional References Section
                </p>
                <p className="text-[11px] text-slate-400">
                  Show or hide MAS Fabrics QA Manager &amp; University of Kelaniya references
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.showReferences ?? true}
                onChange={(e) => setSettings({ ...settings, showReferences: e.target.checked })}
                className="w-4 h-4 rounded text-cyan-500 bg-midnight-950 border-slate-700"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-midnight-950/70 border border-slate-800">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  Leadership &amp; Student Activities Section
                </p>
                <p className="text-[11px] text-slate-400">
                  Show or hide Junior Treasurer student leadership card
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.showLeadership ?? true}
                onChange={(e) => setSettings({ ...settings, showLeadership: e.target.checked })}
                className="w-4 h-4 rounded text-cyan-500 bg-midnight-950 border-slate-700"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-midnight-950/70 border border-slate-800">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  Public Contact Info Display
                </p>
                <p className="text-[11px] text-slate-400">
                  Show direct email address and phone number in contact cards
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.showContactInfo ?? true}
                onChange={(e) => setSettings({ ...settings, showContactInfo: e.target.checked })}
                className="w-4 h-4 rounded text-cyan-500 bg-midnight-950 border-slate-700"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
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
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
