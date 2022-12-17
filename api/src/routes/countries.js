const { Router } = require("express");
const router = Router();
const { getAllCountries } = require("../controllers/country");

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let totalCountries = await getAllCountries();

    if (name) {
      ///countries?name="..."
      let countryName = await totalCountries.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      countryName.length
        ? res.status(200).send(countryName)
        : res.status(404).send("Sorry! Country not found （（●´∧｀●））");
    } else {
      res.status(200).send(totalCountries);
    }
  } catch (error) {
    console.log("Backend error, router /countries + query")
    return error;
  }
});

router.get("/:id", async (req, res) => {
  try {
    const allCountries = await getAllCountries();

    const { id } = req.params;

    if (id) {
      let countryId = await allCountries.filter((obj) => obj.id == id);
      countryId.length
        ? res.status(200).send(countryId)
        : res.status(404).send("Sorry! Country not found （（●´∧｀●））");
    }
  } catch (error) {
    console.log("backend error, req.params id");
  }
})

module.exports = router;
