const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config')
const router = require('./rotas/fornecedores/index');

app.use(bodyParser.json());
app.use(router);

app.listen(config.get("api.port"), () => { console.log('Server is running on port 3000') });