var express = require('express');
var router = express.Router();

const api = require('axios').create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000,
});

/* GET home page. */
router.get('/', async function(req, res) {
  let data = (await api.get('/movimentos?groupBy=tipo')).data;

  let receita = data["Receita"].reduce((acc, cur) => acc + cur.valor, 0);
  let despesa = data["Despesa"].reduce((acc, cur) => acc + cur.valor, 0);
  res.render('index', { receita, despesa });
});

router.get('/movimentos', async function(req, res) {
  let movimentos = (await api.get('/movimentos')).data;

  res.render('movimentos', { movimentos });
});

router.post('/movimentos/novo', async function(req, res) {
  let movimento = req.body;
  await api.post('/movimentos', movimento);

  res.redirect('/movimentos');
});

router.get('/movimentos/novo', async function(req, res) {
  res.render('movimentos-novo', {});
});

router.get('/pagamentos', async function(req, res) {
  let pagamentos = (await api.get('/pagamentos')).data;

  res.render('pagamentos', { pagamentos });
});

module.exports = router;
