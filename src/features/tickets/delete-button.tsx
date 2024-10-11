"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";

interface Props {
	ticketId: number;
}

export default function DeleteButton({ ticketId }: Props) {
	const [error, setError] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);

	const router = useRouter();

	const deleteTicket = async () => {
		try {
			setIsDeleting(true);
			await axios.delete(`/api/ticket/${ticketId}`);
			router.push("/tickets");
			router.refresh();
		} catch (_error) {
			setIsDeleting(false);
			setError("Unkown Error Occured");
		}
	};
	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger
					className={buttonVariants({ variant: "destructive" })}
					disabled={isDeleting}
				>
					Delete Ticket
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							ticket.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={deleteTicket}>Delete</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<small className="text-destructive">{error}</small>
		</>
	);
}
