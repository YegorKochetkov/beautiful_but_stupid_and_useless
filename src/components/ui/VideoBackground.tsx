import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

const heroVideosNumber = [1, 2, 3, 4] as const;

export const VideoBackground = ({
	gsapScope,
	onAllVideosLoaded,
	allVideosLoaded,
}: {
	gsapScope?: React.RefObject<HTMLDivElement>;
	onAllVideosLoaded: React.Dispatch<React.SetStateAction<boolean>>;
	allVideosLoaded: boolean;
}) => {
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

	React.useEffect(() => {
		// 3-d tilt effect for the video button.
		const handleMouseMove = (ev: MouseEvent) => {
			const videoButton = document.querySelector<HTMLButtonElement>(
				'button[data-is-button="true"]',
			);

			if (!videoButton) return;

			const buttonRect = videoButton.getBoundingClientRect();

			const x = ev.clientX - buttonRect.left;
			const y = ev.clientY - buttonRect.top;

			const xPercentage = x / buttonRect.width;
			const yPercentage = y / buttonRect.height;

			// The subtraction of 0.5 is crucial for creating a centered rotation effect. Here's why:
			// xPercentage and yPercentage represent the mouse position relative to the page, normalized between 0 and 1:
			// 0 is the left/top edge of the page
			// 1 is the right/bottom edge of the page
			// By subtracting 0.5, you shift the rotation point to the center of the page:
			// Without -0.5, rotation would be from 0 to 1
			// With -0.5, rotation is now from -0.5 to 0.5, centered around 0
			// This means:
			// When the mouse is at the left/top edge, you get a negative rotation
			// When the mouse is at the right/bottom edge, you get a positive rotation
			// When the mouse is in the center, the rotation is 0
			let xRotation = (xPercentage - 0.5) * 10;
			let yRotation = (0.5 - yPercentage) * 10;

			// Maximum rotation is 25 degrees
			xRotation =
				Math.abs(xRotation) > 25 ? 25 * Math.sign(xRotation) : xRotation;
			yRotation =
				Math.abs(yRotation) > 25 ? 25 * Math.sign(yRotation) : yRotation;

			videoButton.style.setProperty("--x-rotation", `${yRotation}deg`);
			videoButton.style.setProperty("--y-rotation", `${xRotation}deg`);
			// It's for the glare
			videoButton.style.setProperty("--x", `${xPercentage * 80}%`);
			videoButton.style.setProperty("--y", `${yPercentage * 60}%`);
		};

		const mouseMoveController = new AbortController();

		document.addEventListener("mousemove", handleMouseMove, {
			signal: mouseMoveController.signal,
		});

		return () => mouseMoveController.abort();
	}, []);

	useGSAP(
		(_context, contextSafe) => {
			if (!contextSafe) return;

			const tl = gsap.timeline({ paused: true });

			const nextVideoButton = document.querySelector<HTMLButtonElement>(
				'button[data-is-button="true"]',
			);
			const videoElementInNextVideoButton =
				nextVideoButton?.querySelector<HTMLVideoElement>("video");

			const expandedVideo = document.querySelector<HTMLButtonElement>(
				'button[data-is-expanded="true"]',
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
						onstart: () => {
							if (nextVideoButton) {
								nextVideoButton.style.setProperty("--glare-opacity", "0");
							}

							// Play expanding video from the beginning
							if (videoElementInNextVideoButton) {
								videoElementInNextVideoButton.currentTime = 0;
								videoElementInNextVideoButton
									.play()
									.catch((err) =>
										console.warn("Error start playing video: ", err),
									);
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
								nextVideoButton.style.setProperty("--glare-opacity", "0.3");
							}
							// Pause previously expanded video after next video is expanded
							if (videoElementInExpandedVideo) {
								videoElementInExpandedVideo.pause();
								videoElementInExpandedVideo.currentTime = 0;
							}

							setCurrentVideoIndex(
								(videoIndex) => (videoIndex + 1) % totalHeroVideos,
							);
						},
					},
				);

				tl.play();
			});

			const nextVideoButtonController = new AbortController();

			nextVideoButton?.addEventListener("click", handleHeroMiniVideoClick, {
				signal: nextVideoButtonController.signal,
			});

			return () => {
				nextVideoButtonController.abort();
				tl.kill();
			};
		},
		{
			scope: gsapScope,
			dependencies: [gsapScope, currentVideoIndex],
			revertOnUpdate: true,
		},
	);

	const videoButtonStyle =
		"hover-3d-effect size-44 z-50 rounded-xl border-2 border-bbsu-black-700 opacity-70 hover:opacity-100 transition-opacity duration-300 ease-in-out button-with-video-appearance";
	const expandedVideoStyle =
		"size-full z-10 border-0 [transform:rotateX(0deg)_rotateY(0deg)] cursor-default";
	const hiddenVideoStyle = `${videoButtonStyle} z-0 hidden`;

	return (
		<div className="video-elements-container absolute grid h-screen w-screen place-items-center [perspective:1000px]">
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
						className={`absolute overflow-hidden ${styles}`}
					>
						<video
							muted
							autoPlay={isExpanded}
							loop
							onLoadedData={checkIsAllVideosLoaded}
							src={`/videos/hero-${videoNumber}.mp4`}
							className="size-full object-cover object-center"
						/>
					</button>
				);
			})}
		</div>
	);
};
