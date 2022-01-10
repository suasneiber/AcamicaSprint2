const express = require('express');
const router = express.Router();
require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require('../config/config')
const pedidos = require('../models/pedidos');
let usuarios = require('../models/usuarios');
const validar_indice = require('../middlewares/pedidos')
const midUsuario = require('../middlewares/usuarios')
const ordersController = require('../controller/order.controller')
/**
 * @swagger
 * /pedidos:
 *  get:
 *    description: Lista todos los Pedidos
 *    responses:
 *      200:
 *        description: Success
 */
router.get('/', midUsuario.authAdmin,function(req, res){
    ordersController.listOrder()
    .then((result) => {
        res.status(200).send({
            status:200,
            message: "Data find Successfully",
            data: result
        });
    })
    .catch(error => {
        res.status(400).send({
          message: "Unable to find data",
          errors: error,
          status: 400
        });
      });

})

//Puedo traer los pedidos con el ID de usuario

/**
 * @swagger
 * /pedidos/:
 *  post:
 *    description: Mostrar pedidos por Usuario
 *    parameters:
 *    - name: username
 *      description: nombre de usuario
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.post('/orderUser', midUsuario.authAdmin ,function(req, res){
    ordersController.userOrder(req)
    .then((result) => {
        res.status(200).send({
            status:200,
            message: "Data find Successfully",
            data: result
        });
    })
    .catch(error => {
        res.status(400).send({
          message: "Unable to find data",
          errors: error,
          status: 400
        });
      })
})


/**
 * @swagger
 * /pedidos/crearpedido:
 *  post:
 *    description: Crear Pedido
 *    parameters:
 *    - name: idUser
 *      description: ID de usuario
 *      in: formData
 *      required: true
 *      type: string
 *    - name: idPays
 *      description: idMethodPay_order
 *      in: formData
 *      required: true
 *      type: string
 *    - name: total 
 *      description: precio total
 *      in: formData
 *      required: true
 *      type: string
 *    - name: direccion
 *      description: dirección
 *      in: formData
 *      required: true
 *      type: string
 *    - name: productos
 *      description: id de productos
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.post('/crearpedido', midUsuario.auth, function(req, res){
   
    ordersController.createOrder(req, res)
        .then((result) => {
            res.status(200).send({
                status: 200,
                message: "Data Save Successfully",
                data: result
                });
        })
        .catch(error => {
            res.status(400).send({
            message: "Unable to insert data",
            errors: error,
            status: 400
            });
        });
    })


/**
 * @swagger
 * /pedidos/modificar:
 *  put:
 *    description: Modificar Pedido
 *    parameters:
 *    - name: indice
 *      description: indice de pedido
 *      in: formData
 *      required: true
 *      type: string
 *    - name: detalle
 *      description: id de productos
 *      in: formData
 *      required: true
 *      type: string
 *    - name: total 
 *      description: precio total
 *      in: formData
 *      required: true
 *      type: string
 *    - name: medio_de_pago
 *      description: medio de pago
 *      in: formData
 *      required: true
 *      type: string
 *    - name: direccion
 *      description: dirección
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */

router.put('/modificar/:id', midUsuario.auth, function(req, res){
    
    ordersController.updateOrder(req,res)
})

/**
 * @swagger
 * /pedidos/modificarEstado:
 *  put:
 *    description: Modificar Estado
 *    parameters:
 *    - name: indice
 *      description: indice de pedido
 *      in: formData
 *      required: true
 *      type: string
 *    - name: estado
 *      description: estado de pedido
 *      in: formData
 *      required: true
 *      type: string
 *    - name: username
 *      description: rol de usuario
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.put('/modificarEstado', midUsuario.authAdmin, function(req, res){
    pedidos[req.body.indice].estado = req.body.estado;
    
    res.send("Estado modificado")
})
module.exports = router;
