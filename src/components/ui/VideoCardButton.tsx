import { TiLocationArrow } from "react-icons/ti";

import { Button } from "./Button";
import { cn } from "../../lib/utils";

export function VideoCardButton() {
  return (
    <Button
      rightIcon={<TiLocationArrow />}
      className={cn("button", "video-card-button")}
    >
      Coming soon...
    </Button>
  );
}
