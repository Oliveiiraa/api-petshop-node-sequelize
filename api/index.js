const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config')
const router = require('./rotas/fornecedores/index');
const NaoEncontrado = require('./erros/NaoEncontrado');
const CampoInvalido = require('./erros/CampoInvalido');

app.use(bodyParser.json());
app.use(router);

app.use((err, req, res, next) => {
  let status = 500;

  if (err instanceof NaoEncontrado) {
    status = 404;
  } if (err instanceof CampoInvalido) {
    status = 400;
  }

  res.status(status).json({ error: err.message });
})

app.listen(config.get("api.port"), () => { console.log('Server is running on port 3000') });