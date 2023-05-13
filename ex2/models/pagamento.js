const mongoose = require('mongoose')

const pagamentoSchema = new mongoose.Schema({
  fracao: String,
  jan: Boolean,
  fev: Boolean,
  mar: Boolean,
  abr: Boolean,
  mai: Boolean,
  jun: Boolean,
  jul: Boolean,
  ago: Boolean,
  set: Boolean,
  out: Boolean,
  nov: Boolean,
  dez: Boolean,
})

module.exports = mongoose.model('pagamentos', pagamentoSchema)
