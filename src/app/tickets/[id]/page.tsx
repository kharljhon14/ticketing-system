import TicketDetails from '@/features/tickets/ticket-details';

import prisma from '../../../../prisma/db';

interface Props {
  params: { id: string };
}

export default async function ViewTicketPage({ params }: Props) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: Number.parseInt(params.id) },
  });

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
    },
  });

  if (!ticket) {
    return <p className="text-destructive">Ticket not found!</p>;
  }

  return (
    <TicketDetails
      ticket={ticket}
      users={users}
    />
  );
}
