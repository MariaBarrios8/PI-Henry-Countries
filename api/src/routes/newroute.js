const { Router } = require("express");
const router = Router();
const { getAllCountries } = require("../controllers/country");


router.get('/', getAllCountries)

module.exports = router