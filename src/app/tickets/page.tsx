import { Status, type Ticket } from "@prisma/client";
import Link from "next/link";

import Pagination from "@/components/pagination";
import StatusFilter from "@/components/status-filter";
import { buttonVariants } from "@/components/ui/button";
import TicketTable from "@/features/tickets/ticket-table";

import prisma from "../../../prisma/db";

export interface SearchParams {
	page: string;
	status: string;
	orderBy: keyof Ticket;
}

export default async function TicketsPage({
	searchParams,
}: { searchParams: SearchParams }) {
	const pageSize = 10;
	const page = Number.parseInt(searchParams.page) || 1;

	const orderBy = searchParams.orderBy ? searchParams.orderBy : "createdAt";

	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status as keyof typeof Status)
		? searchParams.status
		: undefined;

	let where = {};

	if (status) {
		where = {
			status,
		};
	} else {
		where = {
			NOT: [{ status: "CLOSED" as Status }],
		};
	}

	const ticketCount = await prisma.ticket.count({ where });
	const tickets = await prisma.ticket.findMany({
		where,
		orderBy: {
			[orderBy]: "desc",
		},
		take: pageSize,
		skip: (page - 1) * pageSize,
	});

	return (
		<div>
			<div className="flex gap-2">
				<Link
					href="/tickets/new"
					className={buttonVariants({ variant: "default" })}
				>
					New Ticket
				</Link>
				<StatusFilter />
			</div>
			<TicketTable searchParams={searchParams} tickets={tickets} />
			<Pagination
				itemCount={ticketCount}
				pageSize={pageSize}
				currentPage={page}
			/>
		</div>
	);
}
