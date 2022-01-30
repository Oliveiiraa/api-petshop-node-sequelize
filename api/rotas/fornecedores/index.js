const router = require('express').Router();
const TabelaFornecedor = require('./tabelaFornecedor');
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor;

router.get('/', async (req, res) => {
  const results = await TabelaFornecedor.listar();

  const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));

  res.status(200).send(
    serializador.serializar(results)
  );
});

router.post('/', async (req, res, next) => {
  try {
    const dados = req.body;
    const fornecedor = new Fornecedor(dados);

    await fornecedor.criar();

    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));

    return res.status(201).send(
      serializador.serializar(fornecedor)
    );
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const fornecedor = new Fornecedor({ id });

    await fornecedor.carregar();

    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));

    return res.status(200).send(
      serializador.serializar(fornecedor)
    );
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
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
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const fornecedor = new Fornecedor({ id });

    await fornecedor.carregar();
    await fornecedor.delete();

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;