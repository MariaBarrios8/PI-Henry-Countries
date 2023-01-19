import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByContinent, getTheCountries } from "../actions";

export function Continents({ setCurrentPage }) {
  const dispatch = useDispatch();
  let allCountries = useSelector((state) => state.Countries);
  let allContinents = allCountries.map((c) => c.continent);
  let allContinent = new Set(allContinents);
  let continent = [];
  continent = [...allContinent];

  function handleChange(e) {
    e.preventDefault();
    dispatch(filterByContinent(e.target.value));
    setCurrentPage(1);
  }

  return (
    <nav>
      <select onChange={(e) => handleChange(e)}>
        <option value="all">Continents</option>
        {continent.map((c) => (
          <option key={c.toString()} value={c}>
            {c}
          </option>
        ))}
      </select>
    </nav>
  );
}
