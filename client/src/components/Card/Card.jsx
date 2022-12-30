import React from "react";
import { Link } from "react-router-dom";

export default function Card({ flag, name, continent, population }) {
  return (
    <div className="Card">
      <img className="countryFLag" src={flag} alt="image not found" width='325px' height='225'/>
      <div className="CardBody">
        <h1>{name}</h1>
        <h3>Continent: {continent}</h3>
        <h3>Population: {population}</h3>
        <br></br>
        <Link>
          <button>Read more</button>
        </Link>
      </div>
    </div>
  );
}
