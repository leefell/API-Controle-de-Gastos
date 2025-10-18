const authService = require("../services/auth.service");

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const token = await authService.login(email, senha);
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { login };
