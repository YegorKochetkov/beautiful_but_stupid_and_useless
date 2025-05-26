import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDelayedWindowScrollTrigger } from "../useDelayedWindowScrollTrigger";

describe("useDelayedWindowScrollTrigger", () => {
	const originalScrollYDescriptor = Object.getOwnPropertyDescriptor(
		window,
		"scrollY",
	);

	beforeEach(() => {
		vi.useFakeTimers();
		Object.defineProperty(window, "scrollY", {
			writable: true,
			value: 0,
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.useRealTimers();
		if (originalScrollYDescriptor) {
			Object.defineProperty(window, "scrollY", originalScrollYDescriptor);
		}
	});

	it("should initialize with scrollStopped as true", () => {
		const { result } = renderHook(() =>
			useDelayedWindowScrollTrigger(10, 200),
		);
		expect(result.current.scrollStopped).toBe(true);
	});

	it("should set scrollStopped to false when scroll is triggered", () => {
		const { result } = renderHook(() =>
			useDelayedWindowScrollTrigger(10, 200),
		);

		window.scrollY = 20;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		expect(result.current.scrollStopped).toBe(false);
	});

	it("should not set scrollStopped to false when scroll is less than triggerShift", () => {
		const { result } = renderHook(() =>
			useDelayedWindowScrollTrigger(10, 200),
		);

		window.scrollY = 5;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		expect(result.current.scrollStopped).toBe(true);
	});

	it("should set scrollStopped back to true after delay", () => {
		const { result } = renderHook(() =>
			useDelayedWindowScrollTrigger(10, 200),
		);

		window.scrollY = 20;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		expect(result.current.scrollStopped).toBe(false);

		act(() => {
			vi.advanceTimersByTime(200);
		});

		expect(result.current.scrollStopped).toBe(true);
	});

	it("should reset timeout on multiple scroll events", () => {
		const { result } = renderHook(() =>
			useDelayedWindowScrollTrigger(10, 200),
		);

		window.scrollY = 20;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		// Advance time but not enough to trigger timeout
		act(() => {
			vi.advanceTimersByTime(100);
		});

		window.scrollY = 40;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		// Advance time to what would have been the first timeout
		act(() => {
			vi.advanceTimersByTime(100);
		});

		// Should still be false because the second scroll reset the timer
		expect(result.current.scrollStopped).toBe(false);

		// Advance time to complete the second timeout
		act(() => {
			vi.advanceTimersByTime(100);
		});

		// Now it should be true
		expect(result.current.scrollStopped).toBe(true);
	});

	it("should clean up event listener and timeout on unmount", () => {
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

		const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");

		const { unmount } = renderHook(() =>
			useDelayedWindowScrollTrigger(10, 200),
		);

		window.scrollY = 20;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		unmount();

		expect(abortSpy).toHaveBeenCalled();

		expect(clearTimeoutSpy).toHaveBeenCalled();

		window.AbortController = originalAbortController;
	});
});
