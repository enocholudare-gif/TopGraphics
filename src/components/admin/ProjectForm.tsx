"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";

type Category = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  client: string | null;
  categoryId: string;
  coverImage: string | null;
  published: boolean;
  featured: boolean;
};

export function ProjectForm({ categories, initialData }: { categories: Category[], initialData?: Project }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(initialData?.coverImage || null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      let coverImageUrl = coverImage;

      // 1. Upload image if a new one was selected
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        if (!uploadRes.ok) throw new Error("Failed to upload image");
        
        const uploadJson = await uploadRes.json();
        coverImageUrl = uploadJson.url;
      }

      // 2. Submit project data
      const projectData = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        client: formData.get("client"),
        categoryId: formData.get("categoryId"),
        coverImage: coverImageUrl,
        published: formData.get("published") === "true",
        featured: formData.get("featured") === "true",
      };

      const url = initialData ? `/api/projects/${initialData.id}` : "/api/projects";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || `Failed to ${initialData ? "update" : "create"} project`);
      }

      router.push("/admin/projects");
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
          <label className="text-sm font-medium">Title</label>
          <input
            name="title"
            required
            defaultValue={initialData?.title}
            className="w-full bg-muted/50 border border-border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all"
            placeholder="Project Title"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <input
            name="slug"
            required
            defaultValue={initialData?.slug}
            className="w-full bg-muted/50 border border-border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all"
            placeholder="project-slug"
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
          placeholder="Brief description of the project..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Client (Optional)</label>
          <input
            name="client"
            defaultValue={initialData?.client || ""}
            className="w-full bg-muted/50 border border-border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all"
            placeholder="Client Name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <select
            name="categoryId"
            required
            defaultValue={initialData?.categoryId}
            className="w-full bg-muted/50 border border-border rounded-md px-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Cover Image</label>
        <div className="border-2 border-dashed border-border/60 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden bg-muted/20">
          {coverImage ? (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image src={coverImage} alt="Cover preview" fill className="object-cover" />
              <button
                type="button"
                onClick={() => {
                  setCoverImage(null);
                  setImageFile(null);
                }}
                className="absolute top-2 right-2 p-1.5 bg-background/80 hover:bg-background rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium">Click to upload cover image</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 5MB</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-8 border-t border-border/40 pt-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="published" value="true" defaultChecked={initialData?.published} className="w-4 h-4 accent-primary" />
          <span className="text-sm font-medium">Published</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="featured" value="true" defaultChecked={initialData?.featured} className="w-4 h-4 accent-primary" />
          <span className="text-sm font-medium">Featured</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="h-12 px-8 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {initialData ? "Update Project" : "Create Project"}
      </button>
    </form>
  );
}
