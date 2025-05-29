// Cut from slider https://codepen.io/dev_loop/pen/MWKbJmO

import React, { useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

import { Button } from "./Button";
import { cn, limitWithSign } from "../../lib/utils";

import {
	rotation,
	position,
	type Vec2,
	interpolateFactor,
} from "../../lib/parallax";
import { useBackgroundTiltByGyroscope } from "../../hooks/useBackgroundTiltByGyroscope";

export const ParallaxCard = ({
	src,
	title,
	description,
	isComingSoon,
	decorativeElement,
}: {
	src?: string;
	title?: string | React.ReactNode;
	description?: string | React.ReactNode;
	decorativeElement?: string | React.ReactNode;
	isComingSoon?: boolean;
}) => {
	const cardRef = React.useRef<HTMLDivElement>(null);
	const backgroundWrapperRef = useRef<HTMLDivElement>(null);
	const textWrapperRef = React.useRef<HTMLDivElement>(null);

	const setStyle = (rotation: Vec2, position: Vec2) => {
		backgroundWrapperRef.current?.style.setProperty(
			"--rotX",
			`${rotation.y.toFixed(2)}deg`,
		);
		backgroundWrapperRef.current?.style.setProperty(
			"--rotY",
			`${rotation.x.toFixed(2)}deg`,
		);
		backgroundWrapperRef.current?.style.setProperty(
			"--bgPosX",
			`${position.x.toFixed(2)}%`,
		);
		backgroundWrapperRef.current?.style.setProperty(
			"--bgPosY",
			`${position.y.toFixed(2)}%`,
		);

		textWrapperRef.current?.style.setProperty(
			"--rotX",
			`${rotation.y.toFixed(2)}deg`,
		);
		textWrapperRef.current?.style.setProperty(
			"--rotY",
			`${rotation.x.toFixed(2)}deg`,
		);
		textWrapperRef.current?.style.setProperty(
			"--bgPosX",
			`${position.x.toFixed(2)}%`,
		);
		textWrapperRef.current?.style.setProperty(
			"--bgPosY",
			`${position.y.toFixed(2)}%`,
		);
	};

	const handleMouseMove = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => {
		if (!cardRef.current) return;

		cardRef.current?.classList.remove("reset-position");

		const { clientX, clientY } = event;
		const { left, top, width, height } =
			cardRef.current.getBoundingClientRect();

		const x = clientX - left;
		const y = clientY - top;

		const xPercentage = (x / width) * 100;
		const yPercentage = (y / height) * 100;

		// The subtraction of 50 is crucial for creating a centered rotation effect. Here's why:
		// xPercentage and yPercentage represent the mouse position relative to the card, normalized between 0 and 100:
		// 0 is the left/top edge of the card
		// 100 is the right/bottom edge of the card
		// By subtracting 50, you shift the rotation point to the center of the card:
		// Without subtracting 50, rotation would be from 0 to 100
		// With subtracting 50, rotation is now from -50 to 50, centered around 0
		const center = 50;
		let xRotation = xPercentage - center;
		let yRotation = center - yPercentage;

		// Limit the rotation in degrees
		const maxDegreesX = width < 700 ? 4 : 2;
		const maxDegreesY = height < 600 ? 6 : 3;

		xRotation = limitWithSign(xRotation, maxDegreesX);
		yRotation = limitWithSign(yRotation, maxDegreesY);

		rotation.target.set(xRotation, yRotation);

		// Shift background position
		const positionShiftDecrease = 0.8;
		position.target.set(
			xRotation * positionShiftDecrease,
			yRotation * positionShiftDecrease,
		);

		// Rotate card
		const rotationInterpolateFactor =
			width < 700 || height < 400 ? 0.03 : interpolateFactor;
		rotation.current.interpolate(
			rotation.target,
			rotationInterpolateFactor,
		);
		position.current.interpolate(
			position.target,
			rotationInterpolateFactor,
		);

		setStyle(rotation.current, position.current);
	};

	const handleMouseLeave = () => {
		cardRef.current?.classList.add("reset-position");

		rotation.current.set(0, 0);
		position.current.set(0, 0);

		rotation.current.interpolate(rotation.target, interpolateFactor);
		position.current.interpolate(position.target, interpolateFactor);

		setStyle(rotation.current, position.current);
	};

	useBackgroundTiltByGyroscope(setStyle);

	return (
		<article
			className="parallax-card size-full hover:scale-[98%] hover:md:scale-[99%]"
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			ref={cardRef}
		>
			{/* Card background */}
			<div className="background-wrapper">
				<div
					className="background-inner-wrapper"
					ref={backgroundWrapperRef}
				>
					<div className="video-wrapper overflow-hidden rounded-lg border border-white/20 bg-bbsu-violet-300">
						<video
							src={src}
							autoPlay
							muted
							loop
							className="video"
						/>
					</div>
				</div>
			</div>

			{/* Card Info */}
			<div className="card-info-wrapper">
				<div className="card-info-inner-wrapper" ref={textWrapperRef}>
					<div className="card-info-text-wrapper">
						<div>
							<h2 className="card-info-title">
								<span>{title}</span>
							</h2>
							<p className="card-info-description">
								{description}
							</p>
						</div>
						{isComingSoon ? (
							<Button
								type="button"
								className={cn("button", "video-card-button")}
								rightIcon={<TiLocationArrow />}
							>
								Coming soon
							</Button>
						) : null}
					</div>
					{decorativeElement}
				</div>
			</div>
		</article>
	);
};
