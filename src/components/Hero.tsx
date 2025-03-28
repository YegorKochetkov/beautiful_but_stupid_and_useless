import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiLocationArrow } from "react-icons/ti";

import { Button } from "./ui/Button";
import { VideoBackground } from "./ui/VideoBackground";

import { cn } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
	const heroComponent = React.useRef<HTMLDivElement>(null);
	const [allVideosLoaded, setAllVideosLoaded] = React.useState(false);

	useGSAP(() => {
		const tl = gsap.timeline({ paused: true });

		tl.from("#video-frame", {
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
		}).to("#video-frame", {
			clipPath: "polygon(0% 0%, 50% 0%, 100% 70%, 100% 100%, 0% 100%)",
			ease: "power1.inOut",
			scrollTrigger: {
				trigger: "#video-frame",
				start: "center center",
				scrub: true,
			},
		});

		return () => {
			tl.kill();
		};
	}, []);

	return (
		<section
			ref={heroComponent}
			className="relative w-screen h-dvh overflow-x-hidden"
		>
			<Loader hide={allVideosLoaded} />

			<HeroContent>
				<VideoBackground
					gsapScope={heroComponent}
					onAllVideosLoaded={setAllVideosLoaded}
					allVideosLoaded={allVideosLoaded}
				/>
				<HeroHeader />
				<WatchTrailerButton />
			</HeroContent>

			<DecorativeElement />
		</section>
	);
}

type HeroContentProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
};

function HeroContent({ children, ...props }: HeroContentProps) {
	return (
		<div {...props}>
			<div id="video-frame" className="relative w-screen h-dvh overflow-hidden">
				{children}
			</div>
		</div>
	);
}

function HeroHeader() {
	return (
		<div className="mt-24 px-5 sm:px-10">
			<h1 className="sm:right-10 font-black font-zentry-regular text-5xl text-bbsu-blue-100 sm:text-7xl md:text-9xl lg:text-[12rem] uppercase">
				<span className="relative">
					<span className="special-font">
						Be<span>au</span>tif<span>u</span>l
					</span>
					<span className="-bottom-5 sm:-bottom-6 md:-bottom-7 lg:-bottom-9 left-0 absolute font-robert-regular text-bbsu-blue-100 text-lg sm:text-2xl md:text-4xl lg:text-5xl">
						but stupid and
					</span>
				</span>
				<span className="right-10 sm:right-14 bottom-5 z-40 absolute font-black font-zentry-regular text-5xl text-bbsu-blue-75 sm:text-7xl md:text-9xl lg:text-[12rem] uppercase special-font">
					<span>u</span>seless
				</span>
			</h1>
		</div>
	);
}

function WatchTrailerButton() {
	return (
		<div className="top-48 sm:top-56 md:top-72 lg:top-[24rem] left-5 sm:left-10 absolute">
			<Button
				id="watch-trailer"
				leftIcon={<TiLocationArrow />}
				className={cn("button", "promo-button")}
			>
				Watch trailer
			</Button>
		</div>
	);
}

function Loader({ hide }: { hide: boolean }) {
	if (hide) return null;

	return (
		<div
			id="loader"
			className="flex flex-col items-center justify-center  absolute z-[100] bg-bbsu-blue-75 w-screen h-dvh overflow-hidden"
		>
			<span className="loader" />
		</div>
	);
}

function DecorativeElement() {
	return (
		<span
			aria-hidden
			className="right-10 sm:right-14 bottom-5 -z-10 absolute font-black font-zentry-regular text-5xl text-bbsu-black-700 sm:text-7xl md:text-9xl lg:text-[12rem] uppercase special-font"
		>
			<span>u</span>seless
		</span>
	);
}
