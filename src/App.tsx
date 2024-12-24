import { Hero } from "./components/Hero";

const App = () => {
	return (
		<main className="relative w-screen min-h-screen overflow-x-hidden">
			<Hero />
			<section className="w-screen min-h-screen bg-bbsu-blue-75" />
		</main>
	);
};

export default App;
