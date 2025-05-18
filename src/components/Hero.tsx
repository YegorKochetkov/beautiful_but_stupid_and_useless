import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
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
				start: "center center-=100px",
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
			className="relative h-dvh w-screen overflow-x-hidden"
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
			<div id="video-frame" className="relative h-dvh w-screen overflow-hidden">
				{children}
			</div>
		</div>
	);
}

function HeroHeader() {
	return (
		<div className="mt-24 px-5 sm:px-10">
			<h1 className="font-black font-zentry-regular text-5xl text-bbsu-blue-100 uppercase sm:right-10 sm:text-7xl md:text-9xl lg:text-[12rem]">
				<span className="relative">
					<span className="special-font">
						Be<span>au</span>tif<span>u</span>l
					</span>
					<span className="-bottom-5 sm:-bottom-6 md:-bottom-7 lg:-bottom-9 absolute left-0 font-robert-regular text-bbsu-blue-100 text-lg sm:text-2xl md:text-4xl lg:text-5xl">
						but stupid and
					</span>
				</span>
				<span className="special-font absolute right-10 bottom-5 z-40 font-black font-zentry-regular text-5xl text-bbsu-blue-75 uppercase sm:right-14 sm:text-7xl md:text-9xl lg:text-[12rem]">
					<span>u</span>seless
				</span>
			</h1>
		</div>
	);
}

function WatchTrailerButton() {
	return (
		<div className="absolute top-48 left-5 sm:top-56 sm:left-10 md:top-72 lg:top-[24rem]">
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
			className="absolute z-[100] flex h-dvh w-screen flex-col items-center justify-center overflow-hidden bg-bbsu-blue-75"
		>
			<span className="loader" />
		</div>
	);
}

function DecorativeElement() {
	return (
		<span
			aria-hidden
			className="special-font -z-10 absolute right-10 bottom-5 font-black font-zentry-regular text-5xl text-bbsu-black-700 uppercase sm:right-14 sm:text-7xl md:text-9xl lg:text-[12rem]"
		>
			<span>u</span>seless
		</span>
	);
}
