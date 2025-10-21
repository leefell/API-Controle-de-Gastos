const express = require("express");
const router = express.Router();
const despesaController = require("../controllers/despesa.controller.js");
const { verifyToken } = require("../middleware/auth.middleware.js");

router.get("/", verifyToken, despesaController.getAllDespesas);
router.get("/:id", verifyToken, despesaController.getDespesaById);
router.post("/", verifyToken, despesaController.createDespesa);
router.put("/:id", verifyToken, despesaController.updateDespesa);
router.delete("/:id", verifyToken, despesaController.deleteDespesa);

module.exports = router;
