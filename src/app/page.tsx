import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Services } from "@/components/home/Services";
import { ContactCTA } from "@/components/home/ContactCTA";
import { WhatsAppButton } from "@/components/home/WhatsAppButton";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const rawProjects = await prisma.project.findMany({
    where: { published: true, featured: true },
    include: { category: true },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  // Strictly serialize the data to plain objects for Client Components
  const projects = rawProjects.map(project => ({
    id: project.id,
    title: project.title,
    slug: project.slug,
    coverImage: project.coverImage,
    category: {
      name: project.category.name
    }
  }));

  return (
    <div className="flex flex-col w-full">
      <Hero />
      <FeaturedProjects projects={projects} />
      <Services />
      <ContactCTA />
      <WhatsAppButton />
    </div>
  );
}
