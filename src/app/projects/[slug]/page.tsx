import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} | TOP Graphics`,
    description: project.description || "View this project in our portfolio.",
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      images: true,
    },
  });

  if (!project || (!project.published)) {
    notFound();
  }

  return (
    <div className="container px-4 md:px-6 py-24 mx-auto min-h-screen">
      <Link href="/projects" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to projects
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        <div className="lg:col-span-2">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">{project.title}</h1>
          {project.description && (
            <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">
              {project.description.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-6 bg-muted/20 p-8 rounded-2xl border border-border/40 h-fit">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Category</h3>
            <p className="text-lg font-medium">{project.category.name}</p>
          </div>
          {project.client && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Client</h3>
              <p className="text-lg font-medium">{project.client}</p>
            </div>
          )}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Date</h3>
            <p className="text-lg font-medium">
              {new Date(project.createdAt).toLocaleDateString("en-US", { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {project.coverImage && (
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 bg-muted">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {project.images && project.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          {project.images.map((img) => (
            <div key={img.id} className="relative aspect-square md:aspect-video rounded-xl overflow-hidden bg-muted">
              <Image
                src={img.url}
                alt={img.altText || project.title}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-32 text-center border-t border-border/40 pt-20">
        <h2 className="text-3xl font-bold mb-6">Like what you see?</h2>
        <Link
          href="/#contact"
          className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105"
        >
          Let&apos;s work together
        </Link>
      </div>
    </div>
  );
}
