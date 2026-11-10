import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Chamoth Bandara | Junior Data Analyst & Power BI Developer",
  description:
    "Portfolio of Chamoth Bandara – Junior Data Analyst & Power BI Developer. Transforming operational data into meaningful insights, automated KPIs, and decision-support dashboards.",
  keywords: [
    "Chamoth Bandara",
    "Data Analyst",
    "Power BI Developer",
    "Business Intelligence",
    "DAX",
    "Power Query",
    "SQL",
    "Python",
    "Data Analytics Portfolio",
    "MAS Fabrics",
    "Sri Lanka Data Analyst",
  ],
  authors: [{ name: "Chamoth Bandara" }],
  creator: "Chamoth Bandara",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chamothbandara.com",
    title: "Chamoth Bandara | Junior Data Analyst & BI Developer",
    description:
      "Transforming Data Into Meaningful Insights and Smarter Decisions. Explore Power BI dashboards, KPI automation, and analytics projects.",
    siteName: "Chamoth Bandara Portfolio",
    images: [
      {
        url: "/uploads/chamoth_profile.jpg",
        width: 1200,
        height: 630,
        alt: "Chamoth Bandara - Data Analyst",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chamoth Bandara | Junior Data Analyst",
    description: "Transforming Data Into Meaningful Insights and Smarter Decisions.",
    images: ["/uploads/chamoth_profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#040711",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-midnight-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-300">
        {children}
      </body>
    </html>
  );
}
