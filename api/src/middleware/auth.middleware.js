const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Pega o token do cabeçalho da req
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acesso negado. Nenhum token fornecido." });
  }

  try {
    // Verifica se o token é valido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adiciona os dados do usuário do token ao objeto req
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido." }); // 403 Forbidden
  }
};

module.exports = { verifyToken };
