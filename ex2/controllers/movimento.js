const Movimento = require('../models/movimento');

module.exports.list = async () => {
  return await Movimento.find({}, { _id: 0 });
}

module.exports.listByTipo = async () => {
  return (await Movimento.aggregate([
    {
      $group: {
        _id: "$tipo",
        movimentos: {
          $push: {
            numero: "$numero", data: "$data",
            valor: "$valor", entidade: "$entidade",
            descricao: "$descricao"
          }
        }
      },
    },
    { $project: { _id: 0, tipo: "$_id", movimentos: 1 } }
  ])).reduce((acc, cur) => {
    acc[cur.tipo] = cur.movimentos;
    return acc;
  }, {});
}

module.exports.listByEntidade = async () => {
  return (await Movimento.aggregate([
    {
      $group: {
        _id: "$entidade",
        valor: { $sum: "$valor" }
      }
    },
    { $project: { _id: 0, entidade: "$_id", valor: 1 } }
  ])).reduce((acc, cur) => {
    acc[cur.entidade] = cur.valor;
    return acc;
  }, {})
}
