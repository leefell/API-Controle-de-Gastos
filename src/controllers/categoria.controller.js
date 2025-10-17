const categoriaService = require("../services/categoria.service.js");

const getAllCategorias = async (req, res) => {
  try {
    const categorias = await categoriaService.getAllCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categorias." });
  }
};

const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await categoriaService.getCategoriaById(parseInt(id));
    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categoria." });
  }
};

const createCategoria = async (req, res) => {
  try {
    const novaCategoria = await categoriaService.createCategoria(req.body);
    res.status(201).json(novaCategoria);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar categoria." });
  }
};

const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoriaAtualizada = await categoriaService.updateCategoria(
      parseInt(id),
      req.body
    );
    res.status(200).json(categoriaAtualizada);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar categoria." });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    await categoriaService.deleteCategoria(parseInt(id));
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar categoria." });
  }
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
