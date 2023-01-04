import { exportable } from "../helpers/trytry";

const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  detail: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    case "GET_COUNTRY_NAME":
      return {
        ...state,
        countries: action.payload,
      };
    case "GET_COUNTRY_DETAIL": 
    return {
      ...state,
      detail: action.payload
    }
    case "SET_DETAIL_COUNTRY":
      return {
        ...state,
        detail: {}
      }
    case "ORDER_BY_NAME":
      const countryOrder =
        action.payload === "asc"
          ? state.countries.sort((a, b) => a.name.localeCompare(b.name))
          : state.countries.sort((a, b) => b.name.localeCompare(a.name))
      return {
        ...state,
        countries: countryOrder,
      };
    case "FILTER_BY_CONTINENT": 
    {/*const allContinents = state.countries
    const filterContinent = action.payload === 'all' ? allContinents : allContinents.filter(c => c.continent === action.payload)*/}
    const filtradisimo = action.payload === 'all' ? state.allCountries : state.allCountries.filter((country) => {
      return country.continent.includes(action.payload)
    })
    return {
      ...state,
      countries: filtradisimo
    }
    case "ORDER_BY_POPULATION":
      let populationOrder = [...state.countries];
      if (action.payload === 'low') {
        populationOrder.sort((a, b) => {
          return parseInt(a.population) - parseInt(b.population)
        });
      }
      if (action.payload === 'high') {
        populationOrder.sort((a, b) => {
        return parseInt(b.population) - parseInt(b.population)
        })
      }
      return {
        ...state,
        countries: populationOrder
      }
    default:
      return state;
  }
}

export default rootReducer;
