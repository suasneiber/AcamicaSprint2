require("dotenv").config();
const jwt = require('jsonwebtoken')
const express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const connection = require('../config/config')
const usuarios = require('../models/usuarios')
const {validar_admin, validar_indice} = require('../middlewares/usuarios');
const pedidos = require('../models/pedidos')
const usersController = require('../controller/users.controller')
const validation = require('../middlewares/usuarios')




/**
 * @swagger
 * /usuarios:
 *  get:
 *    description: Lista todos los Productos
 *    responses:
 *      200:
 *        description: Success
 */
router.get('/', validation.authAdmin ,async function(req, res, next){
    let data = await usersController.listUsers()
    res.json(data);
    
});

/**
 * @swagger
 * /usuarios/login:
 *  post:
 *    description: Iniciar sesion
 *    parameters:
 *    - name: email
 *      description: Email user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.post('/login', validation.autUser,  function(req, res,next){
    //usersController.userLogin(req, res)

    /* 
        const cripty = async (data) => {
        let pass = await bcrypt.hash(data, 8);
        return pass;
       }

        //Decrypt password
        const decripty = async (data, old) => {
            let aux = await bcrypt.compare(data, old);
            return aux;

            https://gitlab.com/BONAFO08/sp2/-/blob/main/src/test/test.spec.js
    }*/ 


})


/**
 * @swagger
 * /usuarios/createUser:
 *  post:
 *    description: Crear Usuario
 *    parameters:
 *    - name: username
 *      description: username
 *      in: formData
 *      required: true
 *      type: string
 *    - name: name
 *      description: name
 *      in: formData
 *      required: true
 *      type: string
 *    - name: email
 *      description: email
 *      in: formData
 *      required: true
 *      type: string
 *    - name: emailConfirm
 *      description: emailConfirm
 *      in: formData
 *      required: true
 *      type: string
 *    - name: tel
 *      description: tel
 *      in: formData
 *      required: true
 *      type: string
 *    - name: address
 *      description: address
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: password
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.post('/createUser' ,function(req, res){  //Crear usuario nuevo
        usersController.createUser(req, res)
})

/**
 * @swagger
 * /usuarios/updateUser/{id_user}:
 *  put:
 *    description: modificar usuario
 *    parameters:
 *    - name: id_user
 *      description: ID usuario
 *      in: path
 *      required: true
 *      type: string
 *    - name: username
 *      description: username
 *      in: formData
 *      required: true
 *      type: string
 *    - name: username_name
 *      description: nombre
 *      in: formData
 *      required: true
 *      type: string
 *    - name: user_email
 *      description: Email user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: user_tel
 *      description: phone user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: user_address
 *      description: user_address
 *      in: formData
 *      required: true
 *      type: string
 *    - name: user_password
 *      description: user_password
 *      in: formData
 *      required: true
 *      type: string
 *    - name: user_idRol
 *      description: user_idRol
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.put('/updateUser/:id_user', validation.auth, function(req, res){  //actualizar usuario
    usersController.updateUser(req,res)
    // .then(() => {
    //     res.status(200).send({
    //         status: 200,
    //         message: "Data Update Successfully",
    //         });
    // })
    // .catch(error => {
    //     res.status(400).send({
    //     message: "Unable to insert data",
    //     errors: error,
    //     status: 400
    //     });
    // });
})

/**
 * @swagger
 * /usuarios/delete/{id_user}:
 *  delete:
 *    description: eliminar usuario
 *    parameters:
 *    - name: id_user
 *      description: Id usuario
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */
router.delete('/delete/:id_user', validation.authAdmin, function(req, res){
    usersController.deleteUser(req, res)
})

module.exports = router;