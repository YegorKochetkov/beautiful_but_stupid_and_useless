import React from "react";

/**
 * A hook that tracks when scrolling has stopped after a specified delay.
 *
 * @param triggerShift - The number of pixels to scroll before triggering the state change
 * @param debounceTime - The delay in milliseconds before considering scrolling as stopped
 * @returns An object containing the scrollStopped state
 */
export const useDelayedWindowScrollTrigger = (
	triggerShift: number,
	debounceTime: number
) => {
	const [scrollStopped, setScrollStopped] = React.useState<boolean>(true);
	const prevScrollY = React.useRef(0);
	const timeoutId = React.useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleScroll = React.useCallback(() => {
		if (typeof window === "undefined") return;

		const currentScrollY = window.scrollY;
		const isScrollTriggered =
			Math.abs(currentScrollY - prevScrollY.current) >= triggerShift;

		if (isScrollTriggered) {
			setScrollStopped(false);
		}

		if (timeoutId.current) {
			clearTimeout(timeoutId.current);
		}

		timeoutId.current = setTimeout(() => {
			prevScrollY.current = currentScrollY;
			setScrollStopped(true);
		}, debounceTime);
	}, [triggerShift, debounceTime]);

	React.useEffect(() => {
		if (typeof window === "undefined") return;

		const scrollAbortController = new AbortController();
		const opts = { signal: scrollAbortController.signal };

		window.addEventListener("scroll", handleScroll, opts);

		return () => {
			scrollAbortController.abort();
			if (timeoutId.current) {
				clearTimeout(timeoutId.current);
			}
		};
	}, [handleScroll]);

	return { scrollStopped };
};
