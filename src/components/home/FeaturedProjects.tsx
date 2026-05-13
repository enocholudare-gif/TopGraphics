"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Project = {
  id: string;
  title: string;
  slug: string;
  coverImage: string | null;
  category: { name: string };
};

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="relative py-32 overflow-hidden border-t border-border/40">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] opacity-60 pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
            >
              Selected Works
            </h2>
            <p 
              className="text-muted-foreground text-lg md:text-xl"
            >
              A glimpse into our latest and greatest projects across various industries.
            </p>
          </div>
          <div>
            <Link
              href="/projects"
              className="hidden md:inline-flex items-center text-sm font-semibold hover:text-primary transition-colors group"
            >
              View all projects <ArrowRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group flex flex-col gap-5"
            >
              <Link href={`/projects/${project.slug}`} className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl block bg-muted shadow-2xl">
                {project.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted/50">
                    No image available
                  </div>
                )}
                {/* Glassmorphism Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                  <span className="backdrop-blur-md bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full text-sm font-medium transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">
                    View Case Study <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
              <div>
                <p className="text-sm font-medium text-primary/80 mb-1">{project.category.name}</p>
                <h3 className="text-2xl font-semibold tracking-tight">
                  <Link href={`/projects/${project.slug}`} className="hover:underline underline-offset-4">
                    {project.title}
                  </Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <Link
            href="/projects"
            className="inline-flex items-center text-sm font-medium hover:text-primary transition-colors"
          >
            View all projects <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
