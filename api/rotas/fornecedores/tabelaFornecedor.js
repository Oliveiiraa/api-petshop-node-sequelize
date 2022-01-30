const model = require('./modelTableFornecedor');
module.exports = {
  listar() {
    return model.findAll();
  },

  inserir(fornecedor) {
    return model.create(fornecedor);
  },

  async unique(id) {
    const encontrado = await model.findOne({ where: { id: id } });

    if (!encontrado) {
      throw new Error('Fornecedor não encontrado');
    }

    return encontrado;
  },

  async update(id, dados) {
    return model.update(dados, { where: { id: id } });
  },

  async delete(id) {
    return model.destroy({ where: { id: id } });
  }
}