const mongoose = require('mongoose');

const familiaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  numero: {
    type: Number,
    required: true,
    min: 0,
    max: 999
    // Así solo es de 3 dígitos
  },
  clase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clase',
    required: true
  }
});

const Familia = mongoose.model('Familia', familiaSchema);

module.exports = Familia;