import { TiLocationArrow } from "react-icons/ti";

import { ParallaxCard } from "./ui/ParallaxCard";

export function Features() {
	return (
		<section className="min-w-[360px] bg-black pb-7">
			<div className="container mx-auto flex flex-col gap-7 px-5 py-32 md:px-10">
				<p className="font-circular-web text-bbsu-blue-50 text-xl md:text-2xl">
					Expensive websites with a lot of effects and animations can be
					ineffective because they take a long time to load and have low
					conversion rates.
				</p>
				<p className="max-w-[70vw] font-circular-web text-bbsu-blue-50 text-xl opacity-80 md:text-2xl">
					The ideal customer journey involves spending five seconds on the site
					and taking a specific action. However, in reality, the customer
					journey is longer and involves multiple levels of promotion.
				</p>
			</div>

			<div className="mx-auto mb-7 h-96 w-11/12">
				<ParallaxCard
					src="videos/feature-1.mp4"
					title="VideoCard"
					description="A cross bla bla bla lorem ipsum dolor sit amet consectetur adipisicing elit."
					isComingSoon
				/>
			</div>

			<div className="mx-auto grid w-11/12 grid-cols-2 grid-rows-[repeat(4,auto)] gap-7">
				<div className="col-span-2 row-span-1 h-96 md:col-span-1 md:row-span-2">
					<ParallaxCard
						src="videos/feature-2.mp4"
						title="VideoCard 2"
						description="A cross bla bla bla lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
					/>
				</div>

				<div className="col-span-2 row-span-1 h-96 sm:ms-20 md:col-span-1 md:row-span-2 md:ms-0 md:h-auto">
					<ParallaxCard
						src="videos/feature-3.mp4"
						title="VideoCard 3"
						description="A cross bla bla bla lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
					/>
				</div>

				<div className="col-span-2 row-span-1 h-96 sm:me-14 md:col-span-1 md:row-span-2 md:me-0">
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
							<TiLocationArrow className="svg-shadow -bottom-7 -right-7 absolute rotate-12 text-5xl text-bbsu-blue-50 sm:text-6xl md:text-7xl" />
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
