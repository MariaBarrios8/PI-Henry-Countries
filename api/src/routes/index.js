// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRouter = require("./countries");
const activityRouter = require("./activities");

const { Router } = require("express");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", countryRouter);
router.use("/activities", activityRouter);
/*router.get('/countries', async (req, res) => {
    try {
        const allCountries = await getAllCountries()
        console.log(allCountries)
        res.send(allCountries)
    } catch (error) {
        return error
    }
})*/

module.exports = router;