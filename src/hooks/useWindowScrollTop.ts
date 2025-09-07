import React from "react";

/**
 * A hook that tracks whether the window has been scrolled beyond a specified threshold.
 *
 * @param triggerShift - The number of pixels to scroll before triggering the state change
 * @param debounceTime - Optional debounce time in milliseconds (default: 50)
 * @returns An object containing the scrolledFromTop state
 */
export const useWindowScrollTop = (triggerShift: number, debounceTime = 50) => {
	const [scrolledFromTop, setScrolledFromTop] = React.useState(false);
	const timeoutRef = React.useRef<number | null>(null);

	const handleScroll = () => {
		if (debounceTime > 0) {
			if (timeoutRef.current) {
				window.clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = window.setTimeout(() => {
				const isScrolled = window.scrollY > triggerShift;
				setScrolledFromTop(isScrolled);
			}, debounceTime);
		} else {
			const isScrolled = window.scrollY > triggerShift;
			setScrolledFromTop(isScrolled);
		}
	};

	React.useEffect(() => {
		const scrollAbortController = new AbortController();
		const opts = { signal: scrollAbortController.signal };

		window.addEventListener("scroll", handleScroll, opts);

		return () => {
			if (timeoutRef.current) {
				window.clearTimeout(timeoutRef.current);
			}
			scrollAbortController.abort();
		};
	}, [triggerShift, debounceTime]);

	return { scrolledFromTop };
};
