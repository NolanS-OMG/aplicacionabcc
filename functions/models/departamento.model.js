const mongoose = require('mongoose');

const departamentoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  numero: {
    type: Number,
    required: true,
    unique: true,
    min: 0,
    max: 9
    // Así solo es de 1 dígito
  }
});

const Departamento = mongoose.model('Departamento', departamentoSchema);

module.exports = Departamento;