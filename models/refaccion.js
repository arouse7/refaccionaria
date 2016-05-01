exports = module.exports = function (app, mongoose) {

    var refaccionesSchema = new mongoose.Schema({
        marca: String,
        tipo: String,
        modelo: String,
        anho: Number,
        sucursal: String,
        refaccion: [{
            nombre: String,
            fabricante: String,
            precio: Number,
            descripcion: String,
            garantia: String
        }]

    });

    mongoose.model('refacciones', refaccionesSchema);
};