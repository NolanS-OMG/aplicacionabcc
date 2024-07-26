const mongoose = require('mongoose');

const claseSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  numero: {
    type: Number,
    required: true,
    min: 0,
    max: 99
    // Así solo es de 2 dígitos
  },
  departamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Departamento',
    required: true
  }
});

const Clase = mongoose.model('Clase', claseSchema);

module.exports = Clase;