const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config')
const router = require('./rotas/fornecedores/index');
const NaoEncontrado = require('./erros/NaoEncontrado');

app.use(bodyParser.json());
app.use(router);

app.use((err, req, res, next) => {
  if (err instanceof NaoEncontrado) {
    res.status(404).send(err.message);
  } else {
    res.status(400).send(err.message);
  }
})

app.listen(config.get("api.port"), () => { console.log('Server is running on port 3000') });