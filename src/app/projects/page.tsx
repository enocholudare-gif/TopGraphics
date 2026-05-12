import prisma from "@/lib/prisma";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects | TOP Graphics",
  description: "Explore our portfolio of brand identities, web designs, and digital art.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container px-4 md:px-6 py-24 mx-auto min-h-screen">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">All Projects</h1>
        <p className="text-xl text-muted-foreground">
          Explore our complete portfolio of brand identities, web designs, and digital art.
        </p>
      </div>
      
      <ProjectGrid projects={projects} />
    </div>
  );
}
