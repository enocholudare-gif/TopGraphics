"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 flex items-center justify-center min-h-[85vh]">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-50" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <div
          className="inline-flex items-center rounded-full border border-border/40 bg-background/50 px-3 py-1 text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Available for new projects
        </div>
        
        <h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 mb-6"
        >
          Crafting Visual Identities That Command Attention.
        </h1>
        
        <p
          className="text-xl text-muted-foreground max-w-2xl mb-10"
        >
          Premium graphic design, brand identity, and digital experiences tailored to elevate your business above the noise.
        </p>
        
        <div
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/projects"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            View Portfolio
          </Link>
          <Link
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-transparent px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Let&apos;s Talk <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
