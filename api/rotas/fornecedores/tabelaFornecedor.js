const model = require('./modelTableFornecedor');
module.exports = {
  listar() {
    return model.findAll();
  }
}