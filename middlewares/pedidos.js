const pedidos = require('../models/pedidos')

function validar_indice (req, res, next){
    if(req.body.indice >= 0 && req.body.indice < pedidos.length){
        console.log("el indice si existe")
        next();
    }
    else{
        return res.status(500).json({"indice": "invalido"});
    }
}
module.exports = validar_indice;