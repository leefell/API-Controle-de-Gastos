const prisma = require('../prismaClient.js');

const getAllDespesas = () => {
  return prisma.despesa.findMany({
    where: { removido: false },
    include: {
      usuario: { select: { nome: true } },
      categoria: { select: { nome: true } },
    },
  });
};

const getDespesaById = (id) => {
  return prisma.despesa.findUnique({
    where: { id: id, removido: false },
    include: {
      usuario: { select: { nome: true } },
      categoria: { select: { nome: true } },
    },
  });
};

const createDespesa = (data) => {
  return prisma.despesa.create({ data });
};

const updateDespesa = (id, data) => {
  return prisma.despesa.update({ where: { id: id }, data });
};

const deleteDespesa = (id) => {
  return prisma.despesa.update({
    where: { id: id },
    data: { removido: true },
  });
};

module.exports = {
  getAllDespesas,
  getDespesaById,
  createDespesa,
  updateDespesa,
  deleteDespesa,
};