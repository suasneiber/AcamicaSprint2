const express = require('express');
const router = express.Router();
require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require('../config/config')
const usuarios = require('../models/usuarios')
const pagos = require('../models/pagos')
const validar_indice = require('../middlewares/pagos')
const midUsuario = require('../middlewares/usuarios')
const paysController = require('../controller/pays.controller')
/**
 * @swagger
 * /pagos:
 *  get:
 *    description: Lista todos los Pagos
 *    responses:
 *      200:
 *        description: Success
 */
 router.get('/', midUsuario.auth  ,function(req, res, next){
    paysController.listPays()
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
 * /pagos/:
 *  post:
 *    description: Crear Medio de Pago
 *    parameters:
 *    - name: medio
 *      description: medio de pago
 *      in: formData
 *      required: true
 *      type: string
 *    - name: username
 *      description: usuario rol
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */

router.post('/', midUsuario.auth, function(req, res){
    let nuevoPago = {}

    const idPago = pagos[parseInt(pagos.length - 1)].id + 1;
    if(midUsuario.validar_admin){
        nuevoPago.id = idPago;
        nuevoPago.medio = req.body.medio;

        pagos.push (nuevoPago)
        res.send('medio de pago creado.')
    }

})


/**
 * @swagger
 * /pagos:
 *  put:
 *    description: Modificar Medio de Pago
 *    parameters:
 *    - name: indice
 *      description: id del medio de pago a modificar
 *      in: formData
 *      required: true
 *      type: string
 *    - name: medio
 *      description: medio de pago
 *      in: formData
 *      required: true
 *      type: string
 *    - name: username
 *      description: perfil de usuario
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.put('/', validar_indice ,midUsuario.auth, function(req, res){
    
        pagos[req.body.indice].medio = req.body.medio
        res.send('medio de pago modificado.')
   
})



/**
 * @swagger
 * /pagos:
 *  delete:
 *    description: eliminar Medio de pago
 *    parameters:
 *    - name: indice
 *      description: id del medio de pago a eliminar
 *      in: formData
 *      required: true
 *      type: string
 *    - name: username
 *      description: perfil de usuario
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */

router.delete('/', validar_indice, midUsuario.auth, function(req, res){
    pagos.splice(req.body.indice, 1);
    res.send('Medio de Pago Eliminado')
})
module.exports = router;