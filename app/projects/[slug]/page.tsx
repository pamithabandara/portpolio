import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Github,
  Tag,
  CheckCircle2,
  Workflow,
  Sparkles,
  BarChart3,
  Layers,
  PieChart,
  FileText,
} from "lucide-react";
import { db } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await db.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) {
    return {
      title: "Project Not Found | Chamoth Bandara",
    };
  }

  return {
    title: `${project.title} | Chamoth Bandara Case Study`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = await db.project.findUnique({
    where: { slug: params.slug },
  });

  const profile = await db.profile.findUnique({
    where: { id: "main_profile" },
  });

  if (!project) {
    notFound();
  }

  const techList = project.technologies
    ? project.technologies.split(",").map((t) => t.trim())
    : [];

  let galleryImages: string[] = [];
  try {
    if (project.images) {
      galleryImages = JSON.parse(project.images);
    }
  } catch (e) {
    galleryImages = [];
  }

  return (
    <div className="min-h-screen bg-midnight-950 text-slate-100 flex flex-col">
      <Navbar
        fullName={profile?.fullName || "Chamoth Bandara"}
        cvUrl={profile?.cvUrl || "/uploads/Chamoth_Bandara_CV.pdf"}
      />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Navigation Button */}
          <div className="mb-8">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-midnight-900/80 border border-slate-800 hover:border-slate-700 transition-all group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Projects</span>
            </Link>
          </div>

          {/* Project Title Header */}
          <div className="space-y-4 mb-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-sky-950/80 text-cyan-400 border border-sky-800/60">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-cyan-400 text-midnight-950 font-semibold uppercase">
                  Featured Case Study
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              {project.shortDescription}
            </p>

            {/* Action Links & Metadata */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-midnight-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 shadow-md shadow-sky-500/20 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo / Interactive Report</span>
                </a>
              )}
            </div>
          </div>

          {/* Technology Pills Bar */}
          <div className="p-4 rounded-xl glass-card border border-sky-900/30 mb-10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              Technologies:
            </span>
            {techList.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-midnight-950 text-sky-300 border border-sky-900/60"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Visual Showcase / Image Gallery */}
          <div className="mb-14 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Project Visuals &amp; Documentation</span>
            </h2>

            {galleryImages.length > 0 && galleryImages.some((img) => img.startsWith("http")) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-midnight-900"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} screenshot ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl glass-card border border-dashed border-sky-900/60 text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-midnight-950 border border-sky-800/40 text-cyan-400 flex items-center justify-center mx-auto">
                  <Workflow className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-200">
                  Visual Screenshots &amp; Dashboards Gallery
                </p>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Power BI dashboard screenshots, process architecture diagrams, and documentation can be uploaded and managed directly via the private Admin Dashboard.
                </p>
              </div>
            )}
          </div>

          {/* Deep-Dive Case Study Narrative */}
          <div className="space-y-10">
            
            {/* 1. Project Overview */}
            {project.fullDescription && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>1. Project Overview</span>
                </h2>
                <div className="p-6 rounded-2xl glass-card border border-sky-900/30 text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                  {project.fullDescription}
                </div>
              </section>
            )}

            {/* 2. Problem Statement */}
            {project.problemStatement && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  <span>2. Problem Statement &amp; Challenges</span>
                </h2>
                <div className="p-6 rounded-2xl glass-card border border-rose-950/30 bg-gradient-to-r from-rose-950/10 to-transparent text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                  {project.problemStatement}
                </div>
              </section>
            )}

            {/* 3. Objectives */}
            {project.objectives && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span>3. Project Objectives</span>
                </h2>
                <div className="p-6 rounded-2xl glass-card border border-sky-900/30 text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                  {project.objectives}
                </div>
              </section>
            )}

            {/* 4. My Contribution */}
            {project.contribution && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  <span>4. My Role &amp; Contribution</span>
                </h2>
                <div className="p-6 rounded-2xl glass-card border border-sky-900/30 text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                  {project.contribution}
                </div>
              </section>
            )}

            {/* 5. Development Process */}
            {project.developmentProcess && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>5. Development &amp; Implementation Process</span>
                </h2>
                <div className="p-6 rounded-2xl glass-card border border-sky-900/30 text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                  {project.developmentProcess}
                </div>
              </section>
            )}

            {/* 6. Key Features */}
            {project.keyFeatures && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>6. Key Features &amp; Capabilities</span>
                </h2>
                <div className="p-6 rounded-2xl glass-card border border-sky-900/30 text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                  {project.keyFeatures}
                </div>
              </section>
            )}

            {/* 7. Results & Outcomes */}
            {project.outcomes && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>7. Results &amp; Measurable Business Outcomes</span>
                </h2>
                <div className="p-6 rounded-2xl glass-card border border-emerald-950/30 bg-gradient-to-r from-emerald-950/10 to-transparent text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                  {project.outcomes}
                </div>
              </section>
            )}

          </div>

          {/* Bottom Back Button */}
          <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between items-center">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio Projects</span>
            </Link>

            <a
              href={`mailto:${profile?.email || "pamithabandara123@gmail.com"}?subject=Inquiry regarding ${encodeURIComponent(project.title)}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-midnight-900 border border-slate-800 hover:border-cyan-500/50 transition-colors"
            >
              <span>Discuss This Project</span>
            </a>
          </div>

        </div>
      </main>

      <Footer
        fullName={profile?.fullName}
        title={profile?.title}
        email={profile?.email}
        linkedinUrl={profile?.linkedinUrl}
        githubUrl={profile?.githubUrl}
      />
    </div>
  );
}
