"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Image as ImageIcon,
  Wrench,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Award,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Profile Management", href: "/admin/profile", icon: User },
    { name: "Photo Management", href: "/admin/photos", icon: ImageIcon },
    { name: "Skills Management", href: "/admin/skills", icon: Wrench },
    { name: "Experience", href: "/admin/experience", icon: Briefcase },
    { name: "Projects Management", href: "/admin/projects", icon: FolderGit2 },
    { name: "Education", href: "/admin/education", icon: GraduationCap },
    { name: "Certifications", href: "/admin/certifications", icon: Award },
    { name: "Contact Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "CV Management", href: "/admin/cv", icon: FileText },
    { name: "Website Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      router.push("/admin/login");
    }
  };

  return (
    <aside className="w-64 bg-midnight-950 border-r border-slate-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 via-cyan-500 to-indigo-600 p-[1px]">
              <div className="w-full h-full bg-midnight-900 rounded-[7px] flex items-center justify-center font-mono font-bold text-cyan-400 text-xs">
                CB
              </div>
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-tight">
                Chamoth CMS
              </span>
              <p className="text-[10px] text-cyan-400 font-mono">Admin Portal</p>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-sky-950/80 to-slate-900 text-cyan-300 border border-cyan-500/30 shadow-sm"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-800/80 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-300 hover:text-white bg-midnight-900 border border-slate-800 hover:border-slate-700 transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full px-3.5 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
