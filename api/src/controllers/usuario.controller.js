const usuarioService = require("../services/usuario.service.js");

const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários." + error.message });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioService.getUsuarioById(parseInt(id));
    if (!usuario) {
      return res
        .status(404)
        .json({ error: "Usuário não encontrado." + error.message });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário." + error.message });
  }
};

const createUsuario = async (req, res) => {
  try {
    const novoUsuario = await usuarioService.createUsuario(req.body);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário." + error.message });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioAtualizado = await usuarioService.updateUsuario(
      parseInt(id),
      req.body
    );
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar usuário." + error.message });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await usuarioService.deleteUsuario(parseInt(id));
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário." + error.message });
  }
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
