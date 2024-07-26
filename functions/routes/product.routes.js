const express = require("express");
const controller = require("../controllers").module.product;

const router = express.Router();

router.get("/", controller.encuentraPorSku);
router.post("/alta", controller.darAlta);
router.put("/alta", controller.darAltaExistente);
router.put("/baja", controller.darBaja);
router.put("/cambio", controller.hacerCambio);

module.exports = router;