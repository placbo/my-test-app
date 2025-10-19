import { useState } from 'react';
import './Flashcards.css';
import { FLASHCARD_SETS, FLASHCARD_SET } from './flashcardData';
import type { FlashcardData, FlashcardSet } from './flashcardData';

function Flashcards() {
  const [selectedSet, setSelectedSet] = useState<FlashcardSet>(FLASHCARD_SET.GENERAL_KNOWLEDGE);
  const [currentCard, setCurrentCard] = useState<FlashcardData | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const getCurrentSetInfo = () => {
    return FLASHCARD_SETS.find((set) => set.key === selectedSet) || FLASHCARD_SETS[0];
  };

  const getRandomCard = () => {
    setIsFlipped(false); // Reset flip state when getting new card
    const currentSetInfo = getCurrentSetInfo();
    const pool = currentSetInfo.data;
    if (pool.length === 0) {
      setCurrentCard(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * pool.length);
    setCurrentCard(pool[randomIndex]);
  };

  const handleSetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as FlashcardSet;
    setSelectedSet(value);
    setIsFlipped(false);
    setCurrentCard(null); // clear current card so user knows the set changed
  };

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Trigger flip on Enter or Space for keyboard users
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  const currentSetInfo = getCurrentSetInfo();

  return (
    <div className="flashcard-center">
      <h2>Flashcards</h2>

      {/* Selector for choosing dataset */}
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="flashcard-set-select" style={{ marginRight: 8 }}>
          Choose set:
        </label>
        <select id="flashcard-set-select" value={selectedSet} onChange={handleSetChange} className="flashcard-select">
          {FLASHCARD_SETS.map((set) => (
            <option key={set.key} value={set.key}>
              {set.displayName}
            </option>
          ))}
        </select>
        <span style={{ marginLeft: 12, color: '#666' }}>({currentSetInfo.data.length} cards)</span>
      </div>

      {currentCard ? (
        <>
          <div className="flashcard-margin">
            {/* Card Container with 3D perspective */}
            <div
              className="flashcard-card-perspective"
              onClick={handleCardClick}
              role="button"
              tabIndex={0}
              onKeyDown={handleCardKeyDown}
              aria-pressed={isFlipped}
            >
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
          {currentSetInfo.data.length === 0 ? (
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
