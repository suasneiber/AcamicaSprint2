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
    // res.send({"usuarios": usuarios})
    // console.log("usuarios")

    
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
    // let user = req.body.username;
    // let email = req.body.email;
    // let contraseña = req.body.password;

    // let validarLogin = usuarios.find(usuario => usuario.password === contraseña && usuario.email === email); 
    // let idUser = usuarios.filter(usuarios => usuarios.email === email)
    usersController.userLogin(req, res)

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
 * /usuarios/:
 *  post:
 *    description: Crear Usuario
 *    parameters:
 *    - name: username
 *      description: username
 *      in: formData
 *      required: true
 *      type: string
 *    - name: Lastname
 *      description: lastname
 *      in: formData
 *      required: true
 *      type: string
 *    - name: email
 *      description: Email user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: email confirm
 *      description: EmailConfirm
 *      in: formData
 *      required: true
 *      type: string
 *    - name: phone
 *      description: phone user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: address
 *      description: address user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: password
 *      in: formData
 *      required: true
 *      type: string
 *    - name: perfil
 *      description: perfil
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.post('/createUser' ,function(req, res){  //Crear usuario nuevo
    // let email = req.body.email;
    // let validar_email = usuarios.find(usuario => usuario.email === email)
    // console.log(email)
    
        // usuarios.push(req.body)
        // res.send('usuario Creado')

        usersController.createUser(req)
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
 * /usuarios/:
 *  put:
 *    description: modificar usuario
 *    parameters:
 *    - name: indice
 *      description: indice usuario
 *      in: formData
 *      required: true
 *      type: string
 *    - name: username
 *      description: username
 *      in: formData
 *      required: true
 *      type: string
 *    - name: lastname
 *      description: lastname
 *      in: formData
 *      required: true
 *      type: string
 *    - name: email
 *      description: Email user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: tel
 *      description: phone user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: address
 *      description: address user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: password
 *      in: formData
 *      required: true
 *      type: string
 *    - name: perfil
 *      description: perfil
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.put('/updateUser/:id_user', /*validar_indice,  */ function(req, res){  //actualizar usuario
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
 * /usuarios/:
 *  delete:
 *    description: eliminar usuario
 *    parameters:
 *    - name: indice
 *      description: indice usuario
 *      in: formData
 *      required: true
 *      type: string
 *    - name: username
 *      description: username perfil
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.delete('/delete/:id_user', validation.auth, function(req, res){
    // usuarios.splice(req.body.indice, 1);
    // res.send('Usuario Eliminado')
    usersController.deleteUser(req, res)
    // .then(() => {
    //     res.status(200).send({
    //         status: 200,
    //         message: "Data Delete Successfully",
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

module.exports = router;