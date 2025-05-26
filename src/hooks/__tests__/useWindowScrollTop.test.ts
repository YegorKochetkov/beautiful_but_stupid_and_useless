import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useWindowScrollTop } from "../useWindowScrollTop";

describe("useWindowScrollTop", () => {
	const triggerShift = 100;

	beforeEach(() => {
		// Mock window.scrollY to control its value during tests
		Object.defineProperty(window, "scrollY", {
			writable: true,
			configurable: true,
			value: 0,
		});
		// Reset scrollY before each test
		window.scrollY = 0;
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should initialize with scrolledFromTop as false", () => {
		const { result } = renderHook(() => useWindowScrollTop(triggerShift));
		expect(result.current.scrolledFromTop).toBe(false);
	});

	it("should set scrolledFromTop to true when window.scrollY is greater than triggerShift", () => {
		const { result } = renderHook(() => useWindowScrollTop(triggerShift));

		// Simulate scrolling down past the triggerShift
		act(() => {
			window.scrollY = triggerShift + 50;
			window.dispatchEvent(new Event("scroll"));
		});

		expect(result.current.scrolledFromTop).toBe(true);
	});

	it("should set scrolledFromTop to false when window.scrollY is less than triggerShift", () => {
		const { result } = renderHook(() => useWindowScrollTop(triggerShift));

		// First, scroll down to set scrolledFromTop to true
		act(() => {
			window.scrollY = triggerShift + 50;
			window.dispatchEvent(new Event("scroll"));
		});
		expect(result.current.scrolledFromTop).toBe(true);

		// Then, simulate scrolling up above the triggerShift
		act(() => {
			window.scrollY = triggerShift - 50;
			window.dispatchEvent(new Event("scroll"));
		});

		expect(result.current.scrolledFromTop).toBe(false);
	});

	it("should keep scrolledFromTop as false when window.scrollY is equal to triggerShift", () => {
		const { result } = renderHook(() => useWindowScrollTop(triggerShift));

		act(() => {
			window.scrollY = triggerShift;
			window.dispatchEvent(new Event("scroll"));
		});

		expect(result.current.scrolledFromTop).toBe(false);
	});

	it("should update scrolledFromTop correctly on multiple scroll events", () => {
		const { result } = renderHook(() => useWindowScrollTop(triggerShift));

		// Scroll below triggerShift
		act(() => {
			window.scrollY = triggerShift - 10;
			window.dispatchEvent(new Event("scroll"));
		});
		expect(result.current.scrolledFromTop).toBe(false);

		// Scroll above triggerShift
		act(() => {
			window.scrollY = triggerShift + 10;
			window.dispatchEvent(new Event("scroll"));
		});
		expect(result.current.scrolledFromTop).toBe(true);

		// Scroll back below triggerShift
		act(() => {
			window.scrollY = triggerShift - 20;
			window.dispatchEvent(new Event("scroll"));
		});
		expect(result.current.scrolledFromTop).toBe(false);
	});

	it("should clean up event listener on unmount", () => {
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

		// Store original AbortController and mock it
		const originalAbortController = window.AbortController;
		window.AbortController = vi.fn(
			() => mockAbortController,
		) as unknown as typeof AbortController;

		const { unmount } = renderHook(() => useWindowScrollTop(triggerShift));

		// Simulate a scroll event to ensure the listener is active
		act(() => {
			window.scrollY = triggerShift + 10;
			window.dispatchEvent(new Event("scroll"));
		});

		unmount();

		expect(abortSpy).toHaveBeenCalledTimes(1);

		// Restore original AbortController
		window.AbortController = originalAbortController;
	});

	it("should use the new triggerShift value if it changes", () => {
		let currentTriggerShift = 50;
		const { result, rerender } = renderHook(() =>
			useWindowScrollTop(currentTriggerShift),
		);

		// Initial state with triggerShift = 50
		act(() => {
			window.scrollY = 60; // Above 50
			window.dispatchEvent(new Event("scroll"));
		});
		expect(result.current.scrolledFromTop).toBe(true);

		act(() => {
			window.scrollY = 40; // Below 50
			window.dispatchEvent(new Event("scroll"));
		});
		expect(result.current.scrolledFromTop).toBe(false);

		// Change triggerShift to 100
		currentTriggerShift = 100;
		rerender();

		// window.scrollY is still 40, which is below the new triggerShift of 100
		// The state should remain false without a new scroll event,
		// but the next scroll event should use the new triggerShift.
		act(() => {
			window.dispatchEvent(new Event("scroll")); // Re-evaluate with new triggerShift
		});
		expect(result.current.scrolledFromTop).toBe(false);

		act(() => {
			window.scrollY = 110; // Above new triggerShift of 100
			window.dispatchEvent(new Event("scroll"));
		});
		expect(result.current.scrolledFromTop).toBe(true);

		act(() => {
			window.scrollY = 90; // Below new triggerShift of 100
			window.dispatchEvent(new Event("scroll"));
		});
		expect(result.current.scrolledFromTop).toBe(false);
	});
});
