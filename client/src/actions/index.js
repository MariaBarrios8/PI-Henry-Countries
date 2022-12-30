import axios from "axios";

export function getTheCountries() {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/countries");
      //back => front

      return dispatch({
        type: "GET_COUNTRIES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error, "error frontend getTheGames");
    }
  };
}

export function getCountryName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      return dispatch({
        type: "GET_COUNTRY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error, "error frontend getCountryName");
    }
  };
}

export function getCountryDetail(id) {
  return async function (dispatch) {
    try {
      let oneCountry = await axios.get(`http://localhost:3001/countries/${id}`);

      return dispatch({
        type: "GET_COUNTRY_DETAIL",
        payload: oneCountry,
      });
    } catch (error) {
      console.log(error, "frontend error, getCountryDetail");
    }
  };
}

export function orderCountriesByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: "ORDER_BY_POPULATION",
    payload,
  };
}

export function filterByContinent(payload) {
  return {
    type: "FILTER_BY_CONTINENT",
    payload
  }
}

export function getActivities() {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/activities");

      return dispatch({
        type: "GET_ACTIVITIES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error, "frontend error, getActivities");
    }
  };
}

export function filterByActivity(payload) {
  return {
    type: "FILTER_BY_ACTIVITY",
    payload,
  };
}

export function postActivity(payload) {
  return async function (dispatch) {
    try {
      const posting = await axios.post(
        "http://localhost:3001/activities",
        payload
      );
      return dispatch({
        type: "POST_ACTIVITY",
        posting,
      });
    } catch (error) {
      console.log(error, "frontend error, postActivity");
    }
  };
}
