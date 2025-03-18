import { MenuItems } from "./MenuItems";
import { ProductsNavButton } from "./ProductsNavButton";

export function Menu() {
	return (
		<div className="hidden md:flex items-center w-full justify-between h-full gap-7 mx-auto">
			<ProductsNavButton />
			<MenuItems />
		</div>
	);
}
