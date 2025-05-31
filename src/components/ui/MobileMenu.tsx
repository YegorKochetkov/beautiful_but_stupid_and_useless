import React from "react";

import { cn } from "../../lib/utils";

import { ProductsNavButton } from "./ProductsNavButton";
import { MenuItems } from "./MenuItems";

export function MobileMenu() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

	React.useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsMobileMenuOpen(false);
			}
		};

		const handleClickOutside = (event: MouseEvent) => {
			if (!(event.target as HTMLElement).closest("#navbar")) {
				setIsMobileMenuOpen(false);
			}
		};

		const mobileMenuAbortController = new AbortController();

		window.addEventListener("keydown", handleEscapeKey, {
			signal: mobileMenuAbortController.signal,
		});
		window.addEventListener("click", handleClickOutside, {
			signal: mobileMenuAbortController.signal,
		});

		return () => {
			mobileMenuAbortController.abort();
		};
	}, []);

	return (
		<div className="relative md:hidden">
			<button
				type="button"
				onClick={() => {
					setIsMobileMenuOpen(!isMobileMenuOpen);
				}}
				className="font-general text-base uppercase text-blue-50"
			>
				Menu
			</button>

			<div
				className={cn(
					"navbar-background absolute right-0 top-12 flex w-max flex-col gap-9 rounded-xl p-9 transition-all duration-700 [&_ul]:flex-col [&_ul]:gap-9",
					{
						hidden: !isMobileMenuOpen,
						"animate-slide-left": isMobileMenuOpen,
					},
				)}
			>
				<ProductsNavButton />
				<MenuItems />
			</div>
		</div>
	);
}
