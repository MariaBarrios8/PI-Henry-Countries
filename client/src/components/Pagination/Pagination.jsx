import React from "react";

export default function Pagination({
  countryPerPage,
  allCountries,
  pagination,
  prevPage,
  nextPage,
}) {
  const pageNumber = [];
  for (let i = 1; i <= allCountries / countryPerPage; i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul>
        <button className="backButton" onClick={prevPage}>
          Back
        </button>
        {pageNumber?.map((number) => (
          <button
            className="number"
            key={number}
            onClick={() => pagination(number)}
          >
            {number}
          </button>
        ))}
        <button className="advanceButton" onClick={nextPage}>
          Next
        </button>
      </ul>
    </nav>
  );
}
