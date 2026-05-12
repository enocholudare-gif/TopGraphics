import prisma from "@/lib/prisma";
import { CategoryForm } from "@/components/admin/CategoryForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const category = await prisma.category.findUnique({
    where: { id: params.id }
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <Link 
          href="/admin/categories" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to categories
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
        <p className="text-muted-foreground mt-2">Update the details of this category.</p>
      </div>

      <div className="p-6 md:p-8 border border-border/40 bg-card rounded-2xl shadow-sm">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
}
