import Link from "next/link";

export default function MainNav() {
	return (
		<header>
			<Link href="/">Dashboard</Link>
			<Link href="/tickets">Tickets</Link>
			<Link href="/users">Users</Link>
		</header>
	);
}
