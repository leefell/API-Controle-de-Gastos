const express = require("express");
const router = express.Router();
const despesaController = require("../controllers/despesa.controller.js");

router.get("/", despesaController.getAllDespesas);
router.get("/:id", despesaController.getDespesaById);
router.post("/", despesaController.createDespesa);
router.put("/:id", despesaController.updateDespesa);
router.delete("/:id", despesaController.deleteDespesa);

module.exports = router;
