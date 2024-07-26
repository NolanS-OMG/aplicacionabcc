const Product = require("../models/product.model");

const productServices = require("../services").module.product;
const modelErrorHandling = require("../utils").module.modelErrorHandling;

exports.encuentraPorSku = async (req, res) => {
  const { sku } = req.query;
  try {
    const fieldErrors = modelErrorHandling.validateModelFields(Product, [{ name: "sku", value: sku }]);
    if (fieldErrors.length > 0) {
      res.status(400).json({ errors: fieldErrors });
      return;
    }
    const product = await productServices.encuentraProductoPorSku(sku);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error });
  }
}

exports.darAlta = async (req, res) => {
  const data = { ...req.body, fechaAlta: new Date(req.body.fechaAlta), fechaBaja: new Date(req.body.fechaBaja) };
  try {
    const product = await productServices.darAlta(data);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.darAltaExistente = async (req, res) => {
  const { sku } = req.body;
  try {
    const product = await productServices.darAltaExistente(sku);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error });
  }
}

exports.darBaja = async (req, res) => {
  const { sku } = req.body;
  try {
    const product = await productServices.darBaja(sku);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.hacerCambio = async (req, res) => {
  const { sku, ...data } = req.body;
  try {
    const product = await productServices.hacerCambio({ sku, ...data });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error })
  }
}