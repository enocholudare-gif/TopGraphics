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
    const { read } = await request.json();

    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: { read }
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error('Error updating contact submission:', error);
    const err = error as { code?: string };
    if (err.code === 'P2025') {
      return NextResponse.json({ error: 'Contact submission not found' }, { status: 404 });
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

    await prisma.contactSubmission.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    const err = error as { code?: string };
    if (err.code === 'P2025') {
      return NextResponse.json({ error: 'Contact submission not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
