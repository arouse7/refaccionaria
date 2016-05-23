var express = require('express');
var app = express();
var morgan = require('morgan');
var request = require('request');
var async = require('async');

app.use(morgan('dev'));


//permitir la consulta desde localhost
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Petición get 
app.get('/refacciones', function (req, res) {
    async.parallel([
        /*
         * First external endpoint
         */
        function (callback) {
            var url = 'http://localhost:3000'+req.originalUrl;
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
            var url = 'http://localhost:3001'+req.originalUrl;
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

app.listen(3007, function () {
    console.log("Servidor iniciado en el puerto 3007");
});