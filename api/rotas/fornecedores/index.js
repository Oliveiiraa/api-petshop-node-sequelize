const router = require('express').Router();
const TabelaFornecedor = require('./tabelaFornecedor');
const Fornecedor = require('./Fornecedor');

router.get('/api/fornecedores', async (req, res) => {
  const results = await TabelaFornecedor.listar();

  res.send(
    JSON.stringify(results)
  );
});

router.post('/api/fornecedores', async (req, res) => {
  const dados = req.body;
  const fornecedor = new Fornecedor(dados);

  await fornecedor.criar();

  return res.send(JSON.stringify(fornecedor));
})

router.get('/api/fornecedores/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const fornecedor = new Fornecedor({ id });

    await fornecedor.carregar();

    return res.send(JSON.stringify(fornecedor));
  } catch (error) {
    return res.status(400).send(error.message);
  }
})

router.put('/api/fornecedores/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, { id: id });

    const fornecedor = new Fornecedor(dados);
    await fornecedor.atualizar();
    res.end();
  } catch (err) {
    res.status(400).send(err.message);
  }
})

module.exports = router;