import { type NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { ticketSchema } from '@/schemas/ticket';

import prisma from '../../../../prisma/db';
import options from '../auth/[...nextauth]/options';

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await request.json();

  // Validate the body object
  const validation = ticketSchema.safeParse(body);

  // Return error message
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // Create new ticket
  const newTicket = await prisma.ticket.create({
    data: { ...body },
  });

  // Return new ticket
  return NextResponse.json(newTicket, { status: 201 });
}
