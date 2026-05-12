"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error("Contact error:", err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later or reach out directly.");
    }
  }

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-500/10 border border-green-500/20 text-green-500 p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4"
      >
        <CheckCircle className="h-12 w-12" />
        <div>
          <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
          <p className="opacity-90">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
        </div>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-4 px-6 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-full transition-colors text-sm font-medium"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-muted/20 border border-border/40 p-8 md:p-10 rounded-3xl relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      {status === "error" && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground/80">Name</label>
          <input
            id="name"
            name="name"
            required
            disabled={status === "submitting"}
            className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
            placeholder="John Doe"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground/80">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={status === "submitting"}
            className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="space-y-2 relative z-10">
        <label htmlFor="subject" className="text-sm font-medium text-foreground/80">Subject</label>
        <input
          id="subject"
          name="subject"
          required
          disabled={status === "submitting"}
          className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
          placeholder="Project Inquiry"
        />
      </div>

      <div className="space-y-2 relative z-10">
        <label htmlFor="message" className="text-sm font-medium text-foreground/80">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          disabled={status === "submitting"}
          className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none disabled:opacity-50"
          placeholder="Tell us about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-primary text-primary-foreground h-14 rounded-xl font-medium shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70 relative z-10"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="h-5 w-5 ml-1" />
          </>
        )}
      </button>
    </form>
  );
}
