import React from "react";
import { cn } from "../../lib/utils";

export function AudioIndicator() {
  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = React.useState(false);

  const audioElementRef = React.useRef<HTMLAudioElement>(null);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying(!isAudioPlaying);
    setIsIndicatorActive(!isIndicatorActive);
  };

  React.useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current?.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  return (
    <button
      type="button"
      onClick={toggleAudioIndicator}
      className="flex space-x-0.5"
      title="Toggle music"
      aria-label="Toggle music"
    >
      <audio
        ref={audioElementRef}
        className="hidden"
        src="/audio/loop.mp3"
        loop
      >
        <track kind="captions" src="/audio/loop.vtt" srcLang="en" />
      </audio>
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={cn("music-indicator-line", {
            active: isIndicatorActive,
          })}
          style={{ "--animation-order": bar } as React.CSSProperties}
        />
      ))}
    </button>
  );
}
