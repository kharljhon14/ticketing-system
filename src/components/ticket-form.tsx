"use client";

import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema, type TicketSchemaType } from "@/schemas/ticket";
import { Input } from "./ui/input";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export default function TicketForm() {
	const form = useForm<TicketSchemaType>({
		resolver: zodResolver(ticketSchema),
	});

	const onSubmit: SubmitHandler<TicketSchemaType> = (values) => {
		console.log(values);
	};

	return (
		<div className="rounded-md border w-full p-4">
			<Form {...form}>
				<form
					className="space-y-8 w-full"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
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
						control={form.control}
						render={({ field }) => (
							<SimpleMDE {...field} placeholder="Description..." />
						)}
					/>
					<div className="flex w-full space-x-4">
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<FormControl>
										<Select
											onOpenChange={field.onChange}
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
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="priority"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Priority</FormLabel>
									<FormControl>
										<Select
											onOpenChange={field.onChange}
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
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>
		</div>
	);
}
