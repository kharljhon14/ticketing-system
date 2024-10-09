import type { Status } from "@prisma/client";

import { Badge } from "./ui/badge";

interface Props {
	status: Status;
}

const statusMap: Record<
	Status,
	{ label: string; color: "bg-red-400" | "bg-blue-400" | "bg-green-400" }
> = {
	OPEN: {
		label: "Open",
		color: "bg-green-400",
	},
	STARTED: {
		label: "Started",
		color: "bg-blue-400",
	},
	CLOSED: {
		label: "Closed",
		color: "bg-red-400",
	},
};

export default function StatusBadge({ status }: Props) {
	return (
		<Badge
			className={`${statusMap[status].color} hover: text-background${statusMap[status].color}`}
		>
			{statusMap[status].label}
		</Badge>
	);
}
