var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost/sucursal2');

mongoose.connection.on('error', console.error.bind(console, 'Error en mongno'));

//mongodb para el update
var expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb('mongodb://localhost/sucursal2'));

//Se carga el modelo y se crea el controlador
var model = require('./models/refaccion')(app, mongoose);
var refCtrl = require('./controllers/refacciones');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());

//permitir la consulta desde localhost
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/refacciones', refCtrl.find);

app.post('/sucursal2', refCtrl.update);

app.listen(3001, function () {
  console.log("Servidor iniciado en el puerto 3001");
});