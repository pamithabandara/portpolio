import React from "react";
import { db } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import LeadershipSection from "@/components/LeadershipSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const revalidate = 0; // Ensure fresh data on every update from CMS

export default async function HomePage() {
  const profile = await db.profile.findUnique({
    where: { id: "main_profile" },
  });

  const skills = await db.skill.findMany({
    orderBy: { order: "asc" },
  });

  const experiences = await db.experience.findMany({
    orderBy: { order: "asc" },
  });

  const projects = await db.project.findMany({
    orderBy: { order: "asc" },
  });

  const education = await db.education.findMany({
    orderBy: { order: "asc" },
  });

  const certifications = await db.certification.findMany({
    orderBy: { order: "asc" },
  });

  const leadership = await db.leadership.findMany({
    orderBy: { order: "asc" },
  });

  const references = await db.reference.findMany({
    orderBy: { order: "asc" },
  });

  const siteSettings = await db.siteSetting.findUnique({
    where: { id: "site_settings" },
  });

  // Default fallback profile if not yet seeded
  const safeProfile = profile || {
    id: "main_profile",
    fullName: "Chamoth Bandara",
    title: "Junior Data Analyst | Power BI Developer | Data Analytics Enthusiast",
    headline: "Transforming Data Into Meaningful Insights and Smarter Decisions.",
    bio: "",
    summary:
      "Statistics and Computer Science graduate with practical experience in developing interactive Power BI dashboards, automating business intelligence reporting, analyzing operational performance, and transforming complex datasets into actionable insights.",
    avatarUrl: "/uploads/chamoth_profile.jpg",
    email: "pamithabandara123@gmail.com",
    phone: "+94 71 929 9354",
    location: "Thulhiriya / Colombo, Sri Lanka",
    availability: "Available for Data Analyst & BI roles",
    availableForWork: true,
    cvUrl: "/uploads/Chamoth_Bandara_CV.pdf",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  };

  return (
    <div className="min-h-screen bg-midnight-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-300">
      <Navbar
        fullName={safeProfile.fullName}
        cvUrl={safeProfile.cvUrl}
      />

      <main className="flex-1">
        <Hero profile={safeProfile} />
        <About profile={safeProfile} />
        <SkillsSection skills={skills} />
        <ExperienceSection experiences={experiences} />
        <ProjectsSection projects={projects} />
        <EducationSection education={education} />
        <CertificationsSection certifications={certifications} />
        <LeadershipSection
          leadership={leadership}
          references={references}
          showLeadership={siteSettings?.showLeadership ?? true}
          showReferences={siteSettings?.showReferences ?? true}
        />
        <ContactSection profile={safeProfile} />
      </main>

      <Footer
        fullName={safeProfile.fullName}
        title={safeProfile.title}
        email={safeProfile.email}
        linkedinUrl={safeProfile.linkedinUrl}
        githubUrl={safeProfile.githubUrl}
      />
    </div>
  );
}
