const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@topgraphics.com' },
    update: {},
    create: {
      email: 'admin@topgraphics.com',
      password: hashedPassword,
      name: 'Admin',
    },
  });

  console.log('Admin user created:', admin.email);

  // Seed Categories
  const category1 = await prisma.category.upsert({
    where: { slug: 'brand-identity' },
    update: {},
    create: {
      name: 'Brand Identity',
      slug: 'brand-identity',
      description: 'Full branding packages including logos, color palettes, and typography.',
    },
  });

  const category2 = await prisma.category.upsert({
    where: { slug: 'web-design' },
    update: {},
    create: {
      name: 'Web Design',
      slug: 'web-design',
      description: 'Modern, responsive, and high-performance web designs.',
    },
  });

  const category3 = await prisma.category.upsert({
    where: { slug: 'digital-art' },
    update: {},
    create: {
      name: 'Digital Art',
      slug: 'digital-art',
      description: 'Custom illustrations and digital artwork.',
    },
  });

  // Seed Projects
  const project1 = await prisma.project.upsert({
    where: { slug: 'lumina-brand-refresh' },
    update: {},
    create: {
      title: 'Lumina Brand Refresh',
      slug: 'lumina-brand-refresh',
      description: 'A complete overhaul of the Lumina brand identity, focusing on a minimalist and modern aesthetic.',
      client: 'Lumina Tech',
      coverImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      published: true,
      featured: true,
      categoryId: category1.id,
    },
  });

  const project2 = await prisma.project.upsert({
    where: { slug: 'nexus-web-platform' },
    update: {},
    create: {
      title: 'Nexus Web Platform',
      slug: 'nexus-web-platform',
      description: 'Designing a sleek, dark-themed dashboard for a new SaaS platform.',
      client: 'Nexus Data',
      coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      published: true,
      featured: true,
      categoryId: category2.id,
    },
  });

  const project3 = await prisma.project.upsert({
    where: { slug: 'ethereal-illustrations' },
    update: {},
    create: {
      title: 'Ethereal Illustrations',
      slug: 'ethereal-illustrations',
      description: 'A series of vibrant, abstract digital artworks for a creative agency.',
      client: 'Creative Minds',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      published: true,
      featured: true,
      categoryId: category3.id,
    },
  });

  const project4 = await prisma.project.upsert({
    where: { slug: 'aurora-ecommerce' },
    update: {},
    create: {
      title: 'Aurora E-Commerce',
      slug: 'aurora-ecommerce',
      description: 'An elegant online store experience with seamless animations.',
      client: 'Aurora Fashion',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      published: true,
      featured: true,
      categoryId: category2.id,
    },
  });

  console.log('Seeded projects and categories.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
