import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-8xl font-bold text-primary/20">404</h1>
        <h2 className="text-3xl font-bold tracking-tight">Page Not Found</h2>
        <p className="text-muted-foreground text-lg">
          We couldn&apos;t find the page you were looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-transform hover:scale-105 mt-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
