import prisma from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/ProjectForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 0;

export default async function NewProjectPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true }
  });

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <Link 
          href="/admin/projects" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to projects
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
        <p className="text-muted-foreground mt-2">Add a new portfolio piece to showcase your work.</p>
      </div>

      <div className="p-6 md:p-8 border border-border/40 bg-card rounded-2xl shadow-sm">
        <ProjectForm categories={categories} />
      </div>
    </div>
  );
}
