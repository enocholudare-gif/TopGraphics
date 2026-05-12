"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ContactCTA() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl border border-border/40 bg-background/50 backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-2xl"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Ready to elevate your brand?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Let&apos;s discuss how we can bring your creative vision to life with our premium design solutions.
          </p>
          <Link
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Start a Project <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
