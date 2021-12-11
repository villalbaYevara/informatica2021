const express = require("express");
const logger = require("morgan");
//constructor para iniciar express 
const app = express();

// configuracion del puerto
app.set("port", process.env.PORT || 3000);

// Middelwares
//soporte para trabajar con morgan
app.use(logger("dev"));
//soporte para trabajar con json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
//aroun =>
app.get("/", (req, res) => {
  res.send("Hola Mundo GET");
});

app.post("/", (req, res) => {
  res.send({ saludo: "Hola Mundo POST" });
});

// Static files
app.use(express.static(__dirname + "/public"));

// servidor escucha 
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
