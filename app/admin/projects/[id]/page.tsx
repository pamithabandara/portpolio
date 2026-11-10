import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ProjectForm from "@/components/admin/ProjectForm";

export const revalidate = 0;

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const project = await db.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    notFound();
  }

  return <ProjectForm initialData={project} isNew={false} />;
}
