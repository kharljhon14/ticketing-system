"use client";

import "easymde/dist/easymde.min.css";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Ticket } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

import { ticketSchema, type TicketSchemaType } from "@/schemas/ticket";

import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

interface Props {
	ticket?: Ticket;
}

export default function TicketForm({ ticket }: Props) {
	const form = useForm<TicketSchemaType>({
		resolver: zodResolver(ticketSchema),
	});

	const router = useRouter();

	const onSubmit: SubmitHandler<TicketSchemaType> = async (values) => {
		if (ticket) {
			await axios.patch(`/api/tickets/${ticket.id}`, values);
			router.push(`/tickets/${ticket.id}`);
		} else {
			await axios.post("/api/tickets", values);
			router.push("/tickets");
		}
		router.refresh();
	};

	return (
		<div className="w-full rounded-md border p-4">
			<Form {...form}>
				<form
					className="w-full space-y-8"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						defaultValue={ticket?.title}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ticket Title</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Ticket Title..." />
								</FormControl>
							</FormItem>
						)}
					/>
					<Controller
						name="description"
						defaultValue={ticket?.description}
						control={form.control}
						render={({ field }) => (
							<SimpleMDE {...field} placeholder="Description..." />
						)}
					/>
					<div className="flex w-full space-x-4">
						<FormField
							control={form.control}
							name="status"
							defaultValue={ticket?.status}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>

									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Status..." />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											<SelectItem value="OPEN">Open</SelectItem>
											<SelectItem value="STARTED">Started</SelectItem>
											<SelectItem value="CLOSED">Closed</SelectItem>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="priority"
							defaultValue={ticket?.priority}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Priority</FormLabel>

									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Priority..." />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											<SelectItem value="LOW">Low</SelectItem>
											<SelectItem value="MEDIUM">Medium</SelectItem>
											<SelectItem value="HIGH">High</SelectItem>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" disabled={form.formState.isSubmitting}>
						{ticket ? "Update Ticket" : "Create Ticket"}
					</Button>
				</form>
			</Form>
		</div>
	);
}
