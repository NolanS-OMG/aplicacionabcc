const mongoose = require('mongoose');

// Definición del esquema
const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    maxlength: 6,
    match: /^[0-9]+$/, // Solo caracteres numéricos
  },
  articulo: {
    type: String,
    required: true,
    maxlength: 15,
  },
  marca: {
    type: String,
    required: true,
    maxlength: 15,
  },
  modelo: {
    type: String,
    required: true,
    maxlength: 20,
  },
  departamento: {
    type: String,
    required: true,
    maxlength: 1,
    match: /^[0-9]$/, // Solo un carácter numérico
  },
  clase: {
    type: String,
    required: true,
    maxlength: 2,
    match: /^[0-9]+$/, // Solo caracteres numéricos
  },
  familia: {
    type: String,
    required: true,
    maxlength: 3,
    match: /^[0-9]+$/, // Solo caracteres numéricos
  },
  stock: {
    type: String,
    required: true,
    maxlength: 9,
    match: /^[0-9]+$/, // Solo caracteres numéricos
  },
  cantidad: {
    type: String,
    required: true,
    maxlength: 9,
    match: /^[0-9]+$/, // Solo caracteres numéricos
  },
  descontinuado: {
    type: Boolean,
    required: true,
    default: false
  },
  fechaAlta: {
    type: Date,
    required: true,
  },
  fechaBaja: {
    type: Date,
  },
});

// Crear el modelo
const Product = mongoose.model('Product', productSchema);

module.exports = Product;