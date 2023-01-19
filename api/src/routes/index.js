// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRouter = require("./countries");
const activityRouter = require("./activities");
const {createActivity} = require('../controllers/country')


const { Router } = require("express");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", countryRouter);
router.get("/activities", activityRouter);
router.post('/activities', createActivity)


module.exports = router;
