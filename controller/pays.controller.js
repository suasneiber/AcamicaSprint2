require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/config");
const paysModel = require('../models/pagos')(connection, Sequelize);
const { Op } = require("sequelize");

const listPays = async () => await paysModel.findAll(); 

const paysCreate = async (req, res) => {
    console.log("medio de pago", req.body.medio);
    
    const info = req.body.medio;

    if(!info){
        res.json({error: 'debe introducir un nombre'})
    }else{
        const dataPays = await paysModel.create({
            pays_name : info
        })
    }

    res.status(200).json({msg: "Metodo de pago creado"})
}

module.exports = {listPays,
                  paysCreate};