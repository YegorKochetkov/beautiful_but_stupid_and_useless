import React from "react";
import { TiLocationArrow } from "react-icons/ti";
import clsx from "clsx";

import { Button } from "./ui/Button";
import { AudioIndicator } from "./ui/AudioIndicator";
import { useWindowScrollTop } from "../hooks/useWindowScrollTop";
import { useDelayedWindowScrollTrigger } from "../hooks/useDelayedWindowScrollTrigger";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"] as const;

export function Navbar() {
	const { scrolledFromTop } = useWindowScrollTop(40);
	const { scrollStopped } = useDelayedWindowScrollTrigger(40, 2000);

	const [isNavbarHovered, setIsNavbarHovered] = React.useState(false);

	const navContainerRef = React.useRef<HTMLDivElement>(null);

	return (
		<div
			ref={navContainerRef}
			className={clsx(
				"fixed inset-x-2 sm:inset-x-6 top-4 z-[100] h-16 border-none transition-all duration-700 rounded-lg",
				{
					"navbar-scrolled": scrolledFromTop,
					"opacity-0": scrolledFromTop && scrollStopped && !isNavbarHovered,
				}
			)}
			onMouseEnter={() => setIsNavbarHovered(true)}
			onMouseLeave={() => setIsNavbarHovered(false)}
		>
			<nav className="flex size-full items-center justify-between p-4">
				<div className="flex items-center gap-7">
					<NavLogo />
					<ProductsNavButton />
				</div>

				<div className="flex h-full items-center">
					<MenuItems />
					<AudioIndicator />
				</div>
			</nav>
		</div>
	);

	function NavLogo() {
		return (
			<a href="/">
				<img src="/img/logo.png" alt="logo" className="w-10" />
			</a>
		);
	}

	function ProductsNavButton() {
		return (
			<Button
				id="product-button"
				rightIcon={<TiLocationArrow />}
				className={clsx("nav-button", "hidden md:flex")}
			>
				Products
			</Button>
		);
	}

	function MenuItems() {
		return (
			<ul className="hidden md:inline-flex gap-4 lg:gap-9">
				{navItems.map((item) => (
					<li key={item} className="inline-flex">
						<a
							href={`#${item.toLowerCase()}`}
							className="relative font-general text-base uppercase text-blue-50 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 dark:after:bg-white cursor-pointer"
						>
							{item}
						</a>
					</li>
				))}
			</ul>
		);
	}
}
