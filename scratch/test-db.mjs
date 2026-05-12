import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const projects = await prisma.project.findMany({ take: 1 });
    console.log("Connected successfully! Projects found:", projects.length);
  } catch (error) {
    console.error("Connection failed:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
