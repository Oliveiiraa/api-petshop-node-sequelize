const router = require('express').Router();
const TabelaFornecedor = require('./tabelaFornecedor');

router.use('/api/fornecedores', async (req, res) => {
  const results = await TabelaFornecedor.listar();

  res.send(
    JSON.stringify(results)
  );
});

module.exports = router;