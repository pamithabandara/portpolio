import React from "react";
import { db } from "@/lib/db";
import {
  initialProfile,
  initialSkills,
  initialExperiences,
  initialProjects,
  initialEducation,
  initialCertifications,
  initialLeadership,
  initialReferences,
  initialSiteSettings,
} from "@/lib/initialData";
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

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let profile = initialProfile;
  let skills = initialSkills;
  let experiences = initialExperiences;
  let projects = initialProjects;
  let education = initialEducation;
  let certifications = initialCertifications;
  let leadership = initialLeadership;
  let references = initialReferences;
  let siteSettings = initialSiteSettings;

  try {
    const [
      dbProfile,
      dbSkills,
      dbExperiences,
      dbProjects,
      dbEducation,
      dbCertifications,
      dbLeadership,
      dbReferences,
      dbSiteSettings,
    ] = await Promise.all([
      db.profile.findUnique({ where: { id: "main_profile" } }),
      db.skill.findMany({ orderBy: { order: "asc" } }),
      db.experience.findMany({ orderBy: { order: "asc" } }),
      db.project.findMany({ orderBy: { order: "asc" } }),
      db.education.findMany({ orderBy: { order: "asc" } }),
      db.certification.findMany({ orderBy: { order: "asc" } }),
      db.leadership.findMany({ orderBy: { order: "asc" } }),
      db.reference.findMany({ orderBy: { order: "asc" } }),
      db.siteSetting.findUnique({ where: { id: "site_settings" } }),
    ]);

    if (dbProfile) profile = dbProfile as any;
    if (dbSkills && dbSkills.length > 0) skills = dbSkills as any;
    if (dbExperiences && dbExperiences.length > 0) experiences = dbExperiences as any;
    if (dbProjects && dbProjects.length > 0) projects = dbProjects as any;
    if (dbEducation && dbEducation.length > 0) education = dbEducation as any;
    if (dbCertifications && dbCertifications.length > 0) certifications = dbCertifications as any;
    if (dbLeadership && dbLeadership.length > 0) leadership = dbLeadership as any;
    if (dbReferences && dbReferences.length > 0) references = dbReferences as any;
    if (dbSiteSettings) siteSettings = dbSiteSettings as any;
  } catch (err) {
    // Database fallback to initial authentic data if uninitialized on cloud lambda
    console.warn("Using fallback initial portfolio data:", err);
  }

  return (
    <div className="min-h-screen bg-midnight-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-300">
      <Navbar
        fullName={profile.fullName}
        cvUrl={profile.cvUrl}
      />

      <main className="flex-1">
        <Hero profile={profile} />
        <About profile={profile} />
        <SkillsSection skills={skills} />
        <ExperienceSection experiences={experiences} />
        <ProjectsSection projects={projects} />
        <EducationSection education={education} />
        <CertificationsSection certifications={certifications} />
        <LeadershipSection
          leadership={leadership}
          references={references}
          showLeadership={siteSettings.showLeadership ?? true}
          showReferences={siteSettings.showReferences ?? true}
        />
        <ContactSection profile={profile} />
      </main>

      <Footer
        fullName={profile.fullName}
        title={profile.title}
        email={profile.email}
        linkedinUrl={profile.linkedinUrl}
        githubUrl={profile.githubUrl}
      />
    </div>
  );
}
