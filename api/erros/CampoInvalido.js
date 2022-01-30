class CampoInvalido extends Error {
  constructor(campo) {
    const message = `O campo ${campo} é inválido`;
    super(message);
    this.name = 'CampoInvalido';
    this.idErro = 1;
  }
}

module.exports = CampoInvalido;