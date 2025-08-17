import TilesGrid from "../components/TilesGrid";
import type { TileData } from "../components/TilesGrid";
import "./HomePage.css";

const tiles: TileData[] = [
	{
		to: "/guestbook",
		image: "https://img.icons8.com/ios-filled/100/ffffff/book.png", // white book icon
		title: "Guestbook",
		description: "Leave a message and see what others have written.",
	},
	{
		to: "/pokemon",
		image: "https://img.icons8.com/ios-filled/100/ffffff/pokemon.png", // white pokemon icon
		title: "Pokemon",
		description: "Pokemon flashcards.",
	},
	{
		to: "/about",
		image: "https://img.icons8.com/ios-filled/100/ffffff/info.png", // white info icon
		title: "About",
		description: "Learn more about this app and its creator.",
	},
];

export default function HomePage() {
	return (
		<div>
			<h1 className="homepage-title">MyApp</h1>
			<TilesGrid tiles={tiles} />
		</div>
	);
}
