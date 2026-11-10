export interface ProfileData {
  id: string;
  fullName: string;
  title: string;
  headline: string;
  bio: string;
  summary: string;
  avatarUrl: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  availableForWork: boolean;
  cvUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  icon?: string | null;
  order: number;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  companyUrl?: string | null;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string; // JSON string array or newline separated
  technologies: string;
  order: number;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  technologies: string;
  problemStatement?: string | null;
  objectives?: string | null;
  contribution?: string | null;
  developmentProcess?: string | null;
  keyFeatures?: string | null;
  outcomes?: string | null;
  thumbnailUrl?: string | null;
  images?: string | null; // JSON string array
  githubUrl?: string | null;
  liveDemoUrl?: string | null;
  featured: boolean;
  published: boolean;
  order: number;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  institutionUrl?: string | null;
  location?: string | null;
  startYear: string;
  endYear: string;
  description?: string | null;
  grade?: string | null;
  order: number;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string | null;
  credentialUrl?: string | null;
  imageUrl?: string | null;
  pdfUrl?: string | null;
  order: number;
}

export interface LeadershipItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  order: number;
}

export interface ReferenceItem {
  id: string;
  name: string;
  title: string;
  organization: string;
  email?: string | null;
  phone?: string | null;
  visible: boolean;
  order: number;
}

export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string | Date;
}

export interface SiteSettingsData {
  id: string;
  siteTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  showReferences: boolean;
  showLeadership: boolean;
  showContactInfo: boolean;
}
