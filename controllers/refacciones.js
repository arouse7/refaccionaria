var mongoose = require('mongoose');
var Refaccion = mongoose.model('refacciones');

exports.find = function (req, res) {
    console.log(req.query);
    var projection = {
        $project: {
            refaccion: {
                $filter: {
                    input: '$refaccion',
                    as: 'ref',
                    cond: {
                        $eq: ['$$ref.nombre', req.query['refaccion.nombre']]
                    }
                }
            },
            sucursal: 1
        }
    };
    Refaccion.aggregate([{ $match: req.query }, projection], function (err, refactions) {
        if (err) res.send(500, err.message);

        res.json(refactions);
    });
};

exports.update = function (req, res) {
    console.log('---update');
    console.log(req.body);
    var up = Number(req.body['refaccion.existencia']) - 1;
    var refac = {
        marca: req.body.marca,
        tipo: req.body.tipo,
        modelo: req.body.modelo,
        // 'refaccion.nombre': req.body['refaccion.nombre'],
        'refaccion.fabricante': req.body['refaccion.fabricante'],
        // 'refaccion.existencia': Number(req.body['refaccion.existencia'])
    }

    req.db.collection('refacciones').update(refac,
        { $set: { "refaccion.$.existencia": up } },
        function (err, refactions) {
            if (err) res.send(500, err.message);
            
            res.json(refactions);
        });

};