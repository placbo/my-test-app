import { useState, useEffect } from "react";
import axios from "axios";
import "./PokemonPage.css";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

function PokemonPage() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [totalPokemons, setTotalPokemons] = useState<number | null>(null);

  useEffect(() => {
    // Fetch total number of Pokemons on mount
    const fetchTotalPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100000"
        );
        setTotalPokemons(response.data.count);
      } catch (err) {
        setTotalPokemons(1000); // fallback if API fails
      }
    };
    fetchTotalPokemons();
  }, []);

  const fetchRandomPokemon = async () => {
    setLoading(true);
    setError(null);
    setImageLoading(true);
    setIsFlipped(false); // Reset flip state when getting new Pokemon

    const maxNumber = totalPokemons || 1000;
    let attempts = 0;
    let found = false;
    let data = null;

    while (attempts < 3 && !found) {
      try {
        const randomId = Math.floor(Math.random() * maxNumber) + 1;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        if (response.status === 404) {
          attempts++;
          continue; // Try another random number
        }
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon");
        }
        data = await response.json();
        found = true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setImageLoading(false);
        break;
      }
    }

    if (found && data) {
      setPokemon(data);
    } else if (!found) {
      setError("Could not find a valid Pokemon after 3 attempts.");
      setImageLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (totalPokemons !== null) {
      fetchRandomPokemon();
    }
  }, [totalPokemons]);

  if (loading) {
    return (
      <div className="pokemon-center">
        <h2>Random Pokemon</h2>
        <div className="pokemon-margin">
          <div className="pokemon-loading-box">
            <div className="pokemon-spinner" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-center">
        <h2>Error: {error}</h2>
        <button
          onClick={fetchRandomPokemon}
          className="pokemon-btn"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="pokemon-center">
        <h2>No Pokemon found</h2>
        <button
          onClick={fetchRandomPokemon}
          className="pokemon-btn"
        >
          Get Random Pokemon
        </button>
      </div>
    );
  }

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="pokemon-center">
      <h2>Pokemon Flash Card</h2>
      <div className="pokemon-margin">
        {/* Card Container with 3D perspective */}
        <div
          className="pokemon-card-perspective"
          onClick={handleCardClick}
        >
          {/* Card with flip animation */}
          <div
            className={`pokemon-card${isFlipped ? ' flipped' : ''}`}
          >
            {/* Front of card (Pokemon image) */}
            <div className="pokemon-card-front">
              {imageLoading && <div className="pokemon-spinner" />}
              <img
                src={
                  pokemon.sprites.other["official-artwork"].front_default ||
                  pokemon.sprites.front_default
                }
                alt="Mystery Pokemon"
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
                style={{ display: imageLoading ? 'none' : 'block' }}
                className="pokemon-card-front-img loaded"
              />
              {!imageLoading && (
                <>
                  <div className="pokemon-card-front-title">?</div>
                  <div className="pokemon-card-front-hint">Click to reveal!</div>
                </>
              )}
            </div>

            {/* Back of card (Pokemon name and details) */}
            <div className="pokemon-card-back">
              <h3 className="pokemon-card-back-title">{pokemon.name}</h3>
              <div className="pokemon-card-back-id">
                <strong>ID:</strong> #{pokemon.id}
              </div>
              <div className="pokemon-card-back-hint">Click to see image again!</div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={fetchRandomPokemon}
        className="pokemon-btn"
      >
        Get New Pokemon Card
      </button>
    </div>
  );
}

export default PokemonPage;
