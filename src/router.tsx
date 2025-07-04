import type { RouteObject } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Pokemon from "./pages/Pokemon";
import NotFound from "./pages/NotFound";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "pokemon",
        element: <Pokemon />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
