const model = require('../rotas/fornecedores/modelTableFornecedor.js');

model.sync()
  .then(() => console.log('Tabela criada com sucesso!'))
  .catch(err => console.log('Erro ao criar a tabela: ', err));