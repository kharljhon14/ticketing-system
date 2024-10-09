import Link from "next/link";

import MainNavLinks from "./main-nav-links";
import ToggleTheme from "./toggle-theme";

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
