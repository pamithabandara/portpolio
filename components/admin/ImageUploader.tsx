"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, CheckCircle2, AlertCircle, X, FileText } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  currentUrl?: string | null;
  onUploadComplete: (url: string) => void;
  accept?: string;
  helperText?: string;
}

export default function ImageUploader({
  label,
  currentUrl,
  onUploadComplete,
  accept = "image/jpeg,image/png,image/webp",
  helperText = "Upload high quality JPG, PNG or WEBP (max 15MB)",
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setPreview(data.url);
      onUploadComplete(data.url);
    } catch (err: any) {
      setError(err.message || "Failed to upload file");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const isPdf = preview?.toLowerCase().endsWith(".pdf") || accept.includes("pdf");

  return (
    <div className="space-y-2">
      <label className="block text-xs font-mono text-slate-300">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Preview Container */}
        {preview ? (
          <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-midnight-950 border border-slate-700 flex items-center justify-center shrink-0">
            {isPdf && preview.endsWith(".pdf") ? (
              <div className="flex flex-col items-center justify-center p-2 text-center text-cyan-400">
                <FileText className="w-8 h-8 mb-1" />
                <span className="text-[10px] font-mono text-slate-300">PDF File</span>
              </div>
            ) : (
              <Image
                src={preview}
                alt="Upload preview"
                fill
                className="object-cover"
              />
            )}
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                onUploadComplete("");
              }}
              className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/80 text-slate-300 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-xl border border-dashed border-slate-700 bg-midnight-950/60 flex flex-col items-center justify-center text-slate-500 shrink-0">
            <UploadCloud className="w-6 h-6 mb-1 text-slate-400" />
            <span className="text-[10px] font-mono">No file</span>
          </div>
        )}

        {/* Upload Controls */}
        <div className="space-y-2 flex-1">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={accept}
            className="hidden"
            id={`file-input-${label.replace(/\s+/g, "-")}`}
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-midnight-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 transition-colors disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Choose &amp; Upload File</span>
              </>
            )}
          </button>
          <p className="text-[11px] text-slate-500 font-mono">
            {helperText}
          </p>
          {error && (
            <p className="text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
