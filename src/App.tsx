import "./App.css";
import { Link, Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <>
      <header>
        <h1>My Test App</h1>
        <nav>
          <ul>
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={location.pathname === "/about" ? "active" : ""}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/pokemon"
                className={location.pathname === "/pokemon" ? "active" : ""}
              >
                Pokemon
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
