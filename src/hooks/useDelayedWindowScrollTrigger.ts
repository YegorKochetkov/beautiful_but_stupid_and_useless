import React from "react";

export const useDelayedWindowScrollTrigger = (
	triggerShift: number,
	delay: number,
) => {
	const [scrollStopped, setScrollStopped] = React.useState<boolean>(true);

	const prevScrollY = React.useRef(0);
	const timeoutId = React.useRef<ReturnType<typeof setTimeout> | null>(null);

	React.useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const isScrollTriggered =
				currentScrollY >= prevScrollY.current + triggerShift ||
				currentScrollY < prevScrollY.current - triggerShift;

			if (isScrollTriggered) {
				setScrollStopped(false);
			}

			if (timeoutId.current) {
				clearTimeout(timeoutId.current);
			}

			const id = setTimeout(() => {
				prevScrollY.current = currentScrollY;
				setScrollStopped(true);
			}, delay);

			timeoutId.current = id;
		};

		const scrollController = new AbortController();

		window.addEventListener("scroll", handleScroll, {
			signal: scrollController.signal,
		});

		return () => {
			scrollController.abort();

			if (timeoutId.current) {
				clearTimeout(timeoutId.current);
			}
		};
	}, [triggerShift, delay]);

	return { scrollStopped };
};
