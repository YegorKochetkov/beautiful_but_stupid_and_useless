// Cut from slider https://codepen.io/dev_loop/pen/MWKbJmO

import React, { useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

import { Button } from "./Button";
import { cn } from "../../lib/utils";

import { rotation, position, Vec2, lerpFactor } from "../../lib/parallax";
import { useGyroscopeTilt } from "../../hooks/useGyroscopeTilt";

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
			rotation.y.toFixed(2) + "deg",
		);
		backgroundWrapperRef.current?.style.setProperty(
			"--rotY",
			rotation.x.toFixed(2) + "deg",
		);
		backgroundWrapperRef.current?.style.setProperty(
			"--bgPosX",
			position.x.toFixed(2) + "%",
		);
		backgroundWrapperRef.current?.style.setProperty(
			"--bgPosY",
			position.y.toFixed(2) + "%",
		);

		textWrapperRef.current?.style.setProperty(
			"--rotX",
			rotation.y.toFixed(2) + "deg",
		);
		textWrapperRef.current?.style.setProperty(
			"--rotY",
			rotation.x.toFixed(2) + "deg",
		);
		textWrapperRef.current?.style.setProperty(
			"--bgPosX",
			position.x.toFixed(2) + "%",
		);
		textWrapperRef.current?.style.setProperty(
			"--bgPosY",
			position.y.toFixed(2) + "%",
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

		const xPercentage = x / width;
		const yPercentage = y / height;

		const rotationXFactor = width < 700 ? 2 : 1;
		const rotationYFactor = height < 600 ? 4 : 2;

		// The subtraction of 0.5 is crucial for creating a centered rotation effect. Here's why:
		// xPercentage and yPercentage represent the mouse position relative to the card, normalized between 0 and 1:
		// 0 is the left/top edge of the card
		// 1 is the right/bottom edge of the card
		// By subtracting 0.5, you shift the rotation point to the center of the card:
		// Without -0.5, rotation would be from 0 to 1
		// With -0.5, rotation is now from -0.5 to 0.5, centered around 0
		// This means:
		// When the mouse is at the left/top edge, you get a negative rotation
		// When the mouse is at the right/bottom edge, you get a positive rotation
		// When the mouse is in the center, the rotation is 0
		const xRotation = (xPercentage - 0.5) * (Math.PI * rotationXFactor);
		const yRotation = -(yPercentage - 0.5) * (Math.PI * rotationYFactor);

		const positionDecreaseFactor = 0.6;

		rotation.target.set(xRotation, yRotation);
		position.target.set(
			-xRotation * positionDecreaseFactor,
			yRotation * positionDecreaseFactor,
		);

		rotation.current.interpolate(rotation.target, lerpFactor);
		position.current.interpolate(position.target, lerpFactor);

		setStyle(rotation.current, position.current);
	};

	const handleMouseLeave = () => {
		cardRef.current?.classList.add("reset-position");

		rotation.current.set(0, 0);
		position.current.set(0, 0);

		setStyle(rotation.current, position.current);

		rotation.target.set(0, 0);
		position.target.set(0, 0);

		rotation.current.interpolate(rotation.target, lerpFactor);
		position.current.interpolate(position.target, lerpFactor);
	};

	useGyroscopeTilt(cardRef);

	return (
		<article
			className="parallax-card size-full hover:scale-[98%] hover:md:scale-[99%]"
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			ref={cardRef}
		>
			{/* Card background */}
			<div className="background-wrapper">
				<div className="background-inner-wrapper" ref={backgroundWrapperRef}>
					<div className="video-wrapper overflow-hidden rounded-lg border border-white/20 bg-bbsu-violet-300">
						<video src={src} autoPlay muted loop className="video" />
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
							<p className="card-info-description">{description}</p>
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
