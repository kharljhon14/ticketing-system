import TicketTable from "@/features/tickets/ticket-table";
import prisma from "../../../prisma/db";

export default async function TicketsPage() {
	const tickets = await prisma.ticket.findMany();

	return (
		<div>
			<TicketTable tickets={tickets} />
		</div>
	);
}
