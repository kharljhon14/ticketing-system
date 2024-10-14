import TicketDetails from '@/features/tickets/ticket-details';

import prisma from '../../../../prisma/db';

interface Props {
  params: { id: string };
}

export default async function ViewTicketPage({ params }: Props) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: Number.parseInt(params.id) },
  });

  if (!ticket) {
    return <p className="text-destructive">Ticket not found!</p>;
  }

  return <TicketDetails ticket={ticket} />;
}
