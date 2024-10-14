import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

import { ticketUpdateSchema } from '@/schemas/ticket';

import prisma from '../../../../../prisma/db';

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();

  // Validate the body object
  const validation = ticketUpdateSchema.safeParse(body);

  // Return 400 if bad request
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // Check if ticket exist on the database
  const ticket = await prisma.ticket.findUnique({
    where: { id: Number.parseInt(params.id) },
  });

  // Return 404 if ticket does not exist
  if (!ticket) {
    return NextResponse.json({ error: 'Ticket Not Found' }, { status: 404 });
  }

  if (body?.assignedToUserId) {
    body.assignedToUserId = parseInt(body.assignedToUserId);
  }

  // Update the ticket with the new values
  const updateTicket = await prisma.ticket.update({
    where: { id: Number.parseInt(params.id) },
    data: {
      ...body,
    },
  });

  revalidateTag(`ticket-${updateTicket.id}`);

  return NextResponse.json(updateTicket);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  // Check if ticket exist on the database
  const ticket = await prisma.ticket.findUnique({
    where: { id: Number.parseInt(params.id) },
  });

  // Return 404 if ticket does not exist
  if (!ticket) {
    return NextResponse.json({ error: 'Ticket Not Found' }, { status: 404 });
  }

  await prisma.ticket.delete({ where: { id: ticket.id } });

  return NextResponse.json({ message: 'Ticket Deleted' });
}
