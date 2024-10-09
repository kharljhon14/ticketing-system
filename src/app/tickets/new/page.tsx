import dynamic from "next/dynamic";

const TicketForm = dynamic(() => import("@/components/ticket-form"), {
	ssr: false,
});

export default function NewTicketPage() {
	return (
		<div>
			<TicketForm />
		</div>
	);
}
