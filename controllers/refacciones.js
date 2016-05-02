var mongoose = require('mongoose');
var Refaccion = mongoose.model('refacciones');

exports.find = function (req, res) {
    console.log(req.query);
    Refaccion.find(req.query ,function (err, refactions) {
        if (err) res.send(500, err.message);

        res.json(refactions);
    });
};