import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const VideoBackground = ({
	gsapScope,
	onAllVideosLoaded,
	allVideosLoaded,
}: {
	gsapScope?: React.RefObject<HTMLDivElement>;
	onAllVideosLoaded: React.Dispatch<React.SetStateAction<boolean>>;
	allVideosLoaded: boolean;
}) => {
	const heroVideosNumber = [1, 2, 3, 4] as const;
	const totalHeroVideos = heroVideosNumber.length;

	// Loader is shown while all videos are not loaded
	const loadedVideosCount = React.useRef(0);
	const checkIsAllVideosLoaded = () => {
		if (loadedVideosCount.current < totalHeroVideos) {
			loadedVideosCount.current += 1;
		}

		if (loadedVideosCount.current === totalHeroVideos && !allVideosLoaded) {
			onAllVideosLoaded(true);
		}
	};

	const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);
	const nextVideoIndex = (currentVideoIndex + 1) % totalHeroVideos;

	// 3-d tilt effect for the video button
	const handleMouseMove = (ev: MouseEvent) => {
		const videoButton = document.querySelector<HTMLButtonElement>(
			'button[data-is-button="true"]'
		);

		if (!videoButton) return;

		const buttonRect = videoButton.getBoundingClientRect();

		const x = ev.clientX - buttonRect.left;
		const y = ev.clientY - buttonRect.top;

		const xPercentage = x / buttonRect.width;
		const yPercentage = y / buttonRect.height;

		let xRotation = (xPercentage - 0.5) * 10;
		let yRotation = (0.5 - yPercentage) * 10;
		// Maximum rotation is 25 degrees
		xRotation = Math.abs(xRotation) > 25 ? 25 * Math.sign(xRotation) : xRotation;
		yRotation = Math.abs(yRotation) > 25 ? 25 * Math.sign(yRotation) : yRotation;

		videoButton.style.setProperty("--x-rotation", `${yRotation}deg`);
		videoButton.style.setProperty("--y-rotation", `${xRotation}deg`);
		// It's for the glare
		videoButton.style.setProperty("--x", `${xPercentage * 80}%`);
		videoButton.style.setProperty("--y", `${yPercentage * 60}%`);
	};

	React.useEffect(() => {
		document.addEventListener("mousemove", handleMouseMove);
		return () => document.removeEventListener("mousemove", handleMouseMove);
	});

	useGSAP(
		(_context, contextSafe) => {
			if (!contextSafe) return;

			const tl = gsap.timeline({ paused: true });

			const nextVideoButton = document.querySelector<HTMLButtonElement>(
				'button[data-is-button="true"]'
			);
			const videoElementInNextVideoButton =
				nextVideoButton?.querySelector<HTMLVideoElement>("video");

			const expandedVideo = document.querySelector<HTMLButtonElement>(
				'button[data-is-expanded="true"]'
			);
			const videoElementInExpandedVideo =
				expandedVideo?.querySelector<HTMLVideoElement>("video");

			const handleHeroMiniVideoClick = contextSafe(() => {
				tl.clear();
				// Prevent user click while next video is expanding
				if (nextVideoButton) {
					nextVideoButton.disabled = true;
				}

				// Expand next background video
				tl.fromTo(
					nextVideoButton,
					{
						onstart: async () => {
							// Play expanding video from the beginning
							if (videoElementInNextVideoButton) {
								videoElementInNextVideoButton.currentTime = 0;
								await videoElementInNextVideoButton.play();
							}
						},
						opacity: 1,
					},
					{
						ease: "power2.inOut",
						duration: 1,
						width: "100%",
						height: "100%",
						borderRadius: "none",
						rotateX: 0,
						rotateY: 0,
						onComplete: () => {
							if (nextVideoButton) {
								nextVideoButton.disabled = false;
							}
							// Pause previously expanded video after next video is expanded
							if (videoElementInExpandedVideo) {
								videoElementInExpandedVideo.pause();
								videoElementInExpandedVideo.currentTime = 0;
							}

							setCurrentVideoIndex(
								(videoIndex) => (videoIndex + 1) % totalHeroVideos
							);
						},
					}
				);

				tl.play();
			});

			nextVideoButton?.addEventListener("click", handleHeroMiniVideoClick);

			return () => {
				nextVideoButton?.removeEventListener("click", handleHeroMiniVideoClick);
				tl.kill();
			};
		},
		{
			scope: gsapScope,
			dependencies: [gsapScope, currentVideoIndex],
			revertOnUpdate: true,
		}
	);

	// useGSAP(() => {
	// 	if (!gsapScope?.current) return;

	// 	const tl = gsap.timeline({ paused: true });

	// 	tl
	// 		// .set(gsapScope?.current, {
	// 		// 	clipPath: "polygon(12% 0, 78% 0, 95% 90%, 0 100%)",
	// 		// 	borderRadius: "0% 0% 40% 5%",
	// 		// })
	// 		.to(gsapScope?.current, {
	// 			// clipPath: "polygon(0% 0, 100% 100%, 100% 100%, 100% 100%)",
	// 			// borderRadius: "0% 0% 0% 0%",
	// 			clipPath: "polygon(12% 0, 78% 0, 95% 90%, 0 100%)",
	// 			borderRadius: "0% 0% 40% 5%",
	// 			ease: "power1.inOut",
	// 			scrollTrigger: {
	// 				trigger: gsapScope?.current,
	// 				start: "center center",
	// 				end: "bottom center",
	// 				scrub: true,
	// 			},
	// 		});

	// 	return () => {
	// 		tl.kill();
	// 	};
	// });

	const videoButtonStyle =
		"size-44 z-50 rounded-xl border-2 border-bbsu-black-700 opacity-70 hover:opacity-100 transition-opacity duration-300 ease-in-out button-appearance";
	const expandedVideoStyle =
		"size-full z-10 border-2 border-transparent [transform:rotateX(0deg)_rotateY(0deg)] cursor-default";
	const hiddenVideoStyle = `${videoButtonStyle} z-0 hidden`;

	return (
		<div className="video-elements-container place-items-center grid w-screen h-screen absolute [perspective:1000px]">
			{heroVideosNumber.map((videoNumber) => {
				const isExpanded = videoNumber === heroVideosNumber[currentVideoIndex];
				const isButton = videoNumber === heroVideosNumber[nextVideoIndex];

				let styles = hiddenVideoStyle;

				if (isExpanded) {
					styles = expandedVideoStyle;
				}

				if (isButton) {
					styles = videoButtonStyle;
				}

				return (
					<button
						key={videoNumber}
						id={`video-${videoNumber}`}
						data-is-button={isButton}
						data-is-expanded={isExpanded}
						type="button"
						aria-label="change background video"
						className={`hover-3d-effect absolute overflow-hidden ${styles}`}
					>
						<video
							muted
							autoPlay={isExpanded}
							loop
							onLoadedData={checkIsAllVideosLoaded}
							src={`/videos/hero-${videoNumber}.mp4`}
							className="object-center object-cover size-full"
						/>
					</button>
				);
			})}
		</div>
	);
};
