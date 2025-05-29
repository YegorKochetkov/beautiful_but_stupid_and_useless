import React from "react";

export const useWindowScrollTop = (triggerShift: number) => {
	const [scrolledFromTop, setScrolledFromTop] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > triggerShift;
			setScrolledFromTop(isScrolled);
		};

		const scrollAbortController = new AbortController();
		const opts = { signal: scrollAbortController.signal, passive: true };

		window.addEventListener("scroll", handleScroll, opts);

		return () => {
			scrollAbortController.abort();
		};
	}, [triggerShift]);

	return { scrolledFromTop };
};
