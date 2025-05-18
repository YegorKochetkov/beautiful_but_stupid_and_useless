import { AnimatedText } from "./ui/AnimatedText";

export function Story() {
	return (
		<section
			id="story"
			className=" min-h-dvh w-screen bg-bbsu-black-700 text-bbsu-blue-50"
		>
			<div className="flex size-full flex-col items-center py-10 pb-24">
				<p className="text-sm uppercase md:text-base">
				Minimal site accessibility is not a difficult...
				</p>
				<div className="relative size-full">
					<AnimatedText
						text="But a really accessible website is a lot of hard work"
						containerClass="container mx-auto mt-5 font-black uppercase text-3xl md:text-4xl xl:text-5xl flex gap-3 px-4 mix-blend-difference"
						textClass="flex gap-3 justify-center special-font"
					/>
				</div>
			</div>
		</section>
	);
}
