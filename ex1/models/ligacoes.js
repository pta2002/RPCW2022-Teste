const mongoose = require('mongoose')

const ligacaoSchema = new mongoose.Schema({
  id: String,
  origem: String,
  destino: String,
  "distância": Number,
})

module.exports = mongoose.model('ligacoes', ligacaoSchema)
