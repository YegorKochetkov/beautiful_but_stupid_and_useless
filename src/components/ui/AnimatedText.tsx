import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "../../lib/utils";

gsap.registerPlugin(ScrollTrigger);

export const AnimatedText = ({
	text,
	containerClass = "",
	textClass = "",
}: {
	text: string;
	containerClass?: string;
	textClass?: string;
}) => {
	const wrapperRef = React.useRef<HTMLParagraphElement>(null);

	useGSAP(() => {
		if (!wrapperRef.current) return;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: wrapperRef.current,
				start: "top bottom ",
				end: "bottom 120",
				toggleActions: "play reset play reset",
			},
		});

		tl.to(
			".animated-word",
			{
				opacity: 1,
				transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
				ease: "power2.inOut",
				stagger: 0.02,
			},
			0,
		);

		return () => {
			tl.kill();
		};
	}, [wrapperRef.current]);

	return (
		<p
			ref={wrapperRef}
			className={cn("flex flex-col gap-1", containerClass)}
		>
			{text.split("<br />").map((line, lineIndex) => (
				<span
					// biome-ignore lint/suspicious/noArrayIndexKey: we`re not going to change the order of the elements in any way
					key={lineIndex}
					className={cn("flex flex-wrap gap-1", textClass)}
				>
					{line.split(" ").map((word, wordIndex) => (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: we`re not going to change the order of the elements in any way
							key={wordIndex}
							className="animated-word"
						>
							{word}
						</span>
					))}
				</span>
			))}
		</p>
	);
};
