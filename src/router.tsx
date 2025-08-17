import type { RouteObject } from "react-router-dom";
import App from "./App";
import Guestbook from "./pages/Guestbook.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import PokemonPage from "./pages/PokemonPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "guestbook",
        element: <Guestbook />,
      },
        {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "pokemon",
        element: <PokemonPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];
