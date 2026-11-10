import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { getAdminSessionFromCookies } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSessionFromCookies();

  // If no session is present, children (e.g. login page) will render
  // Protected pages will be redirected by middleware, but login page won't have the sidebar
  if (!session) {
    return <div className="min-h-screen bg-midnight-950">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-midnight-950 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader userEmail={session.email} />
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
