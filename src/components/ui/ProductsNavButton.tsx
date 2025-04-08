import { TiLocationArrow } from "react-icons/ti";

import { Button } from "./Button";
import { cn } from "../../lib/utils";

export function ProductsNavButton() {
	return (
		<Button
			id="product-button"
			rightIcon={<TiLocationArrow />}
			className={cn("button", "nav-button")}
		>
			Products
		</Button>
	);
}
