import type { Ticket } from "@prisma/client";
import Link from "next/link";
import ReactMarkDown from "react-markdown";

import StatusBadge from "@/components/status-badge";
import TicketPriority from "@/components/ticket-priority";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import DeleteButton from "./delete-button";

interface Props {
	ticket: Ticket;
}

export default function TicketDetails({ ticket }: Props) {
	return (
		<div className="lg:grid lg:grid-cols-4">
			<Card className="mx-4 mb-4 lg:col-span-3 lg:mr-4">
				<CardHeader>
					<div className="mb-3 flex justify-between">
						<StatusBadge status={ticket.status} />
						<div>
							<TicketPriority priority={ticket.priority} />
						</div>
					</div>
					<CardTitle>{ticket.title}</CardTitle>
					<CardDescription>
						Created:{" "}
						{ticket.createdAt.toLocaleDateString("en-US", {
							year: "2-digit",
							month: "2-digit",
							day: "2-digit",
							hour: "numeric",
							minute: "2-digit",
							hour12: true,
						})}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ReactMarkDown className="prose dark:prose-invert">
						{ticket.description}
					</ReactMarkDown>
				</CardContent>
				<CardFooter>
					Updated:{" "}
					{ticket.updatedAt.toLocaleDateString("en-US", {
						year: "2-digit",
						month: "2-digit",
						day: "2-digit",
						hour: "numeric",
						minute: "2-digit",
						hour12: true,
					})}
				</CardFooter>
			</Card>
			<div className="mx-4 flex gap-2 lg:mx-0 lg:flex-col">
				<Link
					href={`/tickets/edit/${ticket.id}`}
					className={`${buttonVariants({ variant: "default" })}`}
				>
					Edit Ticket
				</Link>
				<DeleteButton ticketId={ticket.id} />
			</div>
		</div>
	);
}
