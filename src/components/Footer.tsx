import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function Footer() {
	const footerRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (!footerRef.current) return;

			gsap.fromTo(
				footerRef.current.querySelector("p"),
				{
					opacity: 0,
					y: 20,
				},
				{
					opacity: 1,
					y: 0,
					duration: 1,
					scrollTrigger: {
						trigger: footerRef.current,
						start: "top bottom-=100",
						end: "bottom bottom",
						toggleActions: "play none none reverse",
					},
				}
			);
		},
		{ scope: footerRef }
	);

	return (
		<footer ref={footerRef} className="w-full bg-bbsu-black-700 py-16 text-center text-bbsu-blue-50">
			<p className="text-base md:text-lg">© {new Date().getFullYear()} Beautiful But Stupid and Useless. All rights reserved.</p>
		</footer>
	);
}
