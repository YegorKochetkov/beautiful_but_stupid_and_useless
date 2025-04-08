import React from "react";
import { lerpFactor, rotation } from "../lib/parallax";

// Tilt effect by device orientation
export const useGyroscopeTilt = (targetRef: React.RefObject<HTMLDivElement>) => {
	React.useEffect(() => {
		if (!targetRef.current) return;

		targetRef.current.style.setProperty(
			"transform",
			"rotateX(0deg) rotateY(0deg)"
		);
		targetRef.current.style.setProperty("--slide-transition-duration", "0ms");

		const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
			if (event.alpha !== null && event.gamma !== null) {
				// Normalize and limit the tilt angles
				const xRotation = Math.max(Math.min(event.alpha, 10), 10);
				const yRotation = Math.max(Math.min(event.gamma, 10), -10);
				
				rotation.target.set(xRotation, -yRotation);
				rotation.current.interpolate(rotation.target, lerpFactor);

				targetRef.current?.style.setProperty(
					"transform",
					`rotateX(${rotation.current.x.toFixed(4)}deg) 
					rotateY(${rotation.current.y.toFixed(4)}deg)
					perspective(400px)`
				);
				targetRef.current?.style.setProperty(
					"--slide-transition-duration",
					"300ms"
				);
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
	}, [targetRef]);
};
