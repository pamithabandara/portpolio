# Chamoth Bandara – Personal Portfolio & Headless CMS

> **Production-grade personal portfolio and private content management system (CMS)** designed for **Chamoth Bandara – Junior Data Analyst & Power BI Developer**.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-5.21-16a34a?style=flat&logo=prisma)
![SQLite / PostgreSQL](https://img.shields.io/badge/Database-SQLite%20%7C%20Postgres-336791?style=flat&logo=postgresql)

---

## 🌟 Overview

This web application combines a **sophisticated public personal portfolio** with an **authenticated single-owner private admin dashboard (CMS)**. 

Every section of the website—biography, hero text, photo gallery, skills, professional experience, project case studies, education, certifications, and contact inquiries—is connected directly to the database and editable without touching source code.

### 🎨 Visual & UI/UX Aesthetic
- **Color Palette**: Deep midnight navy (`#040711`, `#070D1D`), electric cyan (`#06B6D4`, `#38BDF8`), subtle gradients, and crisp typography.
- **Data Analytics Aesthetic**: Subtle animated grid coordinate accents, floating KPI indicators, live operational metric ribbons, and structured tabular views.
- **Glassmorphism**: Selective backdrop blur panels, radiant glow hover states, and smooth responsive transitions.
- **Recruiter-Ready**: One-click CV download delivering the official curriculum vitae PDF, responsive across desktop, tablet, and mobile devices.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom midnight/cyan theme
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/) with SQLite (zero-config local dev) and instant PostgreSQL/Supabase compatibility
- **Authentication**: Stateless JWT with [jose](https://github.com/panva/jose) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js) stored in secure, `httpOnly`, `SameSite` cookies
- **Edge Middleware**: Route-level protection for `/admin/*` and `/api/admin/*`
- **File & Media Storage**: Local persistent storage under `/public/uploads` with MIME/size validation + Supabase Storage compatibility

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed on your computer.

### 2. Installation
```bash
git clone <your-repo-url>
cd portfolio
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default configuration:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="chamoth_portfolio_super_secure_jwt_secret_key_2026_!@#$"
ADMIN_EMAIL="pamithabandara123@gmail.com"
ADMIN_PASSWORD="AdminPassword2026!"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup & Seeding
Initialize the database and populate it with Chamoth Bandara's authentic CV data:
```bash
npx prisma db push
npm run db:seed
```

### 5. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the portfolio.

---

## 🔐 Private Admin Dashboard

Access the private admin panel at:
**[http://localhost:3000/admin/login](http://localhost:3000/admin/login)**

### Default Credentials
- **Email**: `pamithabandara123@gmail.com`
- **Password**: `AdminPassword2026!`

*(You can change your password anytime or update it in the database)*

### Admin Capabilities
1. **Overview Dashboard**: Live statistics, quick management shortcuts, and inbox summary.
2. **Profile Management**: Update your name, job title, headline, summary, bio, location, and job search availability.
3. **Photo Management**: Upload new portraits, manage photo gallery, and toggle which photo appears as the active primary portrait.
4. **Skills Management**: Add, edit, categorize (BI & Reporting, SQL, Programming, Statistics, Foundations), and toggle core skills.
5. **Experience Management**: Edit titles, companies, dates, and manage bulleted responsibilities.
6. **Projects Management**: Full CRUD with deep-dive case study fields (problem statements, objectives, contributions, key features, outcomes, image galleries, GitHub & live demo links).
7. **Education & Certifications**: Maintain academic credentials and upload certificate scans/PDFs.
8. **CV Management**: Upload a new curriculum vitae PDF to replace the old file. All public download buttons automatically deliver the latest file.
9. **Contact Messages Inbox**: Read inquiries submitted by recruiters, toggle read/unread status, reply via email, or delete messages.
10. **Website Settings**: Configure SEO title, meta descriptions, and section visibility toggles.

---

## 🌐 Deploying to Production (Vercel & Supabase)

### Step 1: Push Code to GitHub
```bash
git init
git config user.name "Chamoth Bandara"
git config user.email "pamithabandara123@gmail.com"
git add .
git commit -m "feat: initial release of Chamoth Bandara personal portfolio and CMS"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

### Step 2: Database Setup on Supabase or Neon (PostgreSQL)
1. Create a free PostgreSQL database on [Supabase](https://supabase.com) or [Neon](https://neon.tech).
2. Copy your PostgreSQL connection string:
   `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`
3. In `prisma/schema.prisma`, update the datasource:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Push schema and seed data to the cloud database:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

### Step 3: Deploy to Vercel
1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Add the following environment variables in the Vercel Project Settings:
   - `DATABASE_URL`: Your Supabase/Neon PostgreSQL connection string.
   - `JWT_SECRET`: A strong random secret key.
   - `ADMIN_EMAIL`: `pamithabandara123@gmail.com`
   - `ADMIN_PASSWORD`: Your chosen secure password.
   - `NEXT_PUBLIC_APP_URL`: Your production URL (e.g., `https://chamothbandara.vercel.app`).
3. Click **Deploy**!

---

## 📂 Project Structure

```
portfolio/
├── app/
│   ├── (public)
│   │   ├── page.tsx               # Public portfolio homepage
│   │   └── projects/[slug]/page.tsx# Dedicated case study detail view
│   ├── admin/
│   │   ├── login/page.tsx         # Secure admin login
│   │   ├── layout.tsx             # CMS layout & session verification
│   │   ├── page.tsx               # Overview dashboard & stats
│   │   ├── profile/page.tsx       # Profile & bio editor
│   │   ├── photos/page.tsx        # Photo management & primary selector
│   │   ├── skills/page.tsx        # Skills CRUD & categorization
│   │   ├── experience/page.tsx    # Professional experience manager
│   │   ├── projects/              # Projects CRUD & case study editor
│   │   ├── education/page.tsx     # Education timeline manager
│   │   ├── certifications/page.tsx# Certifications manager
│   │   ├── messages/page.tsx      # Contact messages inbox
│   │   ├── cv/page.tsx            # CV PDF manager
│   │   └── settings/page.tsx      # SEO & site settings
│   ├── api/
│   │   ├── auth/                  # Login, logout, me session
│   │   ├── contact/               # Public contact form submission endpoint
│   │   ├── upload/                # Authenticated file/image uploader
│   │   └── admin/                 # Protected CRUD API handlers
│   ├── globals.css                # Custom glassmorphism, glowing borders
│   └── layout.tsx                 # Root layout with SEO metadata
├── components/
│   ├── Navbar.tsx                 # Sticky navigation with active indicator & CV button
│   ├── Hero.tsx                   # Hero banner with photo, badges & metrics
│   ├── About.tsx                  # 2-column biography & core competencies
│   ├── SkillsSection.tsx          # Categorized skill cards & search filter
│   ├── ExperienceSection.tsx      # Career timeline with expandable points
│   ├── ProjectsSection.tsx        # Projects grid with category filters
│   ├── EducationSection.tsx       # Academic timeline
│   ├── CertificationsSection.tsx  # Credential cards & verification links
│   ├── LeadershipSection.tsx      # Student activities & references
│   ├── ContactSection.tsx         # Contact form with spam honeypot
│   ├── Footer.tsx                 # Dynamic copyright & back to top
│   └── admin/                     # CMS Sidebar, Header, ImageUploader, ProjectForm
├── lib/
│   ├── db.ts                      # Prisma client singleton
│   ├── auth.ts                    # JWT token sign & verify helpers
│   ├── utils.ts                   # Class merge & date formatting
│   └── types.ts                   # TypeScript interfaces
├── prisma/
│   ├── schema.prisma              # Complete data models
│   └── dev.db                     # Local SQLite database
├── public/
│   └── uploads/
│       ├── chamoth_profile.jpg    # Chamoth Bandara's profile photo
│       └── Chamoth_Bandara_CV.pdf # Chamoth Bandara's official CV PDF
├── scripts/
│   ├── seed.mjs                   # Database seed script with authentic CV data
│   └── test-server.mjs            # Production validation test runner
├── middleware.ts                  # Edge route protection for admin routes
├── package.json
└── tailwind.config.ts
```

---

## 📄 License
Created for Chamoth Bandara. All rights reserved.
