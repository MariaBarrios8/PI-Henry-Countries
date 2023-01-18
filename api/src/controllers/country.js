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
    });

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

const getActivities = async () => {
  try {
    const get = await Activity.findAll();
    return get;
  } catch (error) {
    console.log("Backend error, request activities");
    return error
  }
};

const createActivity = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  const newActivity = {
    name,
    difficulty,
    duration,
    season,
  };
  const validate = await Activity.findOne({
    where: {
      name,
    }
  });
  if(!validate) {
    const actCreate = await Activity.create(newActivity)
    console.log(countries)
    let actDb = await Country.findAll({ where: {name: countries} ///No está encontrando el COUNTRY DEBUGG
    })
    console.log(actDb)
    await actCreate.addCountry(actDb)  //metodo de SQL que lo que hace es traerme de la tabla lo que le pido por parametro
    res.status(200).send('Activity created succesfully')
  } else {
    let actCreate2 = await Country.findAll({
      where: {
        name: countries
      }
    })
    console.log('actCrate2', actCreate2)
    await validate.addCountry(actCreate2)
    res.status(200).send('Activity created succesfully')
  }
}



module.exports = {
  getApiInfo,
  getDbInfo,
  getActivities,
  getAllCountries,
  createActivity
};


/*const createActivity = async (req, res) => {
  let { name, difficulty, duration, season, countries } = req.body;
  if (!name)
    return res.json({ Problem: "name is mandatory! Please choose one!" });

  const validate = await Activity.findOne({
    where: {
      name: name,
    },
  });

  if (validate)
    return res.json({
      Problem: "That activity is already created, please try another one",
    });

  let newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  })
  console.log(newActivity)
  await Promise.all(countries.map(async e => {
    console.log('the countries: ', countries)
    await newActivity.addCountries([
      (await Country.findOrCreate({
        where: {
          name: e
        }
      }))[0].dataValues.id
    ])
  }))

  console.log('se creó esto ---> ', newActivity)

  let asociateCountry = await Activity.findOne({
    where: {
      name: name
    },
    include: {
      model: Activity,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
  console.log('esto fue asociado', asociateCountry)
  res.status(200).send(asociateCountry)
};*/

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
