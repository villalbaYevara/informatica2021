//llama al controlador
const express = require("express");
const router = express.Router();
const interprete = require("../controllers/interprete.controller");
// crear interprete
router.post("/", interprete.create);

// mostrar todos los interpretes
router.get("/", interprete.findAll);

//buscar por id
router.get("/:interpreteId", interprete.findOne);

// actualizar por id
router.put("/:interpreteId", interprete.update);

//eliminar pr id
router.delete("/:interpreteId", interprete.delete);

//eliminar todo
router.delete("/", interprete.deleteAll);

//exportar
module.exports = router;
