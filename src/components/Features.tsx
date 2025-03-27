import { TiLocationArrow } from "react-icons/ti";

import { ParallaxCard } from "./ui/ParallaxCard";

export function Features() {
	return (
		<section className="bg-black pb-7">
			<div className="container flex flex-col gap-7 mx-auto px-5 py-32 md:px-10">
				<p className="text-bbsu-blue-50 text-xl md:text-2xl font-circular-web">
					Expensive websites with a lot of effects and animations can be
					ineffective because they take a long time to load and have low
					conversion rates.
				</p>
				<p className="max-w-[70vw]  text-bbsu-blue-50 opacity-80 text-xl md:text-2xl font-circular-web">
					The ideal customer journey involves spending five seconds on the site
					and taking a specific action. However, in reality, the customer journey
					is longer and involves multiple levels of promotion.
				</p>
			</div>

			<div className="mb-7 h-96 md:h-[65vh] w-11/12 mx-auto">
				<ParallaxCard
					src="videos/feature-1.mp4"
					title="VideoCard"
					description="A cross bla bla bla lorem ipsum dolor sit amet consectetur adipisicing elit."
					isComingSoon
				/>
			</div>

			<div className="grid grid-cols-2 grid-rows-4 gap-7 h-[130vh] w-11/12 mx-auto">
				<div className="col-span-2 row-span-1 md:row-span-2 md:col-span-1">
					<ParallaxCard
						src="videos/feature-2.mp4"
						title="VideoCard 2"
						description="A cross bla bla bla lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
					/>
				</div>

				<div className="col-span-2 row-span-1 md:row-span-2 md:col-span-1 ms-32 md:ms-0">
					<ParallaxCard
						src="videos/feature-3.mp4"
						title="VideoCard 3"
						description="A cross bla bla bla lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
					/>
				</div>

				<div className="col-span-2 row-span-1 md:row-span-2 md:col-span-1 me-14 md:me-0">
					<ParallaxCard
						src="videos/feature-4.mp4"
						title="VideoCard 4"
						description="A cross bla bla bla lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
					/>
				</div>

				<div className="h-48 md:h-auto">
					<ParallaxCard
						title="More coming soon!"
						decorativeElement={
							<TiLocationArrow className="absolute -right-7 -bottom-7 md:text-9xl text-7xl text-bbsu-blue-50 svg-shadow rotate-12" />
						}
					/>
				</div>

				<div className="h-48 md:h-auto">
					<ParallaxCard src="videos/feature-5.mp4" />
				</div>
			</div>
		</section>
	);
}
