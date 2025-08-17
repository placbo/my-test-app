import React from "react";
import Tile from "./Tile";
import "./TilesGrid.css";

export interface TileData {
  to: string;
  image: string;
  title: string;
  description: string;
}

interface TilesGridProps {
  tiles: TileData[];
}

const TilesGrid: React.FC<TilesGridProps> = ({ tiles }) => (
  <nav aria-label="Feature navigation">
    <div className="tiles-grid">
      {tiles.map((tile) => (
        <Tile key={tile.to} {...tile} />
      ))}
    </div>
  </nav>
);

export default TilesGrid;
