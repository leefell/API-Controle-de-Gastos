const prisma = require("../prismaClient.js");

const getAllCategorias = () => {
  return prisma.categoria.findMany({ where: { removido: false } });
};

const getCategoriaById = (id) => {
  return prisma.categoria.findUnique({ where: { id: id, removido: false } });
};

const createCategoria = (data) => {
  return prisma.categoria.create({ data });
};

const updateCategoria = (id, data) => {
  return prisma.categoria.update({ where: { id: id }, data });
};

const deleteCategoria = (id) => {
  return prisma.categoria.update({
    where: { id: id },
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
