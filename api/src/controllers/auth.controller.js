const authService = require("../services/auth.service");
const usuarioService = require("../services/usuario.service.js");

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const token = await authService.login(email, senha);
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const usuario = await usuarioService.getUsuarioById(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados do usuário." });
  }
};

module.exports = { login, getMe };
