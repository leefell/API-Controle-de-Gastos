const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoria.controller.js");
const { verifyToken } = require("../middleware/auth.middleware.js");

router.get("/", verifyToken, categoriaController.getAllCategorias);
router.get("/:id", verifyToken, categoriaController.getCategoriaById);
router.post("/", verifyToken, categoriaController.createCategoria);
router.put("/:id", verifyToken, categoriaController.updateCategoria);
router.delete("/:id", verifyToken, categoriaController.deleteCategoria);

module.exports = router;
