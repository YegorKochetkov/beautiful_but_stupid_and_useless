import React from "react";

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
	src: string;
	className: string;
}

export const VideoElement = React.forwardRef<HTMLVideoElement, VideoProps>(
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
