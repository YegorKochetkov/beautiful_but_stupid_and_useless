import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { AnimatedTitle } from "./ui/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

export function About() {
	useGSAP(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: "#clip-image",
				start: "center center",
				end: "bottom center",
				scrub: 0.5,
				pin: true,
				pinSpacing: true,
			},
		});

		tl.to(".mask-clip-path", {
			width: "100vw",
			height: "100vh",
			borderRadius: 0,
		});

		return () => {
			tl.kill();
		};
	}, []);

	return (
		<div id="about" className="w-screen min-h-screen bg-bbsu-blue-75">
			<div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
				<h2 className="text-xl uppercase md:text-3xl text-center">
					Почему &rdquo;красивые&ldquo; сайты на самом деле <b>не</b> продают?
				</h2>

				<AnimatedTitle />

				<div className="absolute -bottom-[80dvh] w-full max-w-96 text-center font-circular-web text-xl md:max-w-[34rem] md:text-2xl">
					<p>
						Практика показывает, что красивые дизайнерские решения не всегда
						приносят больше продаж, чем просто удобные, быстрые и функциональные.
					</p>

					{/* <p className="text-gray-500">
						Дорогие сайты кучей эффектов и анимаций могут быть неэффективными
						из-за долгой загрузки и низкой конверсии. Идеальный путь клиента: пять
						секунд на сайте и целевое действие. Реальный путь клиента более
						длинный, c несколькими уровнями прогрева.
					</p>
					<p>
						Цель сайта - донести информацию o продукте и получить деньги клиента.
						Пользователь должен понимать, куда он попал, за три-пять секунд. Текст
						на сайте должен быть понятным и отвечать на вопросы пользователя.
						Важно сочетать информативность и визуальную привлекательность. Важно
						знать свою целевую аудиторию и их потребности.
					</p>
					<h2>Социальные доказательства </h2>
					<p>
						Такие вещи как отзывы и рейтинги, возможность связаться c реальными
						людьми для подтверждения качества продукта важны для доверия.
						Упрощение сайта и добавление &rdquo;социальных доказательств&ldquo;
						улучшает конверсию.
					</p> */}
				</div>
			</div>

			<div id="clip-image" className="h-dvh w-screen">
				<div className="mask-clip-path absolute left-1/2 top-0 z-20 h-[60vh] w-96 origin-center -translate-x-1/2 overflow-hidden rounded-3xl md:w-[30vw];">
					<img
						src="img/about.webp"
						alt="Background"
						className="absolute left-0 top-0 size-full object-cover"
					/>
				</div>
			</div>
		</div>
	);
}
