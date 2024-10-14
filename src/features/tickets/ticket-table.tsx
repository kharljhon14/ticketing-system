import type { Ticket } from '@prisma/client';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

import type { SearchParams } from '@/app/tickets/page';
import StatusBadge from '@/components/status-badge';
import TicketPriority from '@/components/ticket-priority';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Props {
  tickets: Ticket[];
  searchParams: SearchParams;
}

export default function DataTable({ tickets, searchParams }: Props) {
  return (
    <div className="mt-5 w-full">
      <div className="rounded-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center">
                  <Link href={{ query: { ...searchParams, orderBy: 'title' } }}>
                    Title
                  </Link>
                  {'title' === searchParams.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center items-center">
                  <Link
                    href={{ query: { ...searchParams, orderBy: 'status' } }}
                  >
                    Status
                  </Link>
                  {'status' === searchParams.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center items-center">
                  <Link
                    href={{ query: { ...searchParams, orderBy: 'priority' } }}
                  >
                    Priority
                  </Link>
                  {'priority' === searchParams.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  <Link
                    href={{ query: { ...searchParams, orderBy: 'createdAt' } }}
                  >
                    Created At
                  </Link>

                  {'createdAt' === searchParams.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets?.map((ticket) => (
              <TableRow
                key={ticket.id}
                data-href="/"
              >
                <TableCell>
                  <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <StatusBadge status={ticket.status} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <TicketPriority priority={ticket.priority} />
                  </div>
                </TableCell>
                <TableCell>
                  {ticket.createdAt.toLocaleDateString('en-US', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
