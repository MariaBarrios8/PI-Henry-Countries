import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByContinent,
  getTheCountries,
  orderByPopulation,
  orderCountriesByName,
} from "../../actions";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import { Continents } from "../../helpers/Continents";
import Card from "../Card/Card";

import "./home.css";

export default function Home() {
  const dispatch = useDispatch(); //A hook to access the redux dispatch function
  const allCountries = useSelector((state) => state.countries);

  //paginado
  const [currentPage, setCurrentPage] = useState(1); //pagina 1
  const [countryPerPage, setCountryPerPage] = useState(10); //cards por pagina
  const indexOfLastCountry = currentPage * countryPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countryPerPage;
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const [order, setOrder] = useState("");
  const [population, setPopulation] = useState("");

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const lastPage = allCountries.length / countryPerPage;

  const nextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  //paginado

  // carga de cartas
  useEffect(() => {
    dispatch(getTheCountries());
    dispatch(filterByContinent());
    //getTheActivities
  }, [dispatch]);

  //refresh
  function handleClick(e) {
    e.preventDefault();
    dispatch(getTheCountries());
  }

  //orden alfabético
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderCountriesByName(e.target.value));
    setCurrentPage(1);
    setOrder(`${e.target.value}`);
  }

  //orden por población
  function handlePopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setPopulation(`${e.target.value}`);
  }

  //orden por tipos de actividades

  //orden por continente
  function handleFilterByContinents(e) {
    e.preventDefault();
    dispatch(filterByContinent(e.target.value));
  }

  return (
    <div>
      <div className="box">
        <Link to="/form">
          <button className="addActivity">Add an activity</button>
        </Link>
        <h1>Henry Countries Proyect</h1>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reload all countries
        </button>

        <div className="selections">
          <select className="Orden-alfabetico" onChange={(e) => handleSort(e)}>
            <option hidden="AllTheGames">Alphabetical order</option>
            <option value="asc">A - Z order</option>
            <option value="des">Z - A order</option>
          </select>
          <i className="i"></i>
          <select className="Population" onChange={(e) => handlePopulation(e)}>
            <option hidden="population">Population</option>
            <option value="high">Higher population first</option>
            <option value="low">Lower population first</option>
          </select>
          <i className="i"></i>
          <select className="Activities">
            <option hidden="activities">Activities</option>
          </select>
          <i className="i"></i>
          <select
            className="Continents"
            onChange={(e) => handleFilterByContinents(e)}
          >
            <option hidden="contienents">Continents</option>
            <option value="all">All</option>
            <option>Africa</option>
            <option>Antarctica</option>
            <option>Asia</option>
            <option>Oceania</option>
            <option>Europe</option>
            <option>North America</option>
            <option>South America</option>
          </select>
          <i className="i"></i>
          <div className="pagination">
            <Pagination
              countryPerPage={countryPerPage}
              allCountries={allCountries.length}
              pagination={pagination}
              prevPage={prevPage}
              nextPage={nextPage}
            />
          </div>
          <div className="searchBar">
            <SearchBar />
          </div>
        </div>
        <div className="countryCard">
          {currentCountries?.map((el) => {
            return (
              <div className="dataCard">
                <Card
                  id={el.id}
                  flag={el.flag}
                  name={el.name}
                  continent={el.continent}
                  population={el.population}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Link to="/form">
        <button className="addActivity">Add an activity</button>
      </Link>
    </div>
  );
}
