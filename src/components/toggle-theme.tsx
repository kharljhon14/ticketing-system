"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";

export default function ToggleTheme() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <Button variant="outline" size="icon" disabled />;
	}

	const dark = theme === "dark";

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={() => setTheme(`${dark ? "light" : "dark"}`)}
		>
			{dark ? (
				<Sun className="hover:cursor-pointer hover:text-primary" />
			) : (
				<Moon className="hover:cursor-pointer hover:text-primary" />
			)}
		</Button>
	);
}
