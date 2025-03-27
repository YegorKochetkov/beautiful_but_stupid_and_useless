import React from "react";

import { useWindowScrollTop } from "../hooks/useWindowScrollTop";
import { useDelayedWindowScrollTrigger } from "../hooks/useDelayedWindowScrollTrigger";
import { cn } from "../lib/utils";

export function Navbar({ children }: { children: React.ReactNode }) {
	const [isNavbarHovered, setIsNavbarHovered] = React.useState(false);

	const { scrollStopped } = useDelayedWindowScrollTrigger(40, 4000);
	const { scrolledFromTop } = useWindowScrollTop(40);

	const navContainerRef = React.useRef<HTMLDivElement>(null);

	return (
		<div
			id="navbar"
			ref={navContainerRef}
			className={cn(
				"fixed inset-x-2 sm:inset-x-6 top-4 z-[100] h-16 border-none transition-all duration-700 rounded-lg",
				{
					"navbar-background": scrolledFromTop,
					"opacity-0 -translate-y-full":
						scrolledFromTop && scrollStopped && !isNavbarHovered,
				}
			)}
			onMouseEnter={() => setIsNavbarHovered(true)}
			onMouseLeave={() => setIsNavbarHovered(false)}
		>
			<nav className="flex gap-4 lg:gap-8 size-full items-center px-4 [&>a]:mr-auto [&>a]:lg:mr-8">
				{children}
			</nav>
		</div>
	);
}
