const Departamento = require("../models/departamento.model.js");
const Clase = require("../models/clase.model.js");
const Familia = require("../models/familia.model.js");

exports.clearDepClaFam = async () => {
  try {
    const resultado = await Departamento.deleteMany({});
    console.log(`Documentos eliminados: ${resultado.deletedCount}`);

    const resultado00 = await Clase.deleteMany({});
    console.log(`Documentos eliminados: ${resultado00.deletedCount}`);

    const resultado01 = await Familia.deleteMany({});
    console.log(`Documentos eliminados: ${resultado01.deletedCount}`);
  } catch (error) {
    console.error("Error al eliminar los Departamentos, las Clases y las Familias", error);
  }
}