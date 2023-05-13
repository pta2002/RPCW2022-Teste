const mongoose = require('mongoose')

const movimentoSchema = new mongoose.Schema({
  numero: String,
  tipo: String,
  data: Date,
  valor: Number,
  descricao: String,
  entidade: String,
})

module.exports = mongoose.model('receitas', movimentoSchema)
