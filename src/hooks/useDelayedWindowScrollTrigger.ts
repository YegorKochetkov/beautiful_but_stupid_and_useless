import React from "react";

export const useDelayedWindowScrollTrigger = (
	triggerShift: number,
	delay: number,
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
		}, delay);
	}, [triggerShift, delay]);

	React.useEffect(() => {
		if (typeof window === "undefined") return;

		const scrollAbortController = new AbortController();
		const opts = { signal: scrollAbortController.signal, passive: true };

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
