import { navItems } from "../../lib/constants";

export function MenuItems() {
	return (
		<ul className="inline-flex gap-4 lg:gap-9">
			{navItems.map((item) => (
				<li key={item} className="inline-flex">
					<a
						href={`#${item.toLowerCase()}`}
						className="font-general relative cursor-pointer text-base uppercase text-blue-50 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 dark:after:bg-white"
					>
						{item}
					</a>
				</li>
			))}
		</ul>
	);
}
