"use client";

export function WhatsAppButton() {
  // Using a placeholder number. The user can update this later.
  const phoneNumber = "+2347058799440"; 
  const message = encodeURIComponent("Hello! I'm interested in your design services.");
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-[90] md:bottom-8 md:right-8"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 active:scale-95 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse effect rings */}
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-0 group-hover:animate-ping" />
        <span className="absolute -inset-1 rounded-full border-2 border-[#25D366]/50 opacity-0 group-hover:animate-ping delay-75" />
        
        {/* WhatsApp Icon */}
        <svg 
          viewBox="0 0 24 24" 
          width="28" 
          height="28" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="relative z-10"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 w-max rounded-lg bg-foreground px-3 py-2 text-xs font-medium text-background opacity-0 shadow-sm transition-opacity group-hover:opacity-100 pointer-events-none">
          Chat with us!
        </span>
      </a>
    </div>
  );
}
