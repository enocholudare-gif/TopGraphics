import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | TOP Graphics",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar />
      <main className="flex-1 flex flex-col w-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
