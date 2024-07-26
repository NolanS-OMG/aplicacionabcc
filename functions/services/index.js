const productServices = require("./product.services.js");
const departamentoServices = require("./departamento.services.js");

exports.module = {
  product: productServices,
  departamento: departamentoServices
}