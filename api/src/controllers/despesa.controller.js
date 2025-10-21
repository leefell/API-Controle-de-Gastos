const despesaService = require("../services/despesa.service.js");

const getAllDespesas = async (req, res) => {
  try {
    const despesas = await despesaService.getAllDespesas();
    res.status(200).json(despesas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar despesas." });
  }
};

const getDespesaById = async (req, res) => {
  try {
    const { id } = req.params;
    const despesa = await despesaService.getDespesaById(parseInt(id));
    if (!despesa) {
      return res.status(404).json({ error: "Despesa não encontrada." });
    }
    res.status(200).json(despesa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar despesa." });
  }
};

const createDespesa = async (req, res) => {
  try {
    const despesaData = { ...req.body, usuarioId: req.usuario.id }; // atrelar despesa ao usuario
    const novaDespesa = await despesaService.createDespesa(despesaData);
    res.status(201).json(novaDespesa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar despesa." });
  }
};

const updateDespesa = async (req, res) => {
  try {
    const { id } = req.params;
    const despesaAtualizada = await despesaService.updateDespesa(
      parseInt(id),
      req.body
    );
    res.status(200).json(despesaAtualizada);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar despesa." });
  }
};

const deleteDespesa = async (req, res) => {
  try {
    const { id } = req.params;
    await despesaService.deleteDespesa(parseInt(id));
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar despesa." });
  }
};

module.exports = {
  getAllDespesas,
  getDespesaById,
  createDespesa,
  updateDespesa,
  deleteDespesa,
};
