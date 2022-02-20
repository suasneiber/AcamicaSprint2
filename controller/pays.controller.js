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

const updatePay = async (req, res) => {
    console.log("data", req.body);
    const newName = req.body.newName
    const newData = await paysModel.findOne({
        where: {
                idPays : req.body.idPay
                }
    })
    if(!newData) res.status(404).json({alert: "lo sentimos, el ID de pago no se encotró"})

    else{        
        const update = await paysModel.update({
            pays_name : newName },
            {where:
                {
                    idPays : req.body.idPay
                }
            } 
        )
        res.status(200).json({msg: 'Medio de pago modificado'})
    }
}

const payDelete = async (req, res) => {
    console.log("data", req.body);
    idPay = req.body.idPay;
    const data = await paysModel.findOne({
        where: {idPays : idPay}
    })
    
    if(!data) res.status(404).json({msg: 'No se pudo encontrar el ID'})

    else{
        const id = await paysModel.destroy({
            where: {
                idPays : idPay
            }
        })
    }
    res.status(200).json({msg: 'a ver que pasa'})
}
module.exports = {listPays,
                  paysCreate,
                  updatePay,
                  payDelete};