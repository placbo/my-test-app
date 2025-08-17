import React from "react";
import { Link } from "react-router-dom";
import "./Tile.css";

interface TileProps {
  to: string;
  image: string;
  title: string;
  description: string;
}

const Tile: React.FC<TileProps> = ({ to, image, title, description }) => (
  <Link className="tile" to={to}>
    <div className="tile-image-wrapper">
      <img src={image} alt={title} className="tile-image" />
    </div>
    <div className="tile-content">
      <h2 className="tile-title">{title}</h2>
      <p className="tile-description">{description}</p>
    </div>
  </Link>
);

export default Tile;
