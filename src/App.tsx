import './App.css';
import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <header>
        <Link to="/">
          <h1>Home</h1>
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
