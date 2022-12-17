const { Router } = require("express")
const router = Router();

const { Country, Activity } = require("../db");
const { getActivities } = require("../controllers/country");


//FIX THIS TF
router.get("/", async (req, res) => {
  try {
    const dbAct = await Activity.findAll({
      attibutes: ["name"],
      include: Country,
    });
    console.log(dbAct);
    res.status(200).send(dbAct);
  } catch (error) {
    res.status(400).send("lawea");
  }
});

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  const newActivity = {
    name,
    difficulty,
    duration,
    season,
  };

  try {
    const validateAct = await Activity.findOne({
      where: {
        name: name,
      },
    });
    if (!validateAct) {
      const createActivity = await Activity.create(newActivity);
      let matchCountry = await Country.findAll({
        where: {
          name: countries,
        },
      });
      await createActivity.addCountry(matchCountry);
      res.status(200).send("Activity created");
    } else {
      let matchCountry2 = await Country.findAll({
        where: {
          name: countries,
        },
      });
      await validateAct.addCountry(matchCountry2);
      res.status(200).send("Activity created");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
