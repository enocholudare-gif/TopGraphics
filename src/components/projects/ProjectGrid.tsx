"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  title: string;
  slug: string;
  coverImage: string | null;
  category: { name: string };
};

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(projects.map(p => p.category.name))).sort();

  const filteredProjects = filter 
    ? projects.filter(p => p.category.name === filter)
    : projects;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setFilter(null)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
            filter === null 
              ? "bg-primary text-primary-foreground border-primary" 
              : "bg-transparent border-border hover:border-primary/50 text-foreground"
          )}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
              filter === cat 
                ? "bg-primary text-primary-foreground border-primary" 
                : "bg-transparent border-border hover:border-primary/50 text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <motion.div
            layout
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="group relative flex flex-col gap-4"
          >
            <Link href={`/projects/${project.slug}`} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted/50 block">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  No image available
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-background/90 text-foreground px-6 py-3 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  View Case Study
                </span>
              </div>
            </Link>
            <div>
              <p className="text-sm font-medium text-primary/80 mb-1">{project.category.name}</p>
              <h3 className="text-xl font-semibold tracking-tight">
                <Link href={`/projects/${project.slug}`} className="hover:underline underline-offset-4">
                  {project.title}
                </Link>
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="py-20 text-center text-muted-foreground border border-dashed rounded-xl border-border/50">
          No projects found in this category.
        </div>
      )}
    </div>
  );
}
