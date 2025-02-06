import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiLocationArrow } from "react-icons/ti";

import { Button } from "./ui/Button";
import { VideoBackground } from "./ui/VideoBackground";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
	const heroComponent = React.useRef<HTMLDivElement>(null);
	const [allVideosLoaded, setAllVideosLoaded] = React.useState(false);

	const hideContentWhileVideosLoading = allVideosLoaded
		? "opacity-100"
		: "opacity-0";

	useGSAP(() => {
		const tl = gsap.timeline({ paused: true });

		tl.from("#video-frame", {
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
		}).to("#video-frame", {
			clipPath: "polygon(0% 0%, 50% 0%, 100% 70%, 70% 100%, 0% 50%)",
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
	});

	return (
		<div
			ref={heroComponent}
			className="relative w-screen h-dvh overflow-x-hidden"
		>
			{allVideosLoaded ? null : <Loader />}
			<div
				className={hideContentWhileVideosLoading}
				// @ts-expect-error TS2322: LOL React doesn't know 'inert' is a valid attribute
				inert={!allVideosLoaded}
			>
				<div
					id="video-frame"
					className="relative bg-bbsu-blue-75 w-screen h-dvh overflow-hidden"
				>
					<VideoBackground
						gsapScope={heroComponent}
						onAllVideosLoaded={setAllVideosLoaded}
						allVideosLoaded={allVideosLoaded}
					/>
					<HeroHeader />
					<WatchTrailerButton />
				</div>
				<DecorativeElement />
			</div>
		</div>
	);
}

function HeroHeader() {
	return (
		<div className="mt-12 px-5 sm:px-10">
			<h1 className="sm:right-10 font-black font-zentry-regular text-5xl text-bbsu-blue-100 sm:text-7xl md:text-9xl lg:text-[12rem] uppercase">
				<span className="relative">
					<span className="special-font">
						Be<span>au</span>tif<span>u</span>l
					</span>{" "}
					<span className="-bottom-5 sm:-bottom-6 md:-bottom-7 lg:-bottom-9 left-0 absolute font-robert-regular text-bbsu-blue-100 text-lg sm:text-2xl md:text-4xl lg:text-5xl">
						but stupid and
					</span>
				</span>{" "}
				<span className="right-5 sm:right-10 bottom-5 z-40 absolute font-black font-zentry-regular text-5xl text-bbsu-blue-75 sm:text-7xl md:text-9xl lg:text-[12rem] uppercase special-font">
					<span>u</span>seless
				</span>
			</h1>
		</div>
	);
}

function WatchTrailerButton() {
	return (
		<div className="top-36 sm:top-44 md:top-60 lg:top-[22rem] left-5 sm:left-10 absolute">
			<Button
				id="watch-trailer"
				leftIcon={<TiLocationArrow />}
				className="promo-button"
			>
				Watch trailer
			</Button>
		</div>
	);
}

function Loader() {
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
			className="right-5 -z-10 sm:right-10 bottom-5 absolute font-black font-zentry-regular text-5xl text-bbsu-black-700 sm:text-7xl md:text-9xl lg:text-[12rem] uppercase special-font"
		>
			<span>u</span>seless
		</span>
	);
}
