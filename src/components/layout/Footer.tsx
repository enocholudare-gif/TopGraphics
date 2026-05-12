import Link from "next/link";
import { Mail } from "lucide-react";
import { FaInstagram, FaTwitter } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background mt-20">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Designed by{" "}
            <span className="font-medium text-foreground">
              Orbit Tech
            </span>
            . All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center space-x-4 text-muted-foreground">
          <Link href="https://instagram.com" target="_blank" className="hover:text-foreground transition-colors">
            <FaInstagram size={20} />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="https://twitter.com" target="_blank" className="hover:text-foreground transition-colors">
            <FaTwitter size={20} />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="mailto:hello@topgraphics.com" className="hover:text-foreground transition-colors">
            <Mail size={20} />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
