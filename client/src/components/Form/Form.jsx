import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTheCountries, postActivity } from "../../actions";
import './form.css'

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
  const history = useHistory();
  const allCountries = useSelector((state) => state.allCountries);

  const [error, setError] = useState({});
  const [input, setInput] = useState({
    //creo un stado local
    name: "",
    difficulty: "",
    duration: "",
    season: "",
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
    console.log(input)
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
  console.log(input)

  function handleDelete(e) {
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== e),
    });
  }

  function handleSubmit(el) {
    el.preventDefault();
    console.log(input)
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
        season: "",
        countries: [],
      });
      history.push("/home");
    }
  }

  return (
    <div className="bigBox">
      <div className="contentBox">
      <h1>Create a new tourist activity</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input">
          <label>Name:   </label>
          <input
            placeholder="Ej: (ski...)"
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <div className="errorMsg">
          {error.name && <p>{error.name}</p>}
          </div>
        </div>
        <br />
        <div className="input">
          <label>Difficulty:  </label>
          <input
            placeholder="1 - 5"
            type="number"
            min={1}
            max={5}
            value={input.difficulty}
            name="difficulty"
            onChange={(e) => handleChange(e)}
          />
          <div className="errorMsg">
          {error.difficulty && <p>{error.difficulty}</p>}
          </div>
        </div>
        <br />
        <div className="input">
          <label>Duration in hours: </label>
          <input
            placeholder="Ej: (1 hour...)"
            type="number"
            value={input.duration}
            min={1}
            name="duration"
            onChange={(e) => handleChange(e)}
          />
          <div className="errorMsg">
          {error.duration && <p>{error.duration}</p>}
          </div>
        </div>
        <br />
        <div>
          <label>Season: </label>
          <label>
            <input
              type="radio"
              value="Summer"
              name="check"
              onChange={(e) => handleCheck(e)}
            />
            Summer
          </label>
          <label>
            <input
              type="radio"
              value="Autumn"
              name="check"
              onChange={(e) => handleCheck(e)}
            />
            Autumn
          </label>
          <label>
            <input
              type="radio"
              value="Winter"
              name="check"
              onChange={(e) => handleCheck(e)}
            />
            Winter
          </label>
          <label>
            <input
              type="radio"
              value="Spring"
              name="check"
              onChange={(e) => handleCheck(e)}
            />
            Spring
          </label>
          <div className="errorMsg">
            {error.season && <p>{error.season}</p>}
          </div>
        </div>
        <br />
        <div className="countrySelection">
          <select onChange={(e) => handleSelect(e)}>
            <option value="country">Countries:</option>
            {allCountries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div><br />
        {input.countries.map((el) => (<button key={el} className='deleteButton' onClick={() => handleDelete(el)}>{el} X</button>))} <br />
        <div>
            <button className="submit" type="submit">Create activity</button><br />
        </div><br />
      </form>
      <Link to="/home">
        <button className="backHome">Back to home</button>
      </Link>
    </div>
    </div>
  );
}
