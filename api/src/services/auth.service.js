const prisma = require("../prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (email, senha) => {
  // Busca usuário pelo email
  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuario) {
    throw new Error("Email ou senha inválidos.");
  }

  // Compara a senha da req com a criptografada no banco
  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    throw new Error("Email ou senha inválidos.");
  }

  // Gera o token JWT sea  senha for válida
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  return token;
};

module.exports = { login };
