import React from "react";
import { position, rotation, type Vec2 } from "../lib/parallax";
import { limitWithSign } from "../lib/utils";

/**
 * A hook that applies a tilt effect to the background based on device orientation.
 * 
 * @param setStyle - A function to update the style with rotation and position values
 * @returns void
 */
export const useBackgroundTiltByGyroscope = (
	setStyle: (rotation: Vec2, position: Vec2) => void,
) => {
	React.useEffect(() => {
		const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
			if (event.beta === null || event.gamma === null) return;

			// Limit background  position shift
			const maxShift = 6;
			const xPosition = limitWithSign(event.beta, maxShift);
			const yPosition = limitWithSign(event.gamma, maxShift);

			const interpolateFactor = 0.02;
			position.target.set(-yPosition, -xPosition);
			position.current.interpolate(position.target, interpolateFactor);

			setStyle(rotation.current, position.current);
		};

		const deviceOrientationAbortController = new AbortController();
		const opts = {
			signal: deviceOrientationAbortController.signal,
		};

		window.addEventListener("deviceorientation", handleDeviceOrientation, opts);

		return () => {
			deviceOrientationAbortController.abort();
		};
	}, [setStyle]);
};
