import { About } from "./components/About";
import { Features } from "./components/Features";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Story } from "./components/Story";
import { Footer } from "./components/Footer";
import { AudioIndicator } from "./components/ui/AudioIndicator";
import { Menu } from "./components/ui/Menu";
import { MobileMenu } from "./components/ui/MobileMenu";
import { NavLogo } from "./components/ui/NavLogo";

const App = () => {
	return (
		<div className="relative overflow-x-hidden">
			<header>
				<Navbar>
					<NavLogo />
					<Menu />
					<MobileMenu />
					<AudioIndicator />
				</Navbar>
			</header>
			<main>
				<Hero />
				<About />
				<Features />
				<Story />
			</main>
			<Footer />
		</div>
	);
};

export default App;
