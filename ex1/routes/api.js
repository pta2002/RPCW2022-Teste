var express = require('express');
var router = express.Router();
const cidades = require('../controller/cidades')
const ligacoes = require('../controller/ligacoes')

router.get('/cidades', async function(req, res, next) {
  const distrito = req.query.distrito
  res.send(await cidades.list(distrito))
});

router.get('/cidades/nomes', async function(req, res, next) {
  res.send(await cidades.nomes())
});

router.get('/cidades/:id', async function(req, res, next) {
  res.send(await cidades.get(req.params.id))
});

router.get('/distritos', async function(req, res, next) {
  res.send(await cidades.distritos())
});

router.get('/ligacoes', async function(req, res, next) {
  const { origem, dist } = req.query

  if (origem) {
    res.send(await ligacoes.origem(origem))
  } else if (dist) {
    res.send(await ligacoes.distancia(Number.parseFloat(dist)))
  } else {
    res.send("error")
  }
});

module.exports = router;
