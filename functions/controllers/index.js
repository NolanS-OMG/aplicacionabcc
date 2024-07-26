const productController = require("./product.controller.js");
const departamentoController = require("./departamento.controller.js");

exports.module = {
  product: productController,
  departamento: departamentoController
}