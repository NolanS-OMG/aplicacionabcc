const express = require("express");
const productRoutes = require("./product.routes.js");
const departamentoRoutes = require("./departamento.routes.js");

const router = express.Router();
router.use("/product", productRoutes);
router.use("/tabla", departamentoRoutes);

module.exports = router;