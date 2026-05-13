"use client";

import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const hasAccepted = localStorage.getItem("topgraphics_cookie_consent");
    if (!hasAccepted) {
      // Small delay to not overwhelm the user immediately on page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("topgraphics_cookie_consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[100] md:max-w-sm"
    >
      <div className="bg-card border border-border/50 shadow-2xl rounded-2xl p-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Cookie className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">We use cookies</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies to improve your experience on our site and to analyze our traffic.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleAccept}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-xl text-sm font-medium transition-colors"
          >
            Accept All
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 rounded-xl text-sm font-medium transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
