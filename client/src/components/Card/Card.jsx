import React from "react";
import { Link } from "react-router-dom";

export default function Card({ flag, name, continent, population, id }) {
  return (
    <div className="Card">
      <img className="countryFLag" src={flag} alt="image not found" width='325px' height='225'/>
      <div className="CardBody">
        <h1>{name}</h1>
        <h3>Continent: {continent}</h3>
        <h3>Population of: {population} habitants</h3>
        <br></br>
        <div className="readmore">
        <Link to={`/home/${id}`}>
          <button>Read more</button>
        </Link>
        </div>
      </div>
    </div>
  );
}
