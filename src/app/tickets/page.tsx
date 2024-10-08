import prisma from "../../../prisma/db";

export default async function TicketsPage() {
	const tickets = await prisma.ticket.findMany();

	console.log(tickets);

	return <h1>Tickets Page</h1>;
}
