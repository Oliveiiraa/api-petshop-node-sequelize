const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config')
const router = require('./rotas/fornecedores/index');
const NaoEncontrado = require('./erros/NaoEncontrado');
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');
const formatosAceitos = require('./Serializador').formatosAceitos;

app.use(bodyParser.json());

app.use((req, res, next) => {
  let formatoRequisitado = req.header('Accept');

  if (formatoRequisitado === '*/*') {
    formatoRequisitado = 'application/json';
  }

  if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
    return res.status(406).end();
  }

  res.setHeader('Content-Type', formatoRequisitado);
  next();
})

app.use(router);

app.use((err, req, res, next) => {
  let status = 500;

  if (err instanceof NaoEncontrado) {
    status = 404;
  }

  if (err instanceof CampoInvalido || err instanceof DadosNaoFornecidos) {
    status = 400;
  }

  if (err instanceof ValorNaoSuportado) {
    status = 406;
  }

  res.status(status).json({ success: false, error: err.message });
});

app.listen(config.get("api.port"), () => { console.log('Server is running on port 3000') });