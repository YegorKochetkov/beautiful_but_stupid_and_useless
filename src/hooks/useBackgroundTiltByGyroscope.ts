import React from "react";
import { position, rotation, Vec2 } from "../lib/parallax";

// Tilt effect by device orientation
export const useBackgroundTiltByGyroscope = (
	setStyle: (rotation: Vec2, position: Vec2) => void,
) => {
	React.useEffect(() => {
		if (!window.DeviceOrientationEvent) return;

		const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
			if (event.beta === null || event.gamma === null) return;

			// Normalize and limit the tilt angles
			let xRotation =
				Math.abs(event.gamma) > 10 ? 10 * Math.sign(event.gamma) : event.gamma;
			let yRotation =
				Math.abs(event.beta) > 10 ? 10 * Math.sign(event.beta) : event.beta;

			if (event.beta < 90) {
				xRotation = -xRotation;
			}
			if (event.beta > 90) {
				xRotation = 0 - xRotation;
				yRotation = -yRotation;
			}

			const positionDecreaseFactor = 0.6;
			const lerpFactor = 0.01;

			position.target.set(
				xRotation * positionDecreaseFactor,
				yRotation * positionDecreaseFactor,
			);
			position.current.interpolate(position.target, lerpFactor);

			setStyle(rotation.current, position.current);
		};

		const deviceOrientationController = new AbortController();

		window.addEventListener("deviceorientation", handleDeviceOrientation, {
			signal: deviceOrientationController.signal,
		});

		return () => {
			deviceOrientationController.abort();
		};
	}, [setStyle]);
};
