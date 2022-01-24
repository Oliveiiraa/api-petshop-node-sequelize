const table = require('./tabelaFornecedor');

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
}

module.exports = Fornecedor;