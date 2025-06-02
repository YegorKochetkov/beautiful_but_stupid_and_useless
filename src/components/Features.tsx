import { TiLocationArrow } from "react-icons/ti";

import { ParallaxCard } from "./ui/ParallaxCard";

export function Features() {
	return (
		<section className="min-w-[360px] bg-black pb-7">
			<div className="container mx-auto flex flex-col gap-7 px-5 py-32 md:px-10">
				<p className="font-circular-web text-bbsu-blue-50 text-xl md:text-2xl">
					Expensive websites with a lot of effects and animations can
					be ineffective because they take a long time to load and
					have low conversion rates.
				</p>
				<p className="max-w-[70vw] font-circular-web text-bbsu-blue-50 text-xl opacity-80 md:text-2xl">
					The ideal customer journey involves spending five seconds on
					the site and taking a specific action. However, in reality,
					the customer journey is longer and involves multiple levels
					of promotion.
				</p>
			</div>

			<div className="mx-auto mb-7 h-[38rem] xs:h-[32rem] w-11/12 sm:h-96">
				<ParallaxCard
					src="videos/feature-1.mp4"
					title="The goal of a site"
					description="...is to deliver information about the product and get the client's money. The user should understand where he got to in three to five seconds. Text on the site should be clear and answer the user's questions. It is important to combine informativeness and visual appeal. It is important to know your target audience and their needs."
					isComingSoon
				/>
			</div>

			<div className="mx-auto grid w-11/12 grid-cols-2 grid-rows-[repeat(4,auto)] gap-7">
				<div className="col-span-2 row-span-1 h-96 sm:h-[30rem] md:col-span-1 md:row-span-2">
					<ParallaxCard
						src="videos/feature-2.mp4"
						title="Social proof"
						description="Things like reviews and ratings, the ability to contact real people to confirm the quality of the product are important for credibility. Simplifying the site and adding &rdquo;social proof&ldquo; improves conversion rates."
					/>
				</div>

				<div className="col-span-2 row-span-1 h-96 sm:ms-20 sm:h-[30rem] md:col-span-1 md:row-span-2 md:ms-0 md:h-auto">
					<ParallaxCard
						src="videos/feature-3.mp4"
						title="Improving accessibility"
						description="Besides, behind all these “niceties” everyone forgets about users with disabilities. Better to spend this effort on improving accessibility (this project does not take into account users with limitations - this requires effort for which I will not be paid)."
					/>
				</div>

				<div className="col-span-2 row-span-1 h-96 sm:me-14 md:col-span-1 md:row-span-2 md:me-0">
					<ParallaxCard
						src="videos/feature-4.mp4"
						title="Success"
						description="The success of the project in a useful and functional product (service, service, etc.), and does not depend on its beauty."
					/>
				</div>

				<div className="h-56 min-w-44 md:h-auto">
					<ParallaxCard
						title="More coming soon!"
						decorativeElement={
							<TiLocationArrow className="svg-shadow -bottom-7 -right-7 absolute rotate-12 text-5xl text-bbsu-blue-50 sm:text-6xl md:text-7xl" />
						}
					/>
				</div>

				<div className="h-56 min-w-44 md:h-auto">
					<ParallaxCard src="videos/feature-5.mp4" />
				</div>
			</div>
		</section>
	);
}
