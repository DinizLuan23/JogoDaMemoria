const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://teste:teste@cluster0-zbqkc.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, // Configuração para informar que está usando o codigo de acesso para se conectar com o bd.
    useUnifiedTopology: true
});

app.use(cors());

app.use(require('./Routes'));

app.listen(3333);