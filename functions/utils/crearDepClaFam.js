const Departamento = require("../models/departamento.model.js");
const Clase = require("../models/clase.model.js");
const Familia = require("../models/familia.model.js");

const departamentos = [
  { nombre: "Domésticos", numero: 1, size: 4 },
  { nombre: "Electrónica", numero: 2, size: 2 },
  { nombre: "Mueble suelto", numero: 3, size: 2 },
  { nombre: "Salas, Recámaras, Comedores", numero: 4, size: 3 },
];

const clases = [
  { nombre: "Comestibles", size: 1 },
  { nombre: "Licuadoras", size: 2 },
  { nombre: "Batidoras", size: 7 },
  { nombre: "Cafeteras", size: 2 },
  { nombre: "Amplificadores car audio", size: 3 },
  { nombre: "Auto stereos", size: 9 },
  { nombre: "Colchón", size: 3 },
  { nombre: "Juego Box", size: 3 },
  { nombre: "Salas", size: 2 },
  { nombre: "Complementos para sala", size: 4 },
  { nombre: "Sofas cama", size: 3 },
];

const familia = [
  "Sin nombre",
  "Licuadoras",
  "Exclusivo Coppel Comercio",
  "Batidora manual",
  "Procesador",
  "Picadora",
  "Batidora Pedestal",
  "Batidora fuente de SC",
  "Multipracticos",
  "Exclusivo Coppel Comercio",
  "Cafeteras",
  "Percoladoras",
  "Amplificadores/Receptores",
  "Kit de instalación",
  "Amplificadores Coppel",
  "Autoestéreo CD C/800",
  "Accesorios car Audio",
  "Amplificador",
  "Alarma auto/casa/oficina",
  "Sin mecanismo",
  "Con CD",
  "Multimedia",
  "Paquete sin mecanismo",
  "Paquete con CD",
  "Pillow top KS",
  "Pillow top doble KS",
  "Hule espuma KS",
  "Estándar individual",
  "Pillow top individual",
  "Pillow top doble individual",
  "Esquineras superiores",
  "Tipo L seccional",
  "Sillón ocasional",
  "Puff",
  "Baúl",
  "Taburete",
  "Sofá cama tapizado",
  "Sofá cama clásico",
  "Estudio"
];

exports.crearDepClaFam = async () => {
  try {
    let sum_i = 0;
    let save_sum = 0;
    for (let i = 0; i < departamentos.length; i++) {
      const nuevoDepartamento = new Departamento({ nombre: departamentos[i].nombre, numero: departamentos[i].numero });
      const departamentoGuardado = await nuevoDepartamento.save();
      let sum_j = save_sum;
      for (let j = sum_i; j < (departamentos[i].size + sum_i); j++) {
        const nuevaClase = new Clase({ nombre: clases[j].nombre, numero: j + 1 - sum_i, departamento: departamentoGuardado._id });
        const claseGuardada = await nuevaClase.save();
        for (let k = sum_j; k < (clases[j].size + sum_j); k++) {
          const nuevaFamilia = new Familia({ nombre: familia[k], numero: k + 1 - sum_j, clase: claseGuardada._id });
          await nuevaFamilia.save();
        }
        sum_j += clases[j].size;
      }
      save_sum = sum_j;
      sum_i += departamentos[i].size;
    }
  } catch (error) {
    console.log(error);
  }
};