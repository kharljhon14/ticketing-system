import Link from "next/link";
import ToggleTheme from "./toggle-theme";
import MainNavLinks from "./main-nav-links";

export default function MainNav() {
	return (
		<nav className="flex  justify-between">
			<MainNavLinks />
			<div className="flex items-center gap-2">
				<Link href="#">Logout</Link>
				<ToggleTheme />
			</div>
		</nav>
	);
}
