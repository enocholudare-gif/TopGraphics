"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  basePrice: number | null;
};

export function CategoryForm({ initialData }: { initialData?: Category }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      
      const data = {
        name: formData.get("name"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        basePrice: formData.get("basePrice"),
      };

      const url = initialData ? `/api/categories/${initialData.id}` : "/api/categories";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || `Failed to ${initialData ? "update" : "create"} category`);
      }

      router.push("/admin/categories");
      router.refresh();
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred");
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-md text-sm border border-red-500/20">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input
            name="name"
            required
            defaultValue={initialData?.name}
            className="w-full bg-muted/50 border border-border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all"
            placeholder="Category Name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <input
            name="slug"
            required
            defaultValue={initialData?.slug}
            className="w-full bg-muted/50 border border-border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all"
            placeholder="category-slug"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          rows={4}
          defaultValue={initialData?.description || ""}
          className="w-full bg-muted/50 border border-border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all resize-none"
          placeholder="Brief description of the category..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Base Price (Optional)</label>
        <input
          type="number"
          step="0.01"
          name="basePrice"
          defaultValue={initialData?.basePrice || ""}
          className="w-full bg-muted/50 border border-border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all"
          placeholder="e.g. 500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="h-12 px-8 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {initialData ? "Update Category" : "Create Category"}
      </button>
    </form>
  );
}
