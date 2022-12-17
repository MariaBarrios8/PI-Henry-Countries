const { Activity, Country } = require("../db");
const axios = require("axios");

const getApiInfo = async () => {
  try {
    const api = await axios.get("https://restcountries.com/v3/all");

    const apiData = await api.data.map((country) => {
      return {
        id: country.cca3,
        name: country.name.common,
        flag: country.flags[1],
        continent: country.continents[0],
        capital: country.capital != null ? country.capital[0] : "No data",
        subregion: country.subregion,
        area: country.area,
        population: country.population,
      };
    })

    return apiData;
  } catch (error) {
    console.log("Backend error, getApiInfo");
    return error;
  }
};

const getDbInfo = async () => {
  try {
    return await Country.findAll({
      include: {
        model: Activity,
        attibutes: ["name", "difficulty", "duration", "season"],
        through: {
          attibutes: [],
        },
      },
    });
  } catch (error) {
    console.log("Backend error, DB request");
  }
};

const getAllCountries = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoCountryTotal = [...apiInfo, ...dbInfo];
  return infoCountryTotal;
};

/*const getActivities = async () => {
  try {
    const get = await Activity.findAll();
    return get;
  } catch (error) {
    console.log("Backend error, request activities");
    return error
  }
};*/

module.exports = {
  getApiInfo,
  getDbInfo,
  //getActivities,
  getAllCountries,
};

/*const getApiInfo = async () => {
  const apiUrl = await axios.get("https://restcountries.com/v3/all");
  const apiInfo = await apiUrl.data.map((el) => {
    return {
      id: el.cca3,
      name: el.name.common,
      img: el.flags[1],
      continents: el.continents[0],
      capital:
        (el.capital || []).length === 0 ? "No tiene capital" : el.capital[0],
      subregion: el.subregion,
      area: el.area,
      population: el.population,
      borders: el.borders
        ? el.borders.map((border) => {
            return border;
          })
        : "No tiene capital",
    };
  });

  return apiInfo;
};
const getDbInfo = async () => {
  return await Country.findAll({

    includes: Activity,

    // attributes: ['name', 'dificultad', 'duracion', 'temporada',],
    // through: { activities: [] } // Mediante
  });
};

/*const getAllCountries = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = dbInfo.concat(apiInfo);
  return infoTotal;
};*/


