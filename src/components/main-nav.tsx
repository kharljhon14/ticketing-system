import Link from "next/link";

export default function MainNav() {
	return (
		<nav className="flex  justify-between">
			<div className="flex items-center gap-2">
				<Link href="/">Dashboard</Link>
				<Link href="/tickets">Tickets</Link>
				<Link href="/users">Users</Link>
			</div>

			<div className="flex items-center gap-2">
				<Link href="#">Logout</Link>
				<Link href="#">Dark</Link>
			</div>
		</nav>
	);
}
