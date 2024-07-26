const Departamento = require("../models/departamento.model.js");
const Clase = require("../models/clase.model.js");
const Familia = require("../models/familia.model.js");

exports.verTabla = async () => {
  try {
    const todosLosDepartamentos = await Departamento.find();
    const tabla = [];

    for (let i = 0; i < todosLosDepartamentos.length; i++) {
      const clasesDelDepartamento = await Clase.find({ departamento: todosLosDepartamentos[i]._id });
      const clases = [];

      for (let j = 0; j < clasesDelDepartamento.length; j++) {
        const familiasDeLaClase = await Familia.find({ clase: clasesDelDepartamento[j]._id });
        clases.push({ ...clasesDelDepartamento[j]._doc, familias: familiasDeLaClase });
      }
      tabla.push({ ...todosLosDepartamentos[i]._doc, clases: clases });
    }
    return tabla;
  } catch (error) {
    throw new Error('Error al buscar obtener y crear la tabla de Departamentos/Clases/Familias: ' + error.message);
  }
}