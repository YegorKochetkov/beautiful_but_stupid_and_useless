import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const BACKGROUND_VIDEO_ANIMATION_CONFIG = {
	DURATION: {
		BACKGROUND_EXPAND: 0.7,
		BACKGROUND_RESET: 0,
		BUTTON_EXPAND: 1.5,
	},
	STATE: {
		BACKGROUND_BORDER_RADIUS_TO: 0,
		BACKGROUND_OPACITY_FROM: 1,
		BACKGROUND_OPACITY_TO: 0,
		BACKGROUND_Z_INDEX_FROM: 20,
		BACKGROUND_Z_INDEX_TO: -20,
		BUTTON_Z_INDEX_FROM: 50,
		BUTTON_OPACITY_FROM: 0,
		BUTTON_OPACITY_TO: 1,
		BUTTON_VISIBILITY_FROM: "hidden",
		BUTTON_VISIBILITY_TO: "visible",
		BUTTON_SCALE_FROM: 0.25,
		BUTTON_SCALE_TO: 1,
	},
	SIZE: {
		MINI: "16rem",
		FULL: "100%",
	},
} as const;

export const VideoBackground = ({
	gsapScope,
	onAllVideosLoaded,
	allVideosLoaded,
}: {
	gsapScope?: React.RefObject<HTMLDivElement>;
	onAllVideosLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
	allVideosLoaded?: boolean;
}) => {
	const heroVideosNumber = [1, 2, 3, 4] as const;
	const totalHeroVideos = heroVideosNumber.length;

	const videoIndex = React.useRef(0);
	const swapButtonRef = React.useRef<HTMLButtonElement>(null);
	const swapButtonVideoRef = React.useRef<HTMLVideoElement>(null);
	const nextBackgroundVideoRef = React.useRef<HTMLVideoElement>(null);
	const currentBackgroundVideoRef = React.useRef<HTMLVideoElement>(null);

	const getVideoSrc = (index: number) => `/videos/hero-${index}.mp4`;

	const loadedVideosCount = React.useRef(0);

	const checkIsAllVideosLoaded = () => {
		if (loadedVideosCount.current < totalHeroVideos) {
			loadedVideosCount.current += 1;
		}

		if (
			loadedVideosCount.current === totalHeroVideos &&
			onAllVideosLoaded &&
			!allVideosLoaded
		) {
			onAllVideosLoaded(true);
		}
	};

	const syncVideoOnLoaded = () => {
		checkIsAllVideosLoaded();

		if (nextBackgroundVideoRef.current && currentBackgroundVideoRef.current) {
			currentBackgroundVideoRef.current.currentTime =
				nextBackgroundVideoRef.current.currentTime + 0.08; // this addition prevent video jumps
		}
	};

	useGSAP(
		(_context, contextSafe) => {
			if (!contextSafe) return;

			const tl = gsap.timeline({ paused: true });

			const handleHeroMiniVideoClick = contextSafe(() => {
				tl.clear();
				// Start next background video from the beginning
				if (nextBackgroundVideoRef.current) {
					nextBackgroundVideoRef.current.currentTime = 0;
				}

				if (swapButtonRef.current) {
					swapButtonRef.current.disabled = true;
				}

				// Hide swap button
				tl.set(swapButtonVideoRef.current, {
					visibility:
						BACKGROUND_VIDEO_ANIMATION_CONFIG.STATE.BUTTON_VISIBILITY_FROM,
				})
					// Expand next background video
					.fromTo(
						nextBackgroundVideoRef.current,
						{
							opacity:
								BACKGROUND_VIDEO_ANIMATION_CONFIG.STATE.BACKGROUND_OPACITY_FROM,
							zIndex:
								BACKGROUND_VIDEO_ANIMATION_CONFIG.STATE.BACKGROUND_Z_INDEX_FROM,
						},
						{
							ease: "power2.inOut",
							duration:
								BACKGROUND_VIDEO_ANIMATION_CONFIG.DURATION.BACKGROUND_EXPAND,
							width: BACKGROUND_VIDEO_ANIMATION_CONFIG.SIZE.FULL,
							height: BACKGROUND_VIDEO_ANIMATION_CONFIG.SIZE.FULL,
							borderRadius:
								BACKGROUND_VIDEO_ANIMATION_CONFIG.STATE
									.BACKGROUND_BORDER_RADIUS_TO,
							// Update current background & swap button video src
							onComplete: () => {
								if (
									currentBackgroundVideoRef.current &&
									swapButtonVideoRef.current
								) {
									currentBackgroundVideoRef.current.src = getVideoSrc(
										heroVideosNumber[(videoIndex.current + 1) % totalHeroVideos]
									);

									swapButtonVideoRef.current.src = getVideoSrc(
										heroVideosNumber[(videoIndex.current + 2) % totalHeroVideos]
									);
								}
							},
						},
						`0`
					)
					// Collapse next background video
					.to(
						nextBackgroundVideoRef.current,
						{
							ease: "power1.inOut",
							duration:
								BACKGROUND_VIDEO_ANIMATION_CONFIG.DURATION.BACKGROUND_RESET,
							opacity:
								BACKGROUND_VIDEO_ANIMATION_CONFIG.STATE.BACKGROUND_OPACITY_TO,
							zIndex:
								BACKGROUND_VIDEO_ANIMATION_CONFIG.STATE.BACKGROUND_Z_INDEX_TO,
							width: BACKGROUND_VIDEO_ANIMATION_CONFIG.SIZE.MINI,
							height: BACKGROUND_VIDEO_ANIMATION_CONFIG.SIZE.MINI,
							// Update next background video src
							onComplete: () => {
								if (nextBackgroundVideoRef.current) {
									nextBackgroundVideoRef.current.src = getVideoSrc(
										heroVideosNumber[(videoIndex.current + 2) % totalHeroVideos]
									);
								}
							},
						},
						`>+=1.3`
					)
					// Expand swap button
					.fromTo(
						swapButtonVideoRef.current,
						{
							opacity:
								BACKGROUND_VIDEO_ANIMATION_CONFIG.STATE.BUTTON_OPACITY_FROM,
							scale: BACKGROUND_VIDEO_ANIMATION_CONFIG.STATE.BUTTON_SCALE_FROM,
							zIndex: BACKGROUND_VIDEO_ANIMATION_CONFIG.STATE.BUTTON_Z_INDEX_FROM,
							visibility:
								BACKGROUND_VIDEO_ANIMATION_CONFIG.STATE.BUTTON_VISIBILITY_TO,
						},
						{
							onStart: () => {
								if (swapButtonRef.current) {
									swapButtonRef.current.disabled = false;
								}

								videoIndex.current = (videoIndex.current + 1) % totalHeroVideos;
							},

							ease: "elastic.inOut",
							duration: BACKGROUND_VIDEO_ANIMATION_CONFIG.DURATION.BUTTON_EXPAND,
							width: BACKGROUND_VIDEO_ANIMATION_CONFIG.SIZE.MINI,
							height: BACKGROUND_VIDEO_ANIMATION_CONFIG.SIZE.MINI,
							opacity: BACKGROUND_VIDEO_ANIMATION_CONFIG.STATE.BUTTON_OPACITY_TO,
							scale: BACKGROUND_VIDEO_ANIMATION_CONFIG.STATE.BUTTON_SCALE_TO,
						},
						`>`
					);

				tl.play();
			});

			const buttonVideo = swapButtonRef.current;
			buttonVideo?.addEventListener("click", handleHeroMiniVideoClick);

			return () => {
				buttonVideo?.removeEventListener("click", handleHeroMiniVideoClick);
				tl.kill();
			};
		},
		{
			scope: gsapScope,
		}
	);

	useGSAP(() => {
		if (!gsapScope?.current) return;

		const tl = gsap.timeline({ paused: true });

		tl
			// .set(gsapScope?.current, {
			// 	clipPath: "polygon(12% 0, 78% 0, 95% 90%, 0 100%)",
			// 	borderRadius: "0% 0% 40% 5%",
			// })
			.to(gsapScope?.current, {
				// clipPath: "polygon(0% 0, 100% 100%, 100% 100%, 100% 100%)",
				// borderRadius: "0% 0% 0% 0%",
				clipPath: "polygon(12% 0, 78% 0, 95% 90%, 0 100%)",
				borderRadius: "0% 0% 40% 5%",
				ease: "power1.inOut",
				scrollTrigger: {
					trigger: gsapScope?.current,
					start: "center center",
					end: "bottom center",
					scrub: true,
				},
			});

		return () => {
			tl.kill();
		};
	});

	return (
		<div className="place-items-center grid w-screen h-screen">
			<div className="z-50 absolute mask-clip-path rounded-lg overflow-hidden size-64">
				<button
					ref={swapButtonRef}
					type="button"
					aria-label="change background video"
					className="opacity-70 hover:opacity-100 transition-all duration-500 overflow-hidden ease-in hover:scale-100 object-cover scale-50 size-64"
				>
					<video
						loop
						muted
						aria-label="short clips of gameplay of random computer games"
						onLoadedData={checkIsAllVideosLoaded}
						ref={swapButtonVideoRef}
						src={getVideoSrc(
							heroVideosNumber[(videoIndex.current + 1) % totalHeroVideos]
						)}
						className="border-4 border-bbsu-blue-75 rounded-3xl origin-center object-cover size-full"
					/>
				</button>
			</div>
			<video
				loop
				muted
				autoPlay
				aria-label="short clips of gameplay of random computer games"
				onLoadedData={checkIsAllVideosLoaded}
				src={getVideoSrc(
					heroVideosNumber[(videoIndex.current + 1) % totalHeroVideos]
				)}
				className="z-20 absolute opacity-0 rounded-xl object-center object-cover size-64"
				ref={nextBackgroundVideoRef}
			/>
			<video
				loop
				muted
				autoPlay
				aria-label="short clips of gameplay of random computer games"
				onLoadedData={syncVideoOnLoaded}
				src={getVideoSrc(heroVideosNumber[videoIndex.current])}
				className="absolute object-center object-cover size-full"
				ref={currentBackgroundVideoRef}
			/>
			<video
				muted
				autoPlay
				hidden
				onLoadedData={checkIsAllVideosLoaded}
				src={getVideoSrc(
					heroVideosNumber[(videoIndex.current + 2) % totalHeroVideos]
				)}
			/>
			<video
				muted
				autoPlay
				hidden
				onLoadedData={checkIsAllVideosLoaded}
				src={getVideoSrc(
					heroVideosNumber[(videoIndex.current + 3) % totalHeroVideos]
				)}
			/>
		</div>
	);
};
