import React from "react";

export const useWindowScrollTop = (triggerShift: number) => {
	const [scrolledFromTop, setScrolledFromTop] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > triggerShift;
			setScrolledFromTop(isScrolled);
		};

		const scrollAbortController = new AbortController();

		window.addEventListener("scroll", handleScroll, {
			signal: scrollAbortController.signal,
		});

		return () => {
			scrollAbortController.abort();
		};
	}, [triggerShift]);

	return { scrolledFromTop };
};
