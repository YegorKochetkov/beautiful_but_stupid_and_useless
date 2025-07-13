import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { AnimatedText } from "./ui/AnimatedText";
import { BlobBackground } from "./ui/BlobBackground";

gsap.registerPlugin(ScrollTrigger);

export function Story() {
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(() => {
		if (sectionRef.current) {
			gsap.fromTo(
				sectionRef.current.querySelector(".story-svg-background"),
				{
					opacity: 0.2,
					y: 100,
				},
				{
					opacity: 1,
					y: 0,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top bottom",
						end: "center center",
						scrub: true,
					},
				}
			);
		}
	}, [sectionRef]);

	return (
		<section id="story" ref={sectionRef} className="relative min-h-[70dvh] w-screen overflow-hidden bg-bbsu-black-700 pt-12 text-bbsu-blue-50">
			<div className="story-svg-background absolute inset-0 z-0 opacity-20">
				<BlobBackground />
			</div>
			<div className="relative z-10 flex size-full flex-col items-center gap-4 pb-12 px-4">
				<p className="text-base uppercase md:text-base">The journey of a thousand miles begins with a single step.</p>

				<AnimatedText
					text="Every great story starts with a vision, a dream, and the courage to pursue it."
					containerClass="container mx-auto mt-5 font-black uppercase text-3xl md:text-4xl xl:text-5xl flex gap-3 px-4 mix-blend-difference"
					textClass="flex gap-3 justify-center align-center special-font"
				/>
				<p className="mt-16 max-w-2xl text-center text-xl leading-relaxed md:text-2xl">
					<span>
						We believe in crafting experiences that resonate, building connections that last, and creating a legacy that inspires. Our story is one of passion, innovation, and relentless
						dedication to excellence.
					</span>
				</p>
			</div>
		</section>
	);
}
