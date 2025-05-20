import React from "react";
import { position, rotation, type Vec2 } from "../lib/parallax";
import { limitWithSign } from "../lib/utils";

// Tilt effect by device orientation
export const useBackgroundTiltByGyroscope = (
	setStyle: (rotation: Vec2, position: Vec2) => void,
) => {
	React.useEffect(() => {
		if (!window.DeviceOrientationEvent) return;

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

		window.addEventListener("deviceorientation", handleDeviceOrientation, {
			signal: deviceOrientationAbortController.signal,
		});

		return () => {
			deviceOrientationAbortController.abort();
		};
	}, [setStyle]);
};
