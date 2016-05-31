var express = require('express');
var app = express();
var morgan = require('morgan');
var request = require('request');
var async = require('async');
var bodyParser = require('body-parser');

app.use(morgan('dev'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
app.use(bodyParser.json());

//permitir la consulta desde localhost
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// var sucursal1 = 'http://192.168.33.20:3000';
// var sucursal2 = 'http://192.168.33.21:3001';

var sucursal1 = 'http://127.0.0.1:3000';
var sucursal2 = 'http://127.0.0.1:3001';

//Petición get 
app.get('/refacciones', function (req, res) {
    async.parallel([
        /*
         * First external endpoint
         */
        function (callback) {
            var url = sucursal1 + req.originalUrl;
            request(url, function (err, response, body) {
                // JSON body
                if (err) { console.log(err); callback(true); return; }
                obj = JSON.parse(body);
                callback(false, obj);
            });
        },
        /*
         * Second external endpoint
         */
        function (callback) {
            var url = sucursal2 + req.originalUrl;
            request(url, function (err, response, body) {
                // JSON body
                if (err) { console.log(err); callback(true); return; }
                obj = JSON.parse(body);
                callback(false, obj);
            });
        },
    ],
        /*
         * Collate results
         */
        function (err, results) {
            if (err) { console.log(err); res.send(500, "Server Error"); return; }
            res.send({ suc1: results[0], suc2: results[1] });
        }
    );
});

app.post('/sucursal1', function (req, res) {
    request.post({ url: sucursal1 + req.originalUrl, form: req.body }, function (err, response, body) {
        // JSON body
        if (err) {
            console.log(err); res.send(500, err.message);
        }
        res.json(body);
    });
});

app.post('/sucursal2', function (req, res) {
    request.post({ url: sucursal2 + req.originalUrl, form: req.body }, function (err, response, body) {
        // JSON body
        if (err) {
            console.log(err); res.send(500, err.message);
        }
        res.json(body);
    });
});


app.listen(3007, function () {
    console.log("Servidor iniciado en el puerto 3007");
});