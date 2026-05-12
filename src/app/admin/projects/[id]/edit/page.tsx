import prisma from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/ProjectForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const [project, categories] = await Promise.all([
    prisma.project.findUnique({
      where: { id: params.id }
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true }
    })
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <Link 
          href="/admin/projects" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to projects
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground mt-2">Update the details of this portfolio project.</p>
      </div>

      <div className="p-6 md:p-8 border border-border/40 bg-card rounded-2xl shadow-sm">
        <ProjectForm categories={categories} initialData={project} />
      </div>
    </div>
  );
}
