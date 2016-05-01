var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost/aui');

mongoose.connection.on('error', console.error.bind(console, 'Error en mongno'));

//Se carga el modelo y se crea el controlador
var model = require('./models/refaccion')(app, mongoose);
var refCtrl = require('./controllers/refacciones');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/refacciones', refCtrl.findAll);

app.listen(3000, function () {
  console.log("Servidor iniciado en el puerto 3000");
});