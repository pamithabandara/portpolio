"use client";

import React from "react";
import Link from "next/link";
import { User, Shield, Bell, ExternalLink } from "lucide-react";

interface AdminHeaderProps {
  userEmail?: string;
}

export default function AdminHeader({ userEmail = "pamithabandara123@gmail.com" }: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-slate-800/80 bg-midnight-950/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          CMS v1.0
        </span>
        <span className="text-xs text-slate-400 hidden sm:inline">
          Single-Owner Content Management Engine
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="h-4 w-[1px] bg-slate-800"></div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-midnight-900 border border-slate-700 flex items-center justify-center text-cyan-400">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-semibold text-white">Chamoth Bandara</span>
            <span className="text-[10px] text-slate-400 font-mono">{userEmail}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
