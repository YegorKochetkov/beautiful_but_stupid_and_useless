import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

export default function Hero() {
	const heroVideosNumber = [1, 2, 3, 4];
	const totalHeroVideos = heroVideosNumber.length;

	const nextBackgroundVideoId = "#next-background-video";
	const currentBackgroundVideoId = "#current-background-video";
	const buttonVideoId = "#button-video";

	const videoIndex = React.useRef(0);
	const buttonVideoRef = React.useRef<HTMLVideoElement>(null);
	const nextBackgroundVideoRef = React.useRef<HTMLVideoElement>(null);
	const currentBackgroundVideoRef = React.useRef<HTMLVideoElement>(null);

	const videoFrame = React.useRef(null);

	useGSAP(
		(_context, contextSafe) => {
			if (!contextSafe) return;

			const handleHeroMiniVideoClick = contextSafe(() => {
				if (nextBackgroundVideoRef.current) {
					nextBackgroundVideoRef.current.currentTime = 0;
				}

				gsap.set(buttonVideoRef.current, {
					visibility: "hidden",
					opacity: "0",
				});

				gsap.fromTo(
					nextBackgroundVideoId,
					{
						opacity: "1",
						zIndex: "20",
					},
					{
						duration: 0.5,
						ease: "power1.inOut",
						width: "100%",
						height: "100%",

						onComplete: () => {
							if (
								nextBackgroundVideoRef.current &&
								currentBackgroundVideoRef.current
							) {
								currentBackgroundVideoRef.current.src = getVideoSrc(
									heroVideosNumber[(videoIndex.current + 1) % totalHeroVideos]
								);

								currentBackgroundVideoRef.current.currentTime =
									nextBackgroundVideoRef.current.currentTime;
							}
						},
					}
				);

				gsap.to(nextBackgroundVideoId, {
					delay: 1,
					duration: 0,
					width: "16rem",
					height: "16rem",
					opacity: "0",
					zIndex: "0",

					onComplete: () => {
						if (nextBackgroundVideoRef.current) {
							nextBackgroundVideoRef.current.src = getVideoSrc(
								heroVideosNumber[(videoIndex.current + 2) % totalHeroVideos]
							);
						}

						if (buttonVideoRef.current) {
							buttonVideoRef.current.src = getVideoSrc(
								heroVideosNumber[(videoIndex.current + 2) % totalHeroVideos]
							);
						}

						gsap.set(buttonVideoRef.current, {
							visibility: "visible",
							opacity: "1",
						});
					},
				});

				gsap.fromTo(
					buttonVideoId,
					{
						width: "0",
						height: "0",
					},
					{
						delay: 1,
						duration: 1,
						ease: "power1.inOut",
						width: "16rem",
						height: "16rem",
					}
				);

				gsap.delayedCall(1.5, () => {
					videoIndex.current = (videoIndex.current + 1) % totalHeroVideos;
				});
			});

			buttonVideoRef.current?.addEventListener("click", handleHeroMiniVideoClick);

			return () => {
				buttonVideoRef.current?.removeEventListener(
					"click",
					handleHeroMiniVideoClick
				);
			};
		},
		{ scope: videoFrame, dependencies: [videoIndex.current] }
	);

	const getVideoSrc = (index: number) => `/videos/hero-${index}.mp4`;

	const handleCurrentVideoLoaded = () => {
		if (nextBackgroundVideoRef.current && currentBackgroundVideoRef.current) {
			currentBackgroundVideoRef.current.currentTime =
				nextBackgroundVideoRef.current.currentTime;
		}
	};

	const handleNextVideoLoaded = () => {};

	return (
		<div className="relative w-screen h-dvh overflow-x-hidden">
			<div
				id="video-frame"
				ref={videoFrame}
				className="relative z-10 bg-bbsu-blue-75 w-screen h-dvh overflow-hidden"
			>
				<div className="place-items-center grid w-screen h-screen">
					<div className="z-50 absolute mask-clip-path rounded-lg overflow-hidden size-64">
						<button
							type="button"
							aria-label="change background video"
							className="opacity-0 hover:opacity-100 origin-center transition-all duration-500 ease-in scale-50 hover:scale-100"
						>
							<VideoElement
								id={buttonVideoId.slice(1)}
								src={getVideoSrc(
									heroVideosNumber[(videoIndex.current + 1) % totalHeroVideos]
								)}
								className="origin-center object-cover size-64"
								ref={buttonVideoRef}
							/>
						</button>
					</div>
					<VideoElement
						id={nextBackgroundVideoId.slice(1)}
						src={getVideoSrc(
							heroVideosNumber[(videoIndex.current + 1) % totalHeroVideos]
						)}
						className="z-20 absolute opacity-0 object-center object-cover size-64"
						onLoadedData={handleNextVideoLoaded}
						ref={nextBackgroundVideoRef}
						autoPlay
					/>
					<VideoElement
						id={currentBackgroundVideoId.slice(1)}
						src={getVideoSrc(heroVideosNumber[videoIndex.current])}
						className="absolute object-center object-cover size-full"
						onLoadedData={handleCurrentVideoLoaded}
						ref={currentBackgroundVideoRef}
						autoPlay
					/>
				</div>
				<HeroHeader />
				<span
					aria-hidden
					className="right-5 sm:right-10 bottom-5 absolute font-black font-zentry-regular text-5xl text-bbsu-black-700 sm:text-7xl md:text-9xl lg:text-[12rem] uppercase special-font"
				>
					<span>u</span>seless
				</span>
			</div>
		</div>
	);
}

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
	src: string;
	className: string;
	handleVideoLoaded?: () => void;
	isButton?: boolean;
}

const VideoElement = React.forwardRef<HTMLVideoElement, VideoProps>(
	({ src, className, handleVideoLoaded, ...props }: VideoProps, ref) => {
		return (
			<video
				width={320}
				height={320}
				src={src}
				loop
				muted
				ref={ref}
				aria-label="short clips of gameplay of random computer games"
				className={className}
				onLoadedMetadata={handleVideoLoaded}
				tabIndex={-1}
				{...props}
			/>
		);
	}
);

VideoElement.displayName = "VideoElement";

const HeroHeader = () => {
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
			<div className="top-36 sm:top-44 md:top-60 lg:top-[22rem] left-5 sm:left-10 absolute">
				<Button
					id="watch-trailer"
					leftIcon={<TiLocationArrow />}
					className="promo-button"
				>
					Watch trailer
				</Button>
			</div>
		</div>
	);
};
