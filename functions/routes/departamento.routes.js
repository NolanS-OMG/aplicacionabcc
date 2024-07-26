const express = require("express");
const controller = require("../controllers").module.departamento;

const router = express.Router();

router.get("/", controller.verTabla);

module.exports = router;