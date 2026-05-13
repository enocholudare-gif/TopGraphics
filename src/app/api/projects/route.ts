import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    
    // Determine if user is admin to show unpublished projects
    const token = cookies().get('auth_token')?.value;
    const isAdmin = token ? verifyToken(token) !== null : false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {};
    if (!isAdmin) {
      whereClause.published = true;
    }
    
    if (categorySlug) {
      whereClause.category = { slug: categorySlug };
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      include: {
        category: true,
        images: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const token = cookies().get('auth_token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { title, slug, description, client, categoryId, coverImage, published, featured } = data;

    if (!title || !slug || !categoryId) {
      return NextResponse.json({ error: 'Title, slug, and categoryId are required' }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        client,
        categoryId,
        coverImage,
        published: published ?? false,
        featured: featured ?? false,
      },
      include: {
        category: true,
      }
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    const err = error as { code?: string };
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'Project with this slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
