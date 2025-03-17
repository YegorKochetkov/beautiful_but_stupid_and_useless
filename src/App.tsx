import { About } from "./components/About";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";

const App = () => {
	return (
		<div className="relative overflow-x-hidden">
			<header>
				<Navbar />
			</header>
			<main>
				<Hero />
				<About />
			</main>
		</div>
	);
};

export default App;
