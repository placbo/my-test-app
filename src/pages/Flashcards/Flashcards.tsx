import { useState } from 'react';
import './Flashcards.css';

interface FlashcardData {
  front: string;
  back: string;
}

// Hardcoded flashcard data - you can customize this list
const flashcardData: FlashcardData[] = [
  { front: 'What is the chemical symbol for gold?', back: 'Au' },
  { front: 'What year did World War II end?', back: '1945' },
  { front: 'What is the smallest country in the world?', back: 'Vatican City' },
  { front: 'What is the speed of light?', back: '299,792,458 m/s' },
  { front: 'Who painted the Mona Lisa?', back: 'Leonardo da Vinci' },
  { front: 'What is the longest river in the world?', back: 'The Nile River' },
  { front: 'What is the square root of 64?', back: '8' },
];
const flashcardData2: FlashcardData[] = [
  { front: 'What is the capital of France?', back: 'Paris' },
  { front: 'What is 2 + 2?', back: '4' },
  { front: 'What is the largest planet in our solar system?', back: 'Jupiter' },
  { front: "Who wrote 'Romeo and Juliet'?", back: 'William Shakespeare' },
  { front: 'In which year was the first iPhone released?', back: '2007' },
  { front: 'What is the hardest natural substance?', back: 'Diamond' },
  { front: 'How many continents are there?', back: '7' },
  { front: 'What is the currency of Japan?', back: 'Yen' },
];

// Note: second set inlined below to avoid unused-variable diagnostics

type DatasetKey = 'set1' | 'set2'; //BRUKES I DROPDOWN

function Flashcards() {
  const [selectedSet, setSelectedSet] = useState<DatasetKey>('set1');
  const [currentCard, setCurrentCard] = useState<FlashcardData | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const datasets: Record<DatasetKey, FlashcardData[]> = {
    set1: flashcardData,
    set2: flashcardData2,
  };

  const getRandomCard = () => {
    setIsFlipped(false); // Reset flip state when getting new card
    const pool = datasets[selectedSet] || [];
    if (pool.length === 0) {
      setCurrentCard(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * pool.length);
    setCurrentCard(pool[randomIndex]);
  };

  const handleSetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as DatasetKey;
    setSelectedSet(value);
    setIsFlipped(false);
    setCurrentCard(null); // clear current card so user knows the set changed
  };

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  const pool = datasets[selectedSet] || [];

  return (
    <div className="flashcard-center">
      <h2>Flashcards</h2>

      {/* Selector for choosing dataset */}
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="flashcard-set-select" style={{ marginRight: 8 }}>
          Choose set:
        </label>
        <select
          id="flashcard-set-select"
          value={selectedSet}
          onChange={handleSetChange}
          className="flashcard-select"
        >
          <option value="set1">Set 1</option>
          <option value="set2">Set 2</option>
        </select>
        <span style={{ marginLeft: 12, color: '#666' }}>({pool.length} cards)</span>
      </div>

      {currentCard ? (
        <>
          <div className="flashcard-margin">
            {/* Card Container with 3D perspective */}
            <div className="flashcard-card-perspective" onClick={handleCardClick}>
              {/* Card with flip animation */}
              <div className={`flashcard-card${isFlipped ? ' flipped' : ''}`}>
                {/* Front of card (Question) */}
                <div className="flashcard-card-front">
                  <div className="flashcard-card-front-title">{currentCard.front}</div>
                  <div className="flashcard-card-front-hint">Click to reveal answer!</div>
                </div>
                {/* Back of card (Answer) */}
                <div className="flashcard-card-back">
                  <div className="flashcard-card-back-title">{currentCard.back}</div>
                  <div className="flashcard-card-back-hint">Click to see question again!</div>
                </div>
              </div>
            </div>
          </div>

          <button onClick={getRandomCard} className="flashcard-btn">
            Get New Flashcard
          </button>
        </>
      ) : (
        <div className="flashcard-center">
          {pool.length === 0 ? (
            <>
              <h3>No flashcards in selected set</h3>
              <p style={{ color: '#666' }}>Please choose another set.</p>
            </>
          ) : (
            <>
              <h2>No flashcard selected</h2>
              <button onClick={getRandomCard} className="flashcard-btn">
                Get Random Flashcard
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Flashcards;
