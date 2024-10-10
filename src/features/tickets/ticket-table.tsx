import type { Ticket } from "@prisma/client";
import Link from "next/link";

import StatusBadge from "@/components/status-badge";
import TicketPriority from "@/components/ticket-priority";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface Props {
	tickets: Ticket[];
}

export default function DataTable({ tickets }: Props) {
	return (
		<div className="mt-5 w-full">
			<div className="rounded-sm border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>
								<div className="flex justify-center">Status</div>
							</TableHead>
							<TableHead>
								<div className="flex justify-center">Priority</div>
							</TableHead>
							<TableHead>Created At</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tickets?.map((ticket) => (
							<TableRow key={ticket.id} data-href="/">
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
									{ticket.createdAt.toLocaleDateString("en-US", {
										year: "2-digit",
										month: "2-digit",
										day: "2-digit",
										hour: "numeric",
										minute: "2-digit",
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
