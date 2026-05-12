"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Trash2, Loader2 } from "lucide-react";

interface ContactActionsProps {
  id: string;
  isRead: boolean;
}

export function ContactActions({ id, isRead }: ContactActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const toggleReadStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !isRead }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error updating message status");
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async () => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete message");
      
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error deleting message");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={toggleReadStatus}
        disabled={loading || deleting}
        className={`inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors disabled:opacity-50 ${
          isRead 
            ? "bg-muted text-muted-foreground hover:bg-muted/80" 
            : "bg-primary/10 text-primary hover:bg-primary/20"
        }`}
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : isRead ? (
          <XCircle className="mr-2 h-4 w-4" />
        ) : (
          <CheckCircle className="mr-2 h-4 w-4" />
        )}
        {isRead ? "Mark Unread" : "Mark as Read"}
      </button>

      <button
        onClick={deleteMessage}
        disabled={loading || deleting}
        className="inline-flex h-9 items-center justify-center rounded-md bg-destructive/10 px-4 text-sm font-medium text-destructive hover:bg-destructive/20 transition-colors disabled:opacity-50"
        title="Delete Message"
      >
        {deleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
