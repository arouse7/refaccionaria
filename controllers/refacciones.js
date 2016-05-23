var mongoose = require('mongoose');
var Refaccion = mongoose.model('refacciones');

exports.find = function (req, res) {
    console.log(req.query);
    // console.log(req.query['refaccion.nombre']);
    // Refaccion.find(req.query, 'refaccion', function (err, refactions) {
    //     if (err) res.send(500, err.message);

    //     res.json(refactions);
    // });
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