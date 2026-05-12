import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // Determine if user is admin
    const token = cookies().get('auth_token')?.value;
    const isAdmin = token ? verifyToken(token) !== null : false;

    // Check if ID is a UUID or a slug. We'll search both ways.
    const project = await prisma.project.findFirst({
      where: {
        OR: [
          { id },
          { slug: id }
        ],
        ...(isAdmin ? {} : { published: true })
      },
      include: {
        category: true,
        images: true,
      }
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = cookies().get('auth_token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const data = await request.json();
    const { title, slug, description, client, categoryId, coverImage, published, featured } = data;

    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        client,
        categoryId,
        coverImage,
        published,
        featured,
      },
      include: {
        category: true,
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    const err = error as { code?: string };
    if (err.code === 'P2025') {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'Project with this slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = cookies().get('auth_token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    await prisma.project.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    const err = error as { code?: string };
    if (err.code === 'P2025') {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
