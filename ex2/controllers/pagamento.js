const Pagamento = require('../models/pagamento');

module.exports.list = async () => {
  return await Pagamento.find({}, { _id: 0 });
}

module.exports.get = async (id) => {
  return await Pagamento.findOne({ fracao: id }, { _id: 0 });
}

module.exports.status = async (mes) => {
  const meses = {
    "jan": 1,
    "fev": 2,
    "mar": 3,
    "abr": 4,
    "mai": 5,
    "jun": 6,
    "jul": 7,
    "ago": 8,
    "set": 9,
    "out": 10,
    "nov": 11,
    "dez": 12
  }

  const num = meses[mes];

  const pagamentos = await Pagamento.aggregate([
    { $lookup: { from: "fracoes", localField: "fracao", foreignField: "fracao", as: "valor" } },
    { $unwind: "$valor" },
    { $project: { _id: 0, fracao: 1, jan: 1, fev: 1, mar: 1, abr: 1, mai: 1, jun: 1, jul: 1, ago: 1, set: 1, out: 1, nov: 1, dez: 1, valor: "$valor.mensalidade" } },
  ]);

  return pagamentos.map(p => {
    let pagos = 0;
    Object.values(p).forEach(v => {
      if (v === true) pagos++;
    });

    pagos = Math.min(num, pagos);

    return {
      fracao: p.fracao,
      montante: p.valor * pagos
    };
  });
}
