import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useWindowScrollTop } from "../useWindowScrollTop";

describe("useWindowScrollTop", () => {
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

	it("should initialize with scrolledFromTop as false", () => {
		const { result } = renderHook(() => useWindowScrollTop(10));
		expect(result.current.scrolledFromTop).toBe(false);
	});

	it("should set scrolledFromTop to true when scroll is greater than triggerShift", () => {
		const { result } = renderHook(() => useWindowScrollTop(10));

		window.scrollY = 20;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		// Advance time to account for debounce
		act(() => {
			vi.advanceTimersByTime(50);
		});

		expect(result.current.scrolledFromTop).toBe(true);
	});

	it("should set scrolledFromTop to false when scroll is less than or equal to triggerShift", () => {
		const { result } = renderHook(() => useWindowScrollTop(10));

		// First scroll beyond the trigger point
		window.scrollY = 20;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		// Advance time to account for debounce
		act(() => {
			vi.advanceTimersByTime(50);
		});

		expect(result.current.scrolledFromTop).toBe(true);

		// Then scroll back to a position less than the trigger
		window.scrollY = 5;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		// Advance time to account for debounce
		act(() => {
			vi.advanceTimersByTime(50);
		});

		expect(result.current.scrolledFromTop).toBe(false);
	});

	it("should respect the debounce time", () => {
		const debounceTime = 100;
		const { result } = renderHook(() => useWindowScrollTop(10, debounceTime));

		window.scrollY = 20;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		// Advance time but not enough to trigger the debounced update
		act(() => {
			vi.advanceTimersByTime(50);
		});

		// State should not have changed yet
		expect(result.current.scrolledFromTop).toBe(false);

		// Advance time to complete the debounce
		act(() => {
			vi.advanceTimersByTime(50);
		});

		// Now the state should be updated
		expect(result.current.scrolledFromTop).toBe(true);
	});

	it("should reset debounce timer on multiple scroll events", () => {
		const debounceTime = 100;
		const { result } = renderHook(() => useWindowScrollTop(10, debounceTime));

		window.scrollY = 20;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		// Advance time but not enough to trigger the debounced update
		act(() => {
			vi.advanceTimersByTime(50);
		});

		// Trigger another scroll event
		window.scrollY = 30;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		// Advance time to what would have been the first timeout
		act(() => {
			vi.advanceTimersByTime(50);
		});

		// State should still not have changed because the timer was reset
		expect(result.current.scrolledFromTop).toBe(false);

		// Advance time to complete the second debounce
		act(() => {
			vi.advanceTimersByTime(50);
		});

		// Now the state should be updated
		expect(result.current.scrolledFromTop).toBe(true);
	});

	it("should update immediately when debounceTime is 0", () => {
		const { result } = renderHook(() => useWindowScrollTop(10, 0));

		window.scrollY = 20;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		// No need to advance timers, should update immediately
		expect(result.current.scrolledFromTop).toBe(true);
	});

	it("should update when triggerShift changes", () => {
		const { result, rerender } = renderHook(
			(props) => useWindowScrollTop(props.triggerShift, props.debounceTime),
			{
				initialProps: { triggerShift: 10, debounceTime: 50 },
			},
		);

		window.scrollY = 15;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		act(() => {
			vi.advanceTimersByTime(50);
		});

		expect(result.current.scrolledFromTop).toBe(true);

		// Update the triggerShift to a value greater than current scroll
		rerender({ triggerShift: 20, debounceTime: 50 });

		// Dispatch scroll event to trigger the effect with new triggerShift
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		act(() => {
			vi.advanceTimersByTime(50);
		});

		expect(result.current.scrolledFromTop).toBe(false);
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

		const { unmount } = renderHook(() => useWindowScrollTop(10));

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