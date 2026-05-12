"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteCategoryButtonProps {
  id: string;
  disabled?: boolean;
}

export function DeleteCategoryButton({ id, disabled }: DeleteCategoryButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete category");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error deleting category");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={disabled || isDeleting}
      className="p-2 hover:text-destructive transition-colors hover:bg-destructive/10 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      title={disabled ? "Cannot delete category with projects" : "Delete Category"}
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </button>
  );
}
