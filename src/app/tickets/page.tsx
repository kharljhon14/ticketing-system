import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import TicketTable from "@/features/tickets/ticket-table";

import prisma from "../../../prisma/db";

export default async function TicketsPage() {
	const tickets = await prisma.ticket.findMany();

	return (
		<div>
			<Link
				href="/tickets/new"
				className={buttonVariants({ variant: "default" })}
			>
				New Ticket
			</Link>
			<TicketTable tickets={tickets} />
		</div>
	);
}
