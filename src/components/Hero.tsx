import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

const ANIMATION_CONFIG = {
	DURATION: {
		EXPAND: 0.5,
		BUTTON: 1,
	},
	DELAY: {
		BACKGROUND: 1,
		BUTTON: 1,
		INDEX_UPDATE: 1.5,
	},
	SIZE: {
		MINI: "16rem",
		FULL: "100%",
	},
} as const;

export default function Hero() {
	const heroVideosNumber = [1, 2, 3, 4] as const;
	const totalHeroVideos = heroVideosNumber.length;

	const nextBackgroundVideoId = "#next-background-video";
	const currentBackgroundVideoId = "#current-background-video";
	const buttonVideoId = "#button-video";

	const videoIndex = React.useRef(0);
	const buttonVideoRef = React.useRef<HTMLVideoElement>(null);
	const nextBackgroundVideoRef = React.useRef<HTMLVideoElement>(null);
	const currentBackgroundVideoRef = React.useRef<HTMLVideoElement>(null);
	const videoFrame = React.useRef<HTMLDivElement>(null);

	const getVideoSrc = React.useCallback(
		(index: number) => `/videos/hero-${index}.mp4`,
		[]
	);

	const handleCurrentVideoLoaded = React.useCallback(() => {
		if (nextBackgroundVideoRef.current && currentBackgroundVideoRef.current) {
			currentBackgroundVideoRef.current.currentTime =
				nextBackgroundVideoRef.current.currentTime;
		}
	}, []);

	useGSAP(
		(_context, contextSafe) => {
			if (!contextSafe) return;

			const handleHeroMiniVideoClick = contextSafe(() => {
				if (nextBackgroundVideoRef.current) {
					nextBackgroundVideoRef.current.currentTime = 0;
				}

				// Hide button video
				gsap.set(buttonVideoRef.current, {
					visibility: "hidden",
				});

				// Expand next background video
				gsap.fromTo(
					nextBackgroundVideoId,
					{
						opacity: 1,
						zIndex: 20,
					},
					{
						duration: ANIMATION_CONFIG.DURATION.EXPAND,
						ease: "power1.inOut",
						width: ANIMATION_CONFIG.SIZE.FULL,
						height: ANIMATION_CONFIG.SIZE.FULL,

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

				// Reset next background video
				gsap.to(nextBackgroundVideoId, {
					delay: ANIMATION_CONFIG.DELAY.BACKGROUND,
					duration: 0,
					width: ANIMATION_CONFIG.SIZE.MINI,
					height: ANIMATION_CONFIG.SIZE.MINI,
					opacity: 0,
					zIndex: 0,

					onComplete: () => {
						if (nextBackgroundVideoRef.current && buttonVideoRef.current) {
							const nextIndex =
								heroVideosNumber[(videoIndex.current + 2) % totalHeroVideos];
							nextBackgroundVideoRef.current.src = getVideoSrc(nextIndex);
							buttonVideoRef.current.src = getVideoSrc(nextIndex);
						}

						// Show button video
						gsap.set(buttonVideoRef.current, {
							visibility: "visible",
						});
					},
				});

				// Animate button video
				gsap.fromTo(
					buttonVideoId,
					{
						width: 0,
						height: 0,
					},
					{
						delay: ANIMATION_CONFIG.DELAY.BUTTON,
						duration: ANIMATION_CONFIG.DURATION.BUTTON,
						ease: "power1.inOut",
						width: ANIMATION_CONFIG.SIZE.MINI,
						height: ANIMATION_CONFIG.SIZE.MINI,
					}
				);

				// Update video index
				gsap.delayedCall(ANIMATION_CONFIG.DELAY.INDEX_UPDATE, () => {
					videoIndex.current = (videoIndex.current + 1) % totalHeroVideos;
				});
			});

			const buttonVideo = buttonVideoRef.current;
			buttonVideo?.addEventListener("click", handleHeroMiniVideoClick);

			return () => {
				buttonVideo?.removeEventListener("click", handleHeroMiniVideoClick);
			};
		},
		{
			scope: videoFrame,
			dependencies: [videoIndex.current, getVideoSrc, totalHeroVideos],
		}
	);

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
}

const VideoElement = React.forwardRef<HTMLVideoElement, VideoProps>(
	({ src, className, ...props }: VideoProps, ref) => {
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
