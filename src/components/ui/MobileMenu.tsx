import React from "react";

import { cn } from "../../lib/utils";

import { ProductsNavButton } from "./ProductsNavButton";
import { MenuItems } from "./MenuItems";

export function MobileMenu() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

	return (
		<div className="relative md:hidden">
			<button
				type="button"
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				className="font-general text-base uppercase text-blue-50"
			>
				Menu
			</button>

			<div
				className={cn(
					"navbar-background absolute flex flex-col gap-9 p-9 top-12 right-0 w-max rounded-xl [&_ul]:flex-col [&_ul]:gap-9 transition-all duration-700",
					{
						"hidden": !isMobileMenuOpen,
						"animate-slide-left": isMobileMenuOpen,
					}
				)}
			>
				<ProductsNavButton />
				<MenuItems />
			</div>
		</div>
	);
}
