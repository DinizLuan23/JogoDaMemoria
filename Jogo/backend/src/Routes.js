const express = require('express');
const pontoController = require('./controller/PontoController');
const multer = require('multer');
const routes = express.Router();

const upload = multer();

routes.post('/ponto', pontoController.set);

routes.get('/ponto', pontoController.get);

module.exports = routes;