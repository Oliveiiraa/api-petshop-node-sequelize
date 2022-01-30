const table = require('./tabelaFornecedor');
const CampoInvalido = require('../../erros/CampoInvalido');
class Fornecedor {
  constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
    this.id = id
    this.empresa = empresa
    this.email = email
    this.categoria = categoria
    this.dataCriacao = dataCriacao
    this.dataAtualizacao = dataAtualizacao
    this.versao = versao
  }

  async criar() {
    this.validar();

    const resultado = await table.inserir({
      empresa: this.empresa,
      email: this.email,
      categoria: this.categoria
    });

    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
    this.versao = resultado.versao;
  }

  async carregar() {
    const resultado = await table.unique(this.id);

    this.empresa = resultado.empresa;
    this.email = resultado.email;
    this.categoria = resultado.categoria;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
    this.versao = resultado.versao;
  }

  async atualizar() {
    await table.unique(this.id);
    const campos = ['empresa', 'email', 'categoria'];
    const dadosParaAtualizar = {};

    campos.forEach(campo => {
      const valor = this[campo];

      if (typeof valor === 'string' && valor.length > 0) {
        dadosParaAtualizar[campo] = valor;
      }
    })

    if (Object.keys(dadosParaAtualizar).length === 0) {
      throw new Error('Nenhum dado para atualizar');
    }

    await table.update(this.id, dadosParaAtualizar);
  }

  async delete() {
    return table.delete(this.id)
  }

  validar() {
    const campos = ['empresa', 'email', 'categoria'];

    campos.forEach(campo => {
      const valor = this[campo];

      if (typeof valor !== 'string' || valor.length === 0) {
        throw new CampoInvalido(campo);
      }
    })
  }
}

module.exports = Fornecedor;