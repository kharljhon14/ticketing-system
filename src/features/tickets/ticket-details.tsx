import type { Ticket } from "@prisma/client";

interface Props {
	ticket: Ticket;
}

export default function TicketDetails({ ticket }: Props) {
	return (
		<div>
			<p>{ticket.title}</p>
			<p>{ticket.description}</p>
		</div>
	);
}
