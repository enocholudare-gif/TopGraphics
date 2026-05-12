import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { DeleteCategoryButton } from "@/components/admin/DeleteCategoryButton";

export const revalidate = 0; // Disable cache for admin pages

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { projects: true }
      }
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-2">Manage your project categories and pricing.</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Link>
      </div>

      <div className="rounded-xl border border-border/40 bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border/40">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Name</th>
                <th scope="col" className="px-6 py-4 font-medium">Slug</th>
                <th scope="col" className="px-6 py-4 font-medium">Base Price</th>
                <th scope="col" className="px-6 py-4 font-medium">Projects Count</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {category.slug}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {category.basePrice ? `$${category.basePrice.toLocaleString()}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                      {category._count.projects} Projects
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-muted-foreground">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/admin/categories/${category.id}/edit`}
                        className="p-2 hover:text-blue-500 transition-colors hover:bg-blue-500/10 rounded-md"
                        title="Edit Category"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <DeleteCategoryButton 
                        id={category.id} 
                        disabled={category._count.projects > 0} 
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No categories found. Click &quot;Add Category&quot; to create your first category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
