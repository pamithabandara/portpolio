import React from "react";
import Link from "next/link";
import {
  FolderGit2,
  Wrench,
  Briefcase,
  MessageSquare,
  ArrowRight,
  PlusCircle,
  UploadCloud,
  UserCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialExperiences,
} from "@/lib/initialData";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  let projectsCount = initialProjects.length;
  let skillsCount = initialSkills.length;
  let experienceCount = initialExperiences.length;
  let unreadMessagesCount = 0;
  let totalMessagesCount = 0;
  let recentMessages: any[] = [];
  let profile = initialProfile;

  try {
    const [
      pCount,
      sCount,
      eCount,
      unMsgCount,
      totMsgCount,
      recMsgs,
      dbProfile,
    ] = await Promise.all([
      db.project.count(),
      db.skill.count(),
      db.experience.count(),
      db.contactMessage.count({ where: { read: false } }),
      db.contactMessage.count(),
      db.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      db.profile.findUnique({ where: { id: "main_profile" } }),
    ]);

    projectsCount = pCount;
    skillsCount = sCount;
    experienceCount = eCount;
    unreadMessagesCount = unMsgCount;
    totalMessagesCount = totMsgCount;
    recentMessages = recMsgs;
    if (dbProfile) profile = dbProfile as any;
  } catch (err) {
    console.warn("DB overview fallback:", err);
  }

  const stats = [
    {
      title: "Featured Projects",
      value: projectsCount,
      desc: "Live Case Studies",
      icon: FolderGit2,
      href: "/admin/projects",
      color: "from-sky-500/20 to-cyan-500/10 border-sky-500/30 text-cyan-400",
    },
    {
      title: "Technical Skills",
      value: skillsCount,
      desc: "5 Categorized Domains",
      icon: Wrench,
      href: "/admin/skills",
      color: "from-cyan-500/20 to-teal-500/10 border-cyan-500/30 text-teal-400",
    },
    {
      title: "Experience Roles",
      value: experienceCount,
      desc: "MAS Fabrics Intern & More",
      icon: Briefcase,
      href: "/admin/experience",
      color: "from-indigo-500/20 to-sky-500/10 border-indigo-500/30 text-indigo-400",
    },
    {
      title: "Unread Messages",
      value: unreadMessagesCount,
      desc: `${totalMessagesCount} Total Inquiries`,
      icon: MessageSquare,
      href: "/admin/messages",
      color: unreadMessagesCount > 0 
        ? "from-amber-500/20 to-rose-500/10 border-amber-500/30 text-amber-400"
        : "from-slate-800 to-slate-900 border-slate-700 text-slate-400",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl glass-card border border-sky-900/40 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40 text-cyan-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO MANAGEMENT DASHBOARD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {profile?.fullName || "Chamoth"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Your single-owner portfolio CMS is online. All changes made in this dashboard update your database immediately and reflect across your live public portfolio.
          </p>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link
              key={i}
              href={stat.href}
              className={`p-5 rounded-2xl bg-gradient-to-br ${stat.color} border transition-all hover:scale-[1.02] flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-slate-300">
                  {stat.title}
                </span>
                <Icon className="w-5 h-5" />
              </div>
              <div className="mt-4">
                <p className="text-3xl font-extrabold text-white font-mono">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-400 mt-1">{stat.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="space-y-4">
        <h2 className="text-sm font-mono font-semibold text-slate-300 uppercase tracking-wider">
          Quick Management Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/projects/new"
            className="p-4 rounded-xl glass-card border border-sky-900/30 hover:border-cyan-400/50 flex items-center gap-3 group transition-all"
          >
            <div className="p-2.5 rounded-lg bg-sky-950/60 text-cyan-400 group-hover:scale-105 transition-transform">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white group-hover:text-cyan-300">
                Add New Project
              </p>
              <p className="text-[11px] text-slate-400">Publish case study</p>
            </div>
          </Link>

          <Link
            href="/admin/photos"
            className="p-4 rounded-xl glass-card border border-sky-900/30 hover:border-cyan-400/50 flex items-center gap-3 group transition-all"
          >
            <div className="p-2.5 rounded-lg bg-sky-950/60 text-cyan-400 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white group-hover:text-cyan-300">
                Manage Photos
              </p>
              <p className="text-[11px] text-slate-400">Change profile image</p>
            </div>
          </Link>

          <Link
            href="/admin/profile"
            className="p-4 rounded-xl glass-card border border-sky-900/30 hover:border-cyan-400/50 flex items-center gap-3 group transition-all"
          >
            <div className="p-2.5 rounded-lg bg-sky-950/60 text-cyan-400 group-hover:scale-105 transition-transform">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white group-hover:text-cyan-300">
                Edit Bio &amp; Summary
              </p>
              <p className="text-[11px] text-slate-400">Update professional info</p>
            </div>
          </Link>

          <Link
            href="/admin/cv"
            className="p-4 rounded-xl glass-card border border-sky-900/30 hover:border-cyan-400/50 flex items-center gap-3 group transition-all"
          >
            <div className="p-2.5 rounded-lg bg-sky-950/60 text-cyan-400 group-hover:scale-105 transition-transform">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white group-hover:text-cyan-300">
                CV PDF Manager
              </p>
              <p className="text-[11px] text-slate-400">Upload latest resume</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Contact Inquiries */}
      <div className="p-6 rounded-2xl glass-card border border-sky-900/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-semibold text-white">
              Recent Visitor Messages
            </h2>
          </div>
          <Link
            href="/admin/messages"
            className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>View All ({totalMessagesCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-midnight-950/50 border border-slate-800">
            <p className="text-xs text-slate-400">No messages submitted yet. Messages sent via your portfolio contact form will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="py-3.5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{msg.name}</span>
                    <span className="text-[11px] font-mono text-slate-400">({msg.email})</span>
                    {!msg.read && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300">{msg.subject}</p>
                  <p className="text-xs text-slate-400 line-clamp-1">{msg.message}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-slate-500">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
