import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, ExternalLink } from "lucide-react";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";

export const revalidate = 0; // Disable cache for admin pages

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-2">Manage your portfolio projects and case studies.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Link>
      </div>

      <div className="rounded-xl border border-border/40 bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border/40">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Project</th>
                <th scope="col" className="px-6 py-4 font-medium">Category</th>
                <th scope="col" className="px-6 py-4 font-medium">Status</th>
                <th scope="col" className="px-6 py-4 font-medium">Date</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-16 rounded overflow-hidden bg-muted flex-shrink-0">
                        {project.coverImage ? (
                          <Image 
                            src={project.coverImage} 
                            alt={project.title} 
                            fill 
                            className="object-cover" 
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-muted-foreground">
                            No Img
                          </div>
                        )}
                      </div>
                      <div className="font-medium text-foreground">{project.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-border">
                      {project.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      {project.published ? (
                        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-500/20">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-500/20">
                          Draft
                        </span>
                      )}
                      {project.featured && (
                        <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-500 ring-1 ring-inset ring-blue-500/20">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-muted-foreground">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        className="p-2 hover:text-primary transition-colors hover:bg-primary/10 rounded-md"
                        title="View Project"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <Link 
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 hover:text-blue-500 transition-colors hover:bg-blue-500/10 rounded-md"
                        title="Edit Project"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <DeleteProjectButton id={project.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No projects found. Click &quot;Add Project&quot; to create your first case study.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
