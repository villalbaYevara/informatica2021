var sql = require("./db");
//creamos la clase interprete
class Interprete {
  constructor(interprete) {
    //atributos de la tabla menos el id por que es auto incremental
    this.nombre = interprete.nombre;
    this.nacionalidad = interprete.nacionalidad;
  }
  //creacion de metodos
  //metodo para crear
  static create = (newInterprete, result) => {
    //insertar un interprete en la bd
    sql.query("INSERT INTO interpretes SET ?", newInterprete, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }
      // si todo esta bien se inserta los datos
      console.log("Intérprete creado", { id: res.insertId });
      result(null, { id: res.insertId, ...newInterprete });
    });
  };

  //metodo buscar por id
  static findById = (id, result) => {
    sql.query(`SELECT * FROM interpretes WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }
      //si devuelve algun dato dira interprete encontrado
      if (res.length) {
        console.log("Intérprete encontrado", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  //obtener todos los datos
  static getAll = (result) => {
    sql.query("SELECT * FROM interpretes", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }
      //si no hay error muestra el resultado
      console.log("Lista de intérpres");
      result(null, res);
    });
  };

  // actualiza por un id
  static updateById = (id, interprete, result) => {
    sql.query(
      "UPDATE interpretes SET nombre = ?, nacionalidad = ? WHERE id = ?",
      [interprete.nombre, interprete.nacionalidad, id],
      (err, res) => {
        if (err) {
          console.log("error", err);
          result(err, null);
          return;
        }
        // no se actualizo nada
        if (res.affetedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        // se actualizo los datos
        console.log("Intérprete actualizado", { id, ...interprete });
        result(null, { id, ...interprete });
      }
    );
  };
  // borrar por id
  static remove = (id, result) => {
    sql.query("DELETE FROM interpretes WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affetedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Intérprete eliminado con id: ", id);
      result(null, res);
    });
  };
  //eliminar todo
  static removeAll = (result) => {
    sql.query("DELETE FROM interpretes", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log(`${res.affetedRows} Intérpretes eliminados`);
      result(null, res);
    });
  };
}

module.exports = Interprete;
