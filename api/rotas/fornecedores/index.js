const router = require('express').Router();
const TabelaFornecedor = require('./tabelaFornecedor');
const Fornecedor = require('./Fornecedor');
const NaoEncontrado = require('../../erros/NaoEncontrado');

router.get('/api/fornecedores', async (req, res) => {
  const results = await TabelaFornecedor.listar();

  res.status(200).send(
    JSON.stringify(results)
  );
});

router.post('/api/fornecedores', async (req, res) => {
  try {
    const dados = req.body;
    const fornecedor = new Fornecedor(dados);

    await fornecedor.criar();

    return res.status(201).send(JSON.stringify(fornecedor));
  } catch (err) {
    return res.status(400).send(err.message);
  }
})

router.get('/api/fornecedores/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const fornecedor = new Fornecedor({ id });

    await fornecedor.carregar();

    return res.status(200).send(JSON.stringify(fornecedor));
  } catch (error) {
    return res.status(404).send(error.message);
  }
})

router.put('/api/fornecedores/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, { id: id });

    const fornecedor = new Fornecedor(dados);
    await fornecedor.atualizar();

    res.status(204).end();
  } catch (err) {
    next(err)
  }
})

router.delete('/api/fornecedores/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const fornecedor = new Fornecedor({ id });

    await fornecedor.carregar();
    await fornecedor.delete();

    res.status(204).end();
  } catch (err) {
    res.status(404).send(err.message);
  }
})

module.exports = router;