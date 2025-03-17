import React from "react";
import clsx from "clsx";

export function AudioIndicator() {
	const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);
	const [isIndicatorActive, setIsIndicatorActive] = React.useState(false);

	const audioElementRef = React.useRef<HTMLAudioElement>(null);

	const toggleAudioIndicator = () => {
		setIsAudioPlaying(!isAudioPlaying);
		setIsIndicatorActive(!isIndicatorActive);
	};

	React.useEffect(() => {
		if (isAudioPlaying) {
			audioElementRef.current?.play().catch((error) => {
				console.error("Error playing audio:", error);
			});
		} else {
			audioElementRef.current?.pause();
		}
	}, [isAudioPlaying]);

	return (
		<button
			type="button"
			onClick={toggleAudioIndicator}
			className="ml-10 flex items-center space-x-0.5"
		>
			<audio
				ref={audioElementRef}
				className="hidden"
				src="/audio/loop.mp3"
				loop
			/>
			{[1, 2, 3, 4].map((bar) => (
				<div
					key={bar}
					className={clsx("indicator-line", {
						active: isIndicatorActive,
					})}
					style={{ "--animation-order": bar } as React.CSSProperties}
				/>
			))}
		</button>
	);
}
