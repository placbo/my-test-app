import { useState, useEffect } from "react";

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

function Pokemon() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomPokemon = async () => {
    setLoading(true);
    setError(null);
    setImageLoading(true);

    try {
      // Generate random ID between 1 and 500
      const randomId = Math.floor(Math.random() * 500) + 1;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon");
      }

      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setImageLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

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

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Random Pokemon</h2>
      <div style={{ margin: "2rem 0" }}>
        <h3 style={{ textTransform: "capitalize", marginBottom: "1rem" }}>
          {pokemon.name}
        </h3>
        <div>
          {imageLoading && (
            <div
              style={{
                width: "300px",
                height: "300px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                color: "#666",
                zIndex: 1,
              }}
            >
              🖼️ Loading image...
            </div>
          )}
          <img
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
            style={{
              maxWidth: "300px",
              height: "auto",
              border: "2px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              backgroundColor: "#f9f9f9",
              opacity: imageLoading ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <p>
            <strong>ID:</strong> #{pokemon.id}
          </p>
        </div>
      </div>
      <button
        onClick={fetchRandomPokemon}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Get Another Random Pokemon
      </button>
    </div>
  );
}

export default Pokemon;
