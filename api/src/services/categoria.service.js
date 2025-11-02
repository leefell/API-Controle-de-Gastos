const prisma = require("../prismaClient.js");

const getAllCategorias = (usuarioId) => {
  return prisma.categoria.findMany({ where: { removido: false, usuarioId } });
};

const getCategoriaById = (id, usuarioId) => {
  return prisma.categoria.findUnique({ where: { id: id, removido: false, usuarioId } });
};

const createCategoria = (data, usuarioId) => {
  return prisma.categoria.create({ data: { ...data, usuarioId } });
};

const updateCategoria = (id, data, usuarioId) => {
  return prisma.categoria.update({ where: { id: id, usuarioId }, data });
};

const deleteCategoria = (id, usuarioId) => {
  return prisma.categoria.update({
    where: { id: id, usuarioId },
    data: { removido: true },
  });
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};