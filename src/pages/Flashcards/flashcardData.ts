export interface FlashcardData {
  front: string;
  back: string;
}

export interface FlashcardSetInfo {
  key: string;
  displayName: string;
  data: FlashcardData[];
}

// Fix: this should be a function returning FlashcardData[] (and the name was misspelled)
const generatedCountryCapitalsFlashcards = (): FlashcardData[] => {
  return [{ front: 'What is the capital of Norway?', back: 'Oslo' }];
};

// All flashcard sets in one place - easy to add new ones
export const FLASHCARD_SETS: FlashcardSetInfo[] = [
  {
    key: 'general_knowledge',
    displayName: 'General Knowledge',
    data: [
      { front: 'What is the chemical symbol for gold?', back: 'Au' },
      { front: 'What year did World War II end?', back: '1945' },
      { front: 'What is the smallest country in the world?', back: 'Vatican City' },
      { front: 'What is the speed of light?', back: '299,792,458 m/s' },
      { front: 'Who painted the Mona Lisa?', back: 'Leonardo da Vinci' },
      { front: 'What is the longest river in the world?', back: 'The Nile River' },
      { front: 'What is the square root of 64?', back: '8' }
    ]
  },
  {
    key: 'basic_facts',
    displayName: 'Basic Facts',
    data: [
      { front: 'What is the capital of France?', back: 'Paris' },
      { front: 'What is 2 + 2?', back: '4' },
      { front: 'What is the largest planet in our solar system?', back: 'Jupiter' },
      { front: "Who wrote 'Romeo and Juliet'?", back: 'William Shakespeare' },
      { front: 'In which year was the first iPhone released?', back: '2007' },
      { front: 'What is the hardest natural substance?', back: 'Diamond' },
      { front: 'How many continents are there?', back: '7' },
      { front: 'What is the currency of Japan?', back: 'Yen' }
    ]
  },

  {
    key: 'country_capitals',
    displayName: 'Country Capitals',
    data: generatedCountryCapitalsFlashcards()
  }
];
