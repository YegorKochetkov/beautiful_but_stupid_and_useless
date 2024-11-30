import React from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

export default function Hero() {
	const [currentVideoIndex, setCurrentVideoIndex] = React.useState(1);
	const [hasClicked, setHasClicked] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);
	const [loadedVideos, setLoadedVideos] = React.useState(0);

	const totalVideos = 4;
	const upcomingVideoIndex = (currentVideoIndex % totalVideos) + 1;
	const nextVideoRef = React.useRef<HTMLVideoElement>(null);

	const handleMiniVideoClick = () => {
		setHasClicked(true);
		setCurrentVideoIndex(upcomingVideoIndex);
	};

	const handleVideoLoaded = () => {
		setLoadedVideos((prev) => prev + 1);
	};

	const getVideoSrc = (index: number) => `/videos/hero-${index}.mp4`;

	return (
		<div className="relative w-screen h-dvh overflow-x-hidden">
			<div
				id="video-frame"
				className="relative z-10 bg-bbsu-blue-75 w-screen h-dvh overflow-hidden"
			>
				<div className="place-items-center grid w-screen h-screen">
					<div className="z-50 absolute mask-clip-path rounded-lg overflow-hidden size-64">
						<button
							type="button"
							aria-label="load next video"
							onClick={handleMiniVideoClick}
							className="opacity-0 hover:opacity-100 origin-center transition-all duration-500 ease-in scale-50 hover:scale-100"
						>
							<VideoElement
								src={getVideoSrc(upcomingVideoIndex)}
								className="origin-center object-cover scale-150 size-64"
								onLoadedData={handleVideoLoaded}
								ref={nextVideoRef}
							/>
						</button>
					</div>
					<VideoElement
						src={getVideoSrc(currentVideoIndex)}
						className="z-20 absolute invisible object-center object-cover size-64"
						onLoadedData={handleVideoLoaded}
						ref={nextVideoRef}
					/>
					<VideoElement
						src={getVideoSrc(currentVideoIndex)}
						className="absolute object-center object-cover size-full"
						onLoadedData={handleVideoLoaded}
						ref={nextVideoRef}
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
	onLoadedData: () => void;
	isButton?: boolean;
}

const VideoElement = React.forwardRef<HTMLVideoElement, VideoProps>(
	({ src, className, onLoadedData, ...props }: VideoProps, ref) => {
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
				onLoadedData={onLoadedData}
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
