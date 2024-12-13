import React from "react";
import { TiLocationArrow } from "react-icons/ti";

import { Button } from "./ui/Button";
import { VideoBackground } from "./ui/VideoBackground";

export function Hero() {
	const videoFrame = React.useRef<HTMLDivElement>(null);

	return (
		<div className="relative w-screen h-dvh overflow-x-hidden">
			<div
				id="video-frame"
				ref={videoFrame}
				className="relative z-10 bg-bbsu-blue-75 w-screen h-dvh overflow-hidden"
			>
				<VideoBackground gsapScope={videoFrame} />
				<HeroHeader />
				<WatchTrailerButton />
			</div>

			<span
				aria-hidden
				className="right-5 sm:right-10 bottom-5 absolute font-black font-zentry-regular text-5xl text-bbsu-black-700 sm:text-7xl md:text-9xl lg:text-[12rem] uppercase special-font"
			>
				<span>u</span>seless
			</span>
		</div>
	);
}

function HeroHeader() {
	return (
		<div className="top-0 left-0 z-40 absolute size-full">
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
		</div>
	);
}

function WatchTrailerButton() {
	return (
		<div className="top-36 sm:top-44 md:top-60 lg:top-[22rem] left-5 sm:left-10 absolute z-40">
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
