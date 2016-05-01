var mongoose = require('mongoose');
var Refaccion = mongoose.model('refacciones');

exports.findAll = function (req, res) {
    Refaccion.find({'marca':'Nissan'},function (err, refacciones) {
        if (err) res.send(500, err.message);

        res.json(refacciones);
    });
};