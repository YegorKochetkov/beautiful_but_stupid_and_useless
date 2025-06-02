import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { AnimatedText } from "./ui/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

export function About() {
	useGSAP(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: "#clip-image",
				start: "center center",
				end: "bottom top",
				scrub: 0.5,
				pin: true,
				pinSpacing: true,
			},
		});

		tl.to(".mask-clip-path", {
			width: "100%",
			height: "100%",
			borderRadius: 0,
		});

		return () => {
			tl.kill();
		};
	}, []);

	return (
		<div id="about" className="min-h-screen w-screen bg-bbsu-blue-75">
			<AboutContent />
			<AboutBackground />
		</div>
	);

	function AboutContent() {
		return (
			<section className="relative mt-36 mb-8 flex flex-col items-center gap-5">
				<h2 className="mb-5 px-4 text-center text-xl uppercase md:text-3xl xl:text-4xl">
					Why don&apos;t &rdquo;pretty&ldquo; websites actually sell?
				</h2>

				<AnimatedText
					text="It is not the visually appealing websites that drive sales, <br />but rather those that are thoughtfully designed"
					containerClass="font-black uppercase text-3xl md:text-4xl xl:text-5xl flex gap-3 px-4"
					textClass="flex gap-3 justify-center"
				/>

				<div className="-bottom-[80dvh] absolute z-30 w-full max-w-96 text-center font-circular-web text-xl md:max-w-[34rem] md:text-2xl">
					<p>
						Practice shows that beautiful design solutions do not
						always bring more sales than just convenient, fast and
						functional.
					</p>
				</div>
			</section>
		);
	}

	function AboutBackground() {
		return (
			<div id="clip-image" className="h-dvh w-screen">
				<div className="mask-clip-path -translate-x-1/2 absolute top-0 left-1/2 z-20 h-[60vh] w-96 origin-center overflow-hidden rounded-3xl md:w-[30vw];">
					<img
						src="img/about.webp"
						alt="Background"
						className="absolute top-0 left-0 size-full object-cover"
					/>
				</div>
			</div>
		);
	}
}
