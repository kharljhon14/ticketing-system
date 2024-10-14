import bcrypt from 'bcryptjs';
import { type NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { userSchema } from '@/schemas/user';

import prisma from '../../../../prisma/db';
import options from '../auth/[...nextauth]/options';

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  if (session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Not admin' }, { status: 401 });
  }

  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // Check if the username has been already taken
  const duplicate = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (duplicate) {
    return NextResponse.json(
      { message: 'Duplicate Username' },
      { status: 409 }
    );
  }

  // Hash the users password
  const hashPassword = await bcrypt.hash(body.password, 10);
  body.password = hashPassword;

  const { password: _password, ...newUser } = await prisma.user.create({
    data: { ...body },
  });

  return NextResponse.json(newUser, { status: 201 });
}
