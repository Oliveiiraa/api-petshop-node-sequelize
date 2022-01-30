const model = require('./modelTableFornecedor');
const NaoEncontrado = require('../../erros/NaoEncontrado');

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
      throw new NaoEncontrado();
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