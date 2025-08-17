import { useState, useEffect } from "react";
import axios from "axios";

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
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Random Pokemon</h2>
        <div style={{ margin: "2rem 0" }}>
          <h3 style={{ marginBottom: "1rem" }}>Loading Pokemon...</h3>
          <div
            style={{
              width: "300px",
              height: "300px",
              margin: "0 auto",
              border: "2px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              color: "#666",
            }}
          >
            🔄 Loading...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Error: {error}</h2>
        <button
          onClick={fetchRandomPokemon}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>No Pokemon found</h2>
        <button
          onClick={fetchRandomPokemon}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
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
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Pokemon Flash Card</h2>
      <div style={{ margin: "2rem 0" }}>
        {/* Card Container with 3D perspective */}
        <div
          style={{
            perspective: "1000px",
            display: "inline-block",
            cursor: "pointer",
          }}
          onClick={handleCardClick}
        >
          {/* Card with flip animation */}
          <div
            style={{
              position: "relative",
              width: "300px",
              height: "350px",
              transformStyle: "preserve-3d",
              transition: "transform 0.6s ease-in-out",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front of card (Pokemon image) */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                border: "3px solid #ffd700",
                borderRadius: "15px",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                padding: "1rem",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                ?
              </div>
              <img
                src={
                  pokemon.sprites.other["official-artwork"].front_default ||
                  pokemon.sprites.front_default
                }
                alt="Mystery Pokemon"
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
                style={{
                  maxWidth: "250px",
                  maxHeight: "250px",
                  opacity: imageLoading ? 0 : 1,
                  transition: "opacity 0.3s ease",
                }}
              />
              <div
                style={{
                  marginTop: "1rem",
                  fontSize: "0.9rem",
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                Click to reveal!
              </div>
            </div>

            {/* Back of card (Pokemon name and details) */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                border: "3px solid #ffd700",
                borderRadius: "15px",
                backgroundColor: "#4169e1",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                padding: "1rem",
                boxSizing: "border-box",
              }}
            >
              <h3
                style={{
                  textTransform: "capitalize",
                  marginBottom: "1rem",
                  fontSize: "2rem",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                {pokemon.name}
              </h3>
              <div
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "1rem",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                }}
              >
                <strong>ID:</strong> #{pokemon.id}
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#ffffe0",
                  fontStyle: "italic",
                  marginTop: "1rem",
                }}
              >
                Click to see image again!
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={fetchRandomPokemon}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "1rem",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#218838";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#28a745";
          e.currentTarget.style.transform = "translateY(0px)";
        }}
      >
        Get New Pokemon Card
      </button>
    </div>
  );
}

export default PokemonPage;
