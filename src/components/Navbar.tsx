import React from "react";

import { useWindowScrollTop } from "../hooks/useWindowScrollTop";
import { useDelayedWindowScrollTrigger } from "../hooks/useDelayedWindowScrollTrigger";
import { cn } from "../lib/utils";

export function Navbar({ children }: { children: React.ReactNode }) {
  const [isNavbarHovered, setIsNavbarHovered] = React.useState(false);

  const { scrollStopped } = useDelayedWindowScrollTrigger(40, 4000);
  const { scrolledFromTop } = useWindowScrollTop(40);

  const navContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      id="navbar"
      ref={navContainerRef}
      className={cn(
        "fixed inset-x-2 top-4 z-[100] h-16 rounded-lg border-none transition-all duration-700 sm:inset-x-6",
        {
          "navbar-background": scrolledFromTop,
          "-translate-y-full opacity-0":
            scrolledFromTop && scrollStopped && !isNavbarHovered,
        },
      )}
      onMouseEnter={() => setIsNavbarHovered(true)}
      onMouseLeave={() => setIsNavbarHovered(false)}
    >
      <nav className="flex size-full items-center gap-4 px-4 lg:gap-8 [&>a]:mr-auto [&>a]:lg:mr-8">
        {children}
      </nav>
    </div>
  );
}
