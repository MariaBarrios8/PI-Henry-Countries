const { Router } = require("express");
const router = Router();
const { getAllCountries } = require("../controllers/country");


//rutas de countries, TODO empieza con /countries y despues blablha 
router.get('/', getAllCountries)

//lo mismo para ID
//router.get('/:id', )

module.exports = router