var express = require('express');
var router = express.Router();
const pagamento = require('../controllers/pagamento');
const movimento = require('../controllers/movimento');

router.get('/movimentos', async function(req, res) {
  if (req.query.groupBy == "tipo") {
    res.send(await movimento.listByTipo());
  } else if (req.query.groupBy == "entidade") {
    res.send(await movimento.listByEntidade());
  } else {
    res.send(await movimento.list());
  }
});

router.post('/movimentos', async function(req, res) {
  res.send(await movimento.add(req.body));
});

router.get('/pagamentos', async function(req, res) {
  if (req.query.status) {
    res.send(await pagamento.status(req.query.status));
  } else {
    res.send(await pagamento.list());
  }
});

router.get('/pagamentos/:id', async function(req, res) {
  res.send(await pagamento.get(req.params.id));
});

module.exports = router;
