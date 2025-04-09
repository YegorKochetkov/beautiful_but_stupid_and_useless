import React from "react";
import { lerpFactor, position, rotation, Vec2 } from "../lib/parallax";

// Tilt effect by device orientation
export const useGyroscopeTilt = (
	targetRef: React.RefObject<HTMLDivElement>, 
	 setStyle: (rotation: Vec2, position: Vec2) => void) => {
	React.useEffect(() => {
		if (!targetRef.current) return;

		targetRef.current.style.setProperty(
			"transform",
			"rotateX(0deg) rotateY(0deg)"
		);
		targetRef.current.style.setProperty("--slide-transition-duration", "0ms");

		const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
			if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
				// Normalize and limit the tilt angles
				const rotationFactor = Math.abs(event.gamma) > 10 ? 10 * Math.sign(event.gamma) : event.gamma;

				let xRotation = rotationFactor;
				const yRotation = rotationFactor;
				
				if (event.beta < 90) {
					xRotation = -xRotation;
				}
				if (event.beta > 90) {
					xRotation = 0 - xRotation;
				}
				
				const positionDecreaseFactor = 0.6;
				
				rotation.target.set(xRotation, yRotation);
				position.target.set(
					xRotation * positionDecreaseFactor,
					yRotation * positionDecreaseFactor,
				);
		
				rotation.current.interpolate(rotation.target, lerpFactor);
				position.current.interpolate(position.target, lerpFactor);
		
				setStyle(rotation.current, position.current);
			}
		};

		// Check if device orientation events are supported
		if (window.DeviceOrientationEvent) {
			const deviceOrientationController = new AbortController();

			window.addEventListener("deviceorientation", handleDeviceOrientation, {
				signal: deviceOrientationController.signal,
			});

			return () => {
				deviceOrientationController.abort();
			};
		}
	}, [setStyle, targetRef]);
};
