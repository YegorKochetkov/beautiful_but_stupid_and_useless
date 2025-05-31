import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useBackgroundTiltByGyroscope } from "../useBackgroundTiltByGyroscope";
import { position, rotation } from "../../lib/parallax";

describe("useBackgroundTiltByGyroscope", () => {
	const mockDeviceOrientationEvent = (beta: number, gamma: number) => {
		const event = new Event("deviceorientation") as DeviceOrientationEvent;
		Object.defineProperties(event, {
			beta: { value: beta },
			gamma: { value: gamma },
		});
		window.dispatchEvent(event);
	};

	beforeEach(() => {
		position.current = { x: 0, y: 0, set: vi.fn(), interpolate: vi.fn() };
		position.target = { x: 0, y: 0, set: vi.fn(), interpolate: vi.fn() };
		rotation.current = { x: 0, y: 0, set: vi.fn(), interpolate: vi.fn() };

		vi.spyOn(position.target, "set");
		vi.spyOn(position.current, "interpolate");
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should update position based on device orientation", () => {
		const setStyle = vi.fn();

		renderHook(() => { useBackgroundTiltByGyroscope(setStyle) });

		mockDeviceOrientationEvent(2, 5);

		// Should be -2, -5 (because of the inversion in the hook)
		expect(position.target.set).toHaveBeenCalledWith(-5, -2);

		// Check if position.current.interpolate was called
		expect(position.current.interpolate).toHaveBeenCalledWith(
			position.target,
			0.02,
		);

		// Check if setStyle was called with correct values
		expect(setStyle).toHaveBeenCalledWith(rotation.current, position.current);
	});

	it("should limit position shift to maxShift value", () => {
		const setStyle = vi.fn();

		renderHook(() => { useBackgroundTiltByGyroscope(setStyle) });

		// Simulate device orientation with values exceeding maxShift (6)
		mockDeviceOrientationEvent(20, 15);

		// Should be limited to -6, -6 (negative because of the inversion in the hook)
		expect(position.target.set).toHaveBeenCalledWith(-6, -6);
	});

	it("should not update if beta or gamma is null", () => {
		const setStyle = vi.fn();

		renderHook(() => { useBackgroundTiltByGyroscope(setStyle) });

		const event = new Event("deviceorientation") as DeviceOrientationEvent;
		Object.defineProperties(event, {
			beta: { value: null },
			gamma: { value: null },
		});
		window.dispatchEvent(event);

		expect(position.target.set).not.toHaveBeenCalled();
		expect(position.current.interpolate).not.toHaveBeenCalled();
		expect(setStyle).not.toHaveBeenCalled();
	});

	it("should clean up event listener on unmount", () => {
		const addEventListenerSpy = vi.spyOn(window, "addEventListener");
		const abortSpy = vi.fn();

		const mockAbortController = {
			signal: {
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
				onabort: null,
				aborted: false,
			},
			abort: abortSpy,
		};

		const originalAbortController = window.AbortController;
		window.AbortController = vi.fn(
			() => mockAbortController,
		) as unknown as typeof AbortController;

		const { unmount } = renderHook(() => { useBackgroundTiltByGyroscope(vi.fn()) });

		// Verify event listener was added with some signal
		expect(addEventListenerSpy).toHaveBeenCalledWith(
			"deviceorientation",
			expect.any(Function),
			expect.objectContaining({ signal: expect.any(Object) as AbortSignal }),
		);

		unmount();

		expect(abortSpy).toHaveBeenCalled();

		window.AbortController = originalAbortController;
	});
});
