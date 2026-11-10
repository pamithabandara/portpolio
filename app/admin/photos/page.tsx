"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  UploadCloud,
  CheckCircle2,
  Trash2,
  Star,
  Sparkles,
  AlertCircle,
  Eye,
} from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

interface PhotoItem {
  id: string;
  url: string;
  altText?: string | null;
  isPrimary: boolean;
  createdAt: string;
}

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await fetch("/api/admin/photos");
      const data = await res.json();
      if (data.photos) {
        setPhotos(data.photos);
      }
    } catch (e) {
      setError("Failed to load photo gallery");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = async (url: string) => {
    if (!url) return;
    try {
      const res = await fetch("/api/admin/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          altText: "Chamoth Bandara Profile Photograph",
          isPrimary: photos.length === 0, // If first photo, make primary
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess("Photo uploaded and added to library!");
      setTimeout(() => setSuccess(null), 3000);
      fetchPhotos();
    } catch (err: any) {
      setError(err.message || "Failed to save photo");
    }
  };

  const setAsPrimary = async (id: string) => {
    try {
      const res = await fetch("/api/admin/photos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isPrimary: true }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess("Primary profile photo updated! Changes are now live.");
      setTimeout(() => setSuccess(null), 3000);
      fetchPhotos();
    } catch (err: any) {
      setError(err.message || "Failed to set primary photo");
    }
  };

  const deletePhoto = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    try {
      const res = await fetch(`/api/admin/photos?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setSuccess("Photo deleted.");
      setTimeout(() => setSuccess(null), 3000);
      fetchPhotos();
    } catch (err: any) {
      setError(err.message || "Failed to delete photo");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Photo Management
          </h1>
          <p className="text-xs text-slate-400">
            Upload profile pictures, choose your active primary image, and manage your photo assets.
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

      {/* Upload New Photo Section */}
      <div className="p-6 rounded-2xl glass-card border border-sky-900/30 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
          Upload New Profile Photograph
        </h2>
        <ImageUploader
          label="Select Image File"
          onUploadComplete={handleUploadComplete}
          helperText="Upload professional portrait (JPG, PNG, WEBP max 15MB). Instant cloud preview."
        />
      </div>

      {/* Photo Library Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
          Photo Library ({photos.length} Images)
        </h2>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className={`relative rounded-xl overflow-hidden glass-card p-2 border transition-all ${
                  photo.isPrimary
                    ? "border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-950/40"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-midnight-950">
                  <Image
                    src={photo.url}
                    alt={photo.altText || "Profile Photo"}
                    fill
                    className="object-cover"
                  />

                  {photo.isPrimary && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-400 text-midnight-950 shadow-md">
                      Active Primary
                    </div>
                  )}
                </div>

                <div className="p-2 pt-3 flex items-center justify-between gap-2">
                  {!photo.isPrimary ? (
                    <button
                      onClick={() => setAsPrimary(photo.id)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono text-cyan-300 bg-midnight-950 border border-cyan-500/30 hover:bg-cyan-950/40 transition-colors"
                    >
                      <Star className="w-3 h-3 text-cyan-400" />
                      <span>Set as Primary</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Displaying Live</span>
                    </span>
                  )}

                  {!photo.isPrimary && (
                    <button
                      onClick={() => deletePhoto(photo.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                      title="Delete photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
