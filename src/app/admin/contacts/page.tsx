import prisma from "@/lib/prisma";
import { Mail, Clock } from "lucide-react";
import { ContactActions } from "@/components/admin/ContactActions";

export const revalidate = 0; // Disable cache for admin pages

export default async function AdminContactsPage() {
  const messages = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground mt-2">View and manage contact inquiries from your website.</p>
      </div>

      <div className="grid gap-6">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`rounded-xl border p-6 transition-colors ${
              message.read 
                ? 'bg-card border-border/40 text-card-foreground' 
                : 'bg-primary/5 border-primary/20 text-card-foreground'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  message.read ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'
                }`}>
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-lg">{message.name}</h3>
                  <a href={`mailto:${message.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {message.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  {new Date(message.createdAt).toLocaleString()}
                </div>
                {!message.read && (
                  <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-500 ring-1 ring-inset ring-blue-500/20">
                    New
                  </span>
                )}
              </div>
            </div>
            
            <div className="pl-13 mt-4 text-muted-foreground bg-muted/20 p-4 rounded-lg border border-border/20 relative">
              <div className="absolute top-4 left-4 text-4xl text-muted-foreground/20 leading-none font-serif">&quot;</div>
              <p className="whitespace-pre-wrap pl-6 relative z-10">{message.message}</p>
            </div>

              <div className="mt-6 flex justify-end gap-3 items-center">
                <ContactActions id={message.id} isRead={message.read} />
                <a 
                href={`mailto:${message.email}?subject=Re: Your inquiry to TOP Graphics`}
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Reply via Email
              </a>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="rounded-xl border border-dashed border-border/50 py-20 text-center">
            <Mail className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No messages yet</h3>
            <p className="text-muted-foreground mt-1">When someone contacts you, their message will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
