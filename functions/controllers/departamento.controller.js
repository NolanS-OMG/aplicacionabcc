const departamentoServices = require("../services").module.departamento;

exports.verTabla = async (req, res) => {
  try {
    const tabla = await departamentoServices.verTabla();
    res.status(200).json(tabla);
  } catch (error) {
    res.status(500).json({ error });
  }
}