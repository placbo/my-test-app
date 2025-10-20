import TilesGrid from './TilesGrid';
import type { TileData } from './TilesGrid';
import './HomePage.css';

const tiles: TileData[] = [
  {
    to: '/guestbook',
    image: 'https://img.icons8.com/ios-filled/100/ffffff/book.png', // white book icon
    title: 'Guestbook',
    description: 'Leave a message and see what others have written.'
  },
  {
    to: '/pokemon',
    image: 'https://img.icons8.com/ios-filled/100/ffffff/pokemon.png', // white pokemon icon
    title: 'Pokemon',
    description: 'Pokemon flashcards.'
  },
  {
    to: '/flashcards',
    image: 'https://img.icons8.com/ios-filled/100/ffffff/flashcards.png', // flashcard/study card icon
    title: 'Flashcards',
    description: 'Generic flashcards.'
  },
  {
    to: '/about',
    image: 'https://img.icons8.com/ios-filled/100/ffffff/info.png', // white info icon
    title: 'About',
    description: 'Learn more about this app and its creator.'
  },
  {
    to: 'http://mytaste.kasselars.com',
    image: 'https://img.icons8.com/ios-filled/100/ffffff/restaurant.png', // white restaurant icon
    title: 'MyTaste',
    description: 'Ranking food and drinks.'
  }
];

export default function HomePage() {
  return (
    <div className="HomePage">
      <h1 className="homepage-title">MyApp</h1>
      <TilesGrid tiles={tiles} />
      <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: '#666' }}>
        <a href="https://icons8.com" target="_blank" rel="noopener noreferrer">
          Icons by Icons8
        </a>
      </div>
    </div>
  );
}
