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

/**
 * @swagger
 * /pedidos/porusuario:
 *  get:
 *    description: Lista todos los Pedidos Por usuario
 *    parameters:
 *      - name: authorization
 *        desccription: token de usuario
 *        in: header
 *        required: false
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 */
 router.get('/porusuario', midUsuario.auth,  function(req, res){
    ordersController.userOrder(req, res)
    // .then((result) => {
    //     res.status(200).send({
    //         status:200,
    //         message: "Data find Successfully",
    //         data: result
    //     });
    // })
    // .catch(error => {
    //     res.status(400).send({
    //       message: "Unable to find data",
    //       errors: error,
    //       status: 400
    //     });
    //   });

})

/**
 * @swagger
 * /pedidos/crearpedido:
 *  post:
 *    description: Crear Pedido
 *    parameters:
 *      - name: authorization
 *        desccription: token de usuario
 *        in: header
 *        required: false
 *        type: string
 *      - name: idPays
 *        description: idMethodPay_order
 *        in: formData
 *        type: integer
 *        required: true
 *      - name: direccion
 *        description: user address
 *        in: formData
 *        type: string
 *        required: true
 *      - name: productos[]
 *        description: id del producto a pedir
 *        in: formData
 *        collectionFormat: multi
 *        type: array
 *        properties:
 *          id:
 *          type: integer
 *        required: true
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
 * /pedidos/modificar/{id_order}:
 *  put:
 *    description: Modificar Pedido
 *    parameters:
 *    - name: id_order
 *      description: id de pedido
 *      in: path
 *      required: true
 *      type: string
 *    - name: productos[]
 *      description: id de productos
 *      in: formData
 *      collectionFormat: multi
 *      type: array
 *      properties:
 *        id:
 *        type: integer
 *      required: true
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
router.put('/modificar/:id_order', midUsuario.auth, function(req, res){
    
    ordersController.updateOrder(req,res)
})

/**
 * @swagger
 * /pedidos/modificarEstado:
 *  put:
 *    description: Modificar Estado
 *    parameters:
 *    - name: orderId
 *      description: id de pedido
 *      in: formData
 *      required: true
 *      type: string
 *    - name: newState
 *      description: estado de pedido
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.put('/modificarEstado', midUsuario.authAdmin, function(req, res){
    ordersController.updateOrderState(req,res)
})
module.exports = router;
