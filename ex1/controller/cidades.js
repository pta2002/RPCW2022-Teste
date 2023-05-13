const Cidade = require('../models/cidades')

module.exports.list = async (distrito) => {
  if (!distrito) {
    return Cidade.find({}, { _id: 0, id: 1, nome: 1, distrito: 1 })
  }
  return Cidade.find({ distrito }, { _id: 0, id: 1, nome: 1, distrito: 1 })
}

module.exports.get = async (id) => {
  return Cidade.find({ id }, { _id: 0, id: 1, nome: 1, distrito: 1 })
}

module.exports.nomes = async () => {
  return Cidade.distinct("nome").sort()
}

module.exports.distritos = async () => {
  return Cidade.aggregate([
    { $group: { _id: "$distrito", cidades: { $push: { id: "$id", nome: "$nome" } } } },
    { $project: { _id: 0, distrito: "$_id", cidades: 1 } },
  ])
}
