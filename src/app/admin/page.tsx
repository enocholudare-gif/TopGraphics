import prisma from "@/lib/prisma";
import { FolderGit2, Tags, MessageSquare, Eye } from "lucide-react";
import Link from "next/link";

export const revalidate = 0; // Don't cache admin pages

export default async function AdminDashboard() {
  const [
    totalProjects,
    publishedProjects,
    totalCategories,
    totalMessages,
    unreadMessages,
    recentProjects,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.category.count(),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
  ]);

  const stats = [
    {
      name: "Total Projects",
      value: totalProjects,
      description: `${publishedProjects} published`,
      icon: FolderGit2,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      name: "Categories",
      value: totalCategories,
      description: "Active project categories",
      icon: Tags,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      name: "Contact Messages",
      value: totalMessages,
      description: `${unreadMessages} unread messages`,
      icon: MessageSquare,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      name: "Page Views",
      value: "1,248", // Placeholder for actual analytics
      description: "+12% from last month",
      icon: Eye,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here&apos;s what&apos;s happening with your portfolio today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="rounded-xl border border-border/40 bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">{stat.name}</h3>
              <div className={`h-8 w-8 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <div className="col-span-4 rounded-xl border border-border/40 bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">Recent Projects</h3>
            <p className="text-sm text-muted-foreground">Your latest portfolio additions</p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-8">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{project.title}</p>
                    <p className="text-sm text-muted-foreground">{project.category.name}</p>
                  </div>
                  <div className="ml-auto font-medium">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.published ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                    }`}>
                      {project.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
              ))}
              {recentProjects.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No projects yet. Create one!</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-span-3 rounded-xl border border-border/40 bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center p-6 text-center">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <FolderGit2 className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Create New Project</h3>
          <p className="text-sm text-muted-foreground mb-6">Add a new case study to your portfolio to showcase your latest work.</p>
          <Link
            href="/admin/projects/new"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Add Project
          </Link>
        </div>
      </div>
    </div>
  );
}
