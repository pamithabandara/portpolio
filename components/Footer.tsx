"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail, Shield, Heart } from "lucide-react";

interface FooterProps {
  fullName?: string;
  title?: string;
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export default function Footer({
  fullName = "Chamoth Bandara",
  title = "Junior Data Analyst | Power BI Developer",
  email = "pamithabandara123@gmail.com",
  linkedinUrl = "https://linkedin.com",
  githubUrl = "https://github.com",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-midnight-950 border-t border-sky-950/80 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-900">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-cyan-500 to-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-midnight-900 rounded-[10px] flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 font-mono text-xs">
                  CB
                </div>
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight">
                  {fullName}
                </span>
                <p className="text-xs text-sky-400 font-mono">
                  {title}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Transforming complex operational data into actionable Power BI dashboards, automated KPIs, and transparent business intelligence models.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-midnight-900 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-midnight-900 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${email}`}
                className="p-2 rounded-lg bg-midnight-900 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">
              Navigation
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
              <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
              <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
              <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
              <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
              <a href="#education" className="hover:text-cyan-400 transition-colors">Education</a>
              <a href="#certifications" className="hover:text-cyan-400 transition-colors">Certifications</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
            </div>
          </div>

          {/* Admin & Back to Top (3 cols) */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end space-y-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono text-slate-300 bg-midnight-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all group"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500 hover:text-sky-400 transition-colors"
            >
              <Shield className="w-3 h-3" />
              <span>Admin Dashboard</span>
            </Link>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} {fullName}. All rights reserved.
          </p>
          <p className="font-mono text-[11px]">
            Designed &amp; Developed for High-Impact Decision Support
          </p>
        </div>

      </div>
    </footer>
  );
}
