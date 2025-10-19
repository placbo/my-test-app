import type { RouteObject } from 'react-router-dom';
import App from './App';
import Guestbook from './pages/Guestbook/Guestbook';
import AboutPage from './pages/AboutPage/AboutPage';
import HomePage from './pages/HomePage/HomePage';
import PokemonPage from './pages/PokemonPage/PokemonPage';
import NotFoundPage from './pages/NotFoundPage.tsx';
import Flashcards from './pages/Flashcards/Flashcards.tsx';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'guestbook',
        element: <Guestbook />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'pokemon',
        element: <PokemonPage />,
      },
      {
        path: 'flashcards',
        element: <Flashcards />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];
