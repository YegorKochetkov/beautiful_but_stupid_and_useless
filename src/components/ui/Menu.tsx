import { MenuItems } from "./MenuItems";
import { ProductsNavButton } from "./ProductsNavButton";

export function Menu() {
  return (
    <div className="mx-auto hidden h-full w-full items-center justify-between gap-7 md:flex">
      <ProductsNavButton />
      <MenuItems />
    </div>
  );
}
