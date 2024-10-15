import DashChart from '@/components/dash-chart';
import RecentTickets from '@/components/recent-tickets';

import prisma from '../../prisma/db';

export default async function Home() {
  const tickets = await prisma.ticket.findMany({
    where: {
      NOT: [{ status: 'CLOSED' }],
    },
    orderBy: {
      updatedAt: 'desc',
    },
    skip: 0,
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  const groupTicket = await prisma.ticket.groupBy({
    by: ['status'],
    _count: {
      id: true,
    },
  });

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 px-2">
        <div>
          <RecentTickets tickets={tickets} />
        </div>
        <div>
          <DashChart />
        </div>
      </div>
    </div>
  );
}
