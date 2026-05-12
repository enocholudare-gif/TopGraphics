import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = cookies().get('auth_token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { name, slug, description, basePrice } = await request.json();

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        basePrice: basePrice !== undefined ? (basePrice ? parseFloat(basePrice) : null) : undefined,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    const err = error as { code?: string };
    if (err.code === 'P2025') {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'Category with this name or slug already exists' }, { status: 409 });
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

    await prisma.category.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    const err = error as { code?: string };
    if (err.code === 'P2025') {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
