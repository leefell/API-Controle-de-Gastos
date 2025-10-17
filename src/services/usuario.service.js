const prisma = require("../prismaClient.js");

const getAllUsuarios = () => {
  return prisma.usuario.findMany({
    where: { removido: false },
  });
};

const getUsuarioById = (id) => {
  return prisma.usuario.findFirst({
    where: { id: id, removido: false },
  });
};

const createUsuario = (data) => {
  return prisma.usuario.create({
    data,
  });
};

const updateUsuario = (id, data) => {
  return prisma.usuario.update({
    where: { id: id },
    data,
  });
};

// Soft delete
const deleteUsuario = (id) => {
  return prisma.usuario.update({
    where: { id: id },
    data: { removido: true },
  });
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
