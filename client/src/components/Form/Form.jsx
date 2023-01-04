import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTheCountries, postActivity } from "../../actions";

function validateCreateActivity(input) {
  const error = {};
  if (!input.name || isNaN(input.name) === false) {
    error.name = "A name is required";
  }
  if (!input.difficulty) {
    error.difficulty = "Difficulty between 1 or 5 is required";
  }
  if (!input.duration) {
    error.duration = "Duration is required";
  }
  if (!input.season) {
    error.season = "Season is required";
  }
  if (!input.countries.length) {
    error.countries = "Must choose at least one country";
  }
  return error;
}

export default function ActivitiesCreate() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const allCountries = useSelector((state) => state.allCountries);

  const [error, setError] = useState({});
  const [input, setInput] = useState({
    //creo un stado local
    name: "",
    difficulty: "",
    duration: "",
    countries: [],
  });

  useEffect(() => {
    dispatch(getTheCountries());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validateCreateActivity({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        season: e.target.value,
      });
    }
  }

  function handleSelect(e) {
    if (
      !input.countries.includes(e.target.value) &&
      e.target.value !== "country"
    )
      setInput({
        ...input,
        countries: [...input.countries, e.target.value],
      });
  }

  function handleDelete(e) {
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== e),
    });
  }

  function handleSubmit(el) {
    el.preventDefault();
    setError(validateCreateActivity(input));
    const horrores = validateCreateActivity(input);
    if (Object.values(horrores).length !== 0) {
      alert("Please fill all the fields");
    } else {
      dispatch(postActivity(input));
      alert("Activity created successfully");
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        duration: "",
        season: "",
        countries: [],
      });
      history("/home");
    }
  }

  return (
    <div>
      <title>Create a new tourist activity</title>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="errorMsg">
          <label>Name:</label>
          <input
            placeholder="Ej: (ski...)"
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {error.name && <p>{error.name}</p>}
        </div>
        <br />
        <div className="errorMsg">
          <label>Difficulty:</label>
          <input
            placeholder="1 - 5"
            type="number"
            min={1}
            max={5}
            value={input.difficulty}
            name="difficulty"
            onChange={(e) => handleChange(e)}
          />
          {error.difficulty && <p>{error.difficulty}</p>}
        </div>
        <br />
        <div className="errorMsg">
          <label>Duration:</label>
          <input
            placeholder="Ej: (1 hour...)"
            type="number"
            value={input.duration}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {error.duration && <p>{error.duration}</p>}
        </div>
        <br />
        <div>
          <label>Season: </label>
          <label>
            <input
              type="radio"
              value="summer"
              name="check"
              onChange={(e) => handleCheck(e)}
            />
            Summer
          </label>
          <label>
            <input
              type="radio"
              value="autumn"
              name="check"
              onChange={(e) => handleCheck(e)}
            />
            Autumn
          </label>
          <label>
            <input
              type="radio"
              value="winter"
              name="check"
              onChange={(e) => handleCheck(e)}
            />
            Winter
          </label>
          <label>
            <input
              type="radio"
              value="spring"
              name="check"
              onChange={(e) => handleCheck(e)}
            />
            Spring
          </label>
          <div className="errorMsg">
            {error.season && (<p>{error.season}</p>)}
          </div>
        </div><br />
        <div>
            <select onChange={(e) => handleSelect(e)} >
                <option value='country'>Countries:</option>
                {allCountries.map(c => 
                    <option value={c.name}>{c.name}</option>
                    )}
            </select>
        </div>
      </form>
    </div>
  );
}
