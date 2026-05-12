import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Services } from "@/components/home/Services";
import { ContactCTA } from "@/components/home/ContactCTA";
import { WhatsAppButton } from "@/components/home/WhatsAppButton";
import prisma from "@/lib/prisma";

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const projects = await prisma.project.findMany({
    where: { published: true, featured: true },
    include: { category: true },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

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
