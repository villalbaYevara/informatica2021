//referencia a inteprete
const Interprete = require("../models/interprete.model");

//creacion de metodo

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacío",
    });
  }
  //creacion objeto de la clase
  const interprete = new Interprete({
    nombre: req.body.nombre,
    nacionalidad: req.body.nacionalidad,
  });

  //llama al modelo
  Interprete.create(interprete, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else res.send(data);
  });
};

//crear el metodo buscar un dato
exports.findOne = (req, res) => {
  Interprete.findById(req.params.interpreteId, (err, data) => {
    // preguntamos si hay error
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Intérprete no encontrado con id ${req.params.interpreteId}`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir el intérprete con id ${req.params.interpreteId}`,
        });
      }
      // si no hay error responde los datos encontrados
    } else res.send(data);
  });
};

// metodo mostrar todo
exports.findAll = (req, res) => {
  Interprete.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else res.send(data);
  });
};

//actualizar por id
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacío",
    });
  }
  // llamda al metodo
  Interprete.updateById(
    req.params.interpreteId,
    new Interprete(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Intérprete no encontrado con id ${req.params.interpreteId}`,
          });
        } else {
          res.status(500).send({
            message: `Error al requerir el intérprete con id ${req.params.interpreteId}`,
          });
        }
      } else res.send(data);
    }
  );
};

// metodo eliminacion por id
exports.delete = (req, res) => {
  Interprete.remove(req.params.interpreteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Intérprete no encontrado con id ${req.params.interpreteId}`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir el intérprete con id ${req.params.interpreteId}`,
        });
      }
    } else res.send({ message: "Intérprete eliminado" });
  });
};

//eliminar todo
exports.deleteAll = (req, res) => {
  Interprete.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error al requerir el intérprete con id ${req.params.interpreteId}`,
      });
    } else res.send({ message: "Todos los Intérpretes eliminados" });
  });
};
