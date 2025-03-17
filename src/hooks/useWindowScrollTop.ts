import React from "react";

export const useWindowScrollTop = (triggerShift: number) => {
	const [scrolledFromTop, setScrolledFromTop] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > triggerShift;
			setScrolledFromTop(isScrolled);
		};

		const scrollController = new AbortController();

		window.addEventListener("scroll", handleScroll, {
			signal: scrollController.signal,
		});
		return () => {
			scrollController.abort();
		};
	}, [triggerShift]);

	return { scrolledFromTop };
};
