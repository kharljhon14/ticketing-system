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
import type { Ticket } from "@prisma/client";

interface Props {
	tickets: Ticket[];
}

export default function DataTable({ tickets }: Props) {
	return (
		<div className="w-full mt-5">
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
								<TableCell>{ticket.title}</TableCell>
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
