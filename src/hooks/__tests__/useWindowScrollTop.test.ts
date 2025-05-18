import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useWindowScrollTop } from "../useWindowScrollTop";

describe("useWindowScrollTop", () => {
	beforeEach(() => {
		Object.defineProperty(window, "scrollY", {
			writable: true,
			value: 0,
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should initialize with scrolledFromTop as false", () => {
		const { result } = renderHook(() => useWindowScrollTop(100));
		expect(result.current.scrolledFromTop).toBe(false);
	});

	it("should set scrolledFromTop to true when scrolled beyond triggerShift", () => {
		const { result } = renderHook(() => useWindowScrollTop(100));

		window.scrollY = 150;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		expect(result.current.scrolledFromTop).toBe(true);
	});

	it("should set scrolledFromTop to false when scrolled less than triggerShift", () => {
		const { result } = renderHook(() => useWindowScrollTop(100));

		// First scroll beyond triggerShift
		window.scrollY = 150;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		expect(result.current.scrolledFromTop).toBe(true);

		window.scrollY = 50;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		expect(result.current.scrolledFromTop).toBe(false);
	});

	it("should update when triggerShift prop changes", () => {
		const { result, rerender } = renderHook(
			(props) => useWindowScrollTop(props.triggerShift),
			{ initialProps: { triggerShift: 100 } },
		);

		window.scrollY = 80;
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		expect(result.current.scrolledFromTop).toBe(false);

		rerender({ triggerShift: 50 });

		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});

		expect(result.current.scrolledFromTop).toBe(true);
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

		const { unmount } = renderHook(() => useWindowScrollTop(100));

		expect(addEventListenerSpy).toHaveBeenCalledWith(
			"scroll",
			expect.any(Function),
			expect.objectContaining({ signal: expect.any(Object) as AbortSignal }),
		);

		unmount();

		expect(abortSpy).toHaveBeenCalled();

		window.AbortController = originalAbortController;
	});
});
