import Link from "next/link";

import Pagination from "@/components/pagination";
import StatusFilter from "@/components/status-filter";
import { buttonVariants } from "@/components/ui/button";
import TicketTable from "@/features/tickets/ticket-table";

import prisma from "../../../prisma/db";

interface SearchParams {
	page: string;
}

export default async function TicketsPage({
	searchParams,
}: { searchParams: SearchParams }) {
	const pageSize = 10;
	const page = Number.parseInt(searchParams.page) || 1;
	const ticketCount = await prisma.ticket.count();

	const tickets = await prisma.ticket.findMany({
		take: pageSize,
		skip: (page - 1) * pageSize,
	});

	return (
		<div>
			<Link
				href="/tickets/new"
				className={buttonVariants({ variant: "default" })}
			>
				New Ticket
			</Link>
			<StatusFilter />
			<TicketTable tickets={tickets} />
			<Pagination
				itemCount={ticketCount}
				pageSize={pageSize}
				currentPage={page}
			/>
		</div>
	);
}
