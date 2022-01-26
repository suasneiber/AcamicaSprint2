var express = require('express');
var router = express.Router();
//require("dotenv").config();
//const Sequelize = require('sequelize');
//const connection = require('../config/config')
const productosModel = require('../models/productos')
const usuarioValidate = require('../middlewares/usuarios')
const validar_indice = require('../middlewares/productos')
const productsController = require('../controller/products.controller')



/**
 * @swagger
 * /productos:
 *  get:
 *    description: Lista todos los Productos
 *    responses:
 *      200:
 *        description: Success
 */
router.get('/', usuarioValidate.auth, (req, res, next)=> {
    productsController.listProducts()
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
    
     //res.send({poductos: productos,})
})


/**
 * @swagger
 * /productos/:
 *  post:
 *    description: Crear Producto
 *    parameters:
 *    - name: nombre
 *      description: nombre
 *      in: formData
 *      required: true
 *      type: string
 *    - name: precio
 *      description: precio
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.post('/', usuarioValidate.authAdmin , function(req, res, next){


    productsController.createProduct(req)
    .then(() => {
        res.status(200).send({
        status: 200,
        message: "Data Save Successfully",
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
 * /productos/{id}:
 *  put:
 *    description: Modificar Producto
 *    parameters:
 *    - name: id
 *      description: id
 *      in: path
 *      required: true
 *      type: string
 *    - name: nombre
 *      description: nombre
 *      in: formData
 *      required: true
 *      type: string
 *    - name: precio
 *      description: precio
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.put("/:id", usuarioValidate.authAdmin, function(req, res){
    productsController.updateProduct(req, res)
  
})

/**
 * @swagger
 * /productos/{id}:
 *  delete:
 *    description: eliminar Producto
 *    parameters:
 *    - name: id
 *      description: id de producto a eliminar
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.delete('/:id', usuarioValidate.authAdmin, function(req, res){
    
    productsController.deleteProduct(req, res)

})

module.exports = router;