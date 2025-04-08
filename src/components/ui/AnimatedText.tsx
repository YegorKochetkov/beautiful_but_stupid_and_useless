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
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: wrapperRef.current,
				start: "100 bottom",
				end: "center bottom",
				toggleActions: "play none none reverse",
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
	}, []);

	return (
		<p ref={wrapperRef} className={cn("flex flex-col gap-1", containerClass)}>
			{text.split("<br />").map((line, lineIndex) => (
				<span key={lineIndex} className={cn("flex flex-wrap gap-1", textClass)}>
					{line.split(" ").map((word, wordIndex) => (
						<span
							key={wordIndex}
							className="animated-word"
							dangerouslySetInnerHTML={{ __html: word }}
						/>
					))}
				</span>
			))}
		</p>
	);
};
