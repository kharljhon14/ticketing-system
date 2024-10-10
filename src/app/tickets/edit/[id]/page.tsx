import dynamic from "next/dynamic";

import prisma from "../../../../../prisma/db";

const TicketForm = dynamic(() => import("@/components/ticket-form"), {
	ssr: false,
});

interface Props {
	params: { id: string };
}

export default async function EditTicketPage({ params }: Props) {
	const ticket = await prisma.ticket.findUnique({
		where: { id: Number.parseInt(params.id) },
	});

	if (!ticket) {
		return <p className="text-destructive">Ticket not found!</p>;
	}

	return (
		<div>
			<TicketForm ticket={ticket} />
		</div>
	);
}
