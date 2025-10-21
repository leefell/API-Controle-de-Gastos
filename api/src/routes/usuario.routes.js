const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller.js");
const { verifyToken } = require("../middleware/auth.middleware.js");

router.get("/", verifyToken, usuarioController.getAllUsuarios);
router.get("/:id", verifyToken, usuarioController.getUsuarioById);
router.post("/", usuarioController.createUsuario);
router.put("/:id", verifyToken, usuarioController.updateUsuario);
router.delete("/:id", verifyToken, usuarioController.deleteUsuario);

module.exports = router;
