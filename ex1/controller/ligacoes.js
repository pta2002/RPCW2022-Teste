const Ligacao = require('../models/ligacoes');
const Cidade = require('../models/cidades');

module.exports.origem = async (origem) => {
  let { id } = await Cidade.findOne({ nome: origem }, { _id: 0, id: 1 })
  return await Ligacao.aggregate([
    { $match: { origem: id } },
    { $lookup: { from: "cidades", localField: "destino", foreignField: "id", as: "destino" } },
    { $unwind: "$destino" },
    { $project: { _id: 0, id: 1, destino: "$destino.id", nome: "$destino.nome" } }
  ])
}

module.exports.distancia = async (distancia) => {
  return await Ligacao.aggregate([
    { $match: { "distância": { $gte: distancia } } },
    { $lookup: { from: "cidades", localField: "origem", foreignField: "id", as: "origem" } },
    { $unwind: "$origem" },
    { $lookup: { from: "cidades", localField: "destino", foreignField: "id", as: "destino" } },
    { $unwind: "$destino" },
    { $sort: { "distância": 1 } },
    {
      $project: {
        _id: 0, id: 1,
        origem_id: "$origem.id", origem_nome: "$origem.nome",
        destino_id: "$destino.id", destino_nome: "$destino.nome",
        "distância": 1
      }
    }
  ])
}
