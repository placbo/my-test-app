import countries from './all_countries.json';

export interface FlashcardData {
  front: string;
  back: string;
}

export interface FlashcardSetInfo {
  key: string;
  displayName: string;
  data: FlashcardData[];
}

const generatedCountryCapitalsFlashcards = (): FlashcardData[] => {
  // Some entries may be missing a capital or have an empty array -> filter those out
  return (
    (countries as any[])
      .map((country) => {
        const commonName = country?.name?.common;
        // If there are multiple capitals, join them with a comma and space
        const capital =
          Array.isArray(country?.capital) && country.capital.length > 0 ? country.capital.join(', ') : undefined;
        if (!commonName || !capital) return null;
        return { front: commonName, back: capital } as FlashcardData;
      })
      // filter out null/undefined and tell TypeScript the result is FlashcardData[]
      .filter((flashcardData): flashcardData is FlashcardData => flashcardData != null)
  );
};

// All flashcard sets in one place - easy to add new ones
export const FLASHCARD_SETS: FlashcardSetInfo[] = [
  {
    key: 'country_capitals',
    displayName: 'Country Capitals',
    data: generatedCountryCapitalsFlashcards()
  },
  {
    key: 'general_knowledge',
    displayName: 'Diverse AI-genererte spørsmål',
    data: [
      { front: 'What is the chemical symbol for gold?', back: 'Au' },
      { front: 'What year did World War II end?', back: '1945' },
      { front: 'What is the smallest country in the world?', back: 'Vatican City' },
      { front: 'What is the speed of light?', back: '299,792,458 m/s' },
      { front: 'Who painted the Mona Lisa?', back: 'Leonardo da Vinci' },
      { front: 'What is the longest river in the world?', back: 'The Nile River' },
      { front: 'What is the square root of 64?', back: '8' },
      { front: 'What is the capital of France?', back: 'Paris' },
      { front: 'What is 2 + 2?', back: '4' },
      { front: 'What is the largest planet in our solar system?', back: 'Jupiter' },
      { front: "Who wrote 'Romeo and Juliet'?", back: 'William Shakespeare' },
      { front: 'In which year was the first iPhone released?', back: '2007' },
      { front: 'What is the hardest natural substance?', back: 'Diamond' },
      { front: 'How many continents are there?', back: '7' },
      { front: 'What is the currency of Japan?', back: 'Yen' }
    ]
  }
];
