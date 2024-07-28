const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require("mongoose");

require("dotenv").config();

const DB_URI = process.env.DB_URI || "";
const PORT = process.env.PORT || 2000;

const app = express();

(async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to the database");
    // await require("./utils").module.clearDepClaFam();
    // await require("./utils").module.crearDepClaFam();
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();

// Configurar middlewares y rutas solo después de la conexión a la base de datos
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/.netlify/functions/api', require("./routes"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Iniciar el servidor solo después de la conexión a la base de datos
app.listen(PORT, () => {
  console.log("Servidor funcionando en el puerto:", PORT);
});

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};