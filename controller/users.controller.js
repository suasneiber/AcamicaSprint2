require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/config");
const userModel = require('../models/usuarios')(connection, Sequelize);
const { Op } = require("sequelize");

const listUsers = async () => await userModel.findAll();

const userLogin = async (req, res) => {
    const userDetail = await userModel.findOne({
        where:{
            [Op.and]: [
                {user_email: req.body.email},
                {user_password: req.body.password}
            ]
        }
    });
    if(!userDetail){
        return res.status(400).json({msj: "datos inexistentes"})
    }
    
    return res.status(200).json({msj: "inicio de sesion exitoso"});
}

const createUser = async (req) => {

    const findUsers = await userModel.findOne({
        where:{
            [Op.or]:
            [{ user_email: req.body.email },
             {username : req.body.username}]
        }
    });
        if(findUsers == null){
            const dataUser = await userModel.build({
                username : req.body.username,
                username_name : req.body.name,
                user_email : req.body.email,
                user_tel : req.body.tel,
                user_address : req.body.address,
                user_password : req.body.password,
                user_idRol : req.body.rol,
            });
             const result = await dataUser.save()
             return result;
        }
        else{
            res.json('Usuario duplicado, intente otro')
        }
}

const updateUser = async (req, res) =>  {
    const idUser = await userModel.findOne({
        where:{
            idUser: parseInt(req.params.id_user)
        }
    });
    if(!idUser){
        return res.status(404).json({msj: "usuario no encontrado"})
    } 

    const result = await userModel.update({
        username : req.body.username,
        username_name : req.body.username_name,
        user_email : req.body.user_email,
        user_tel : req.body.user_tel,
        user_address : req.body.user_address,
        user_password : req.body.user_password,
        user_idRol :req.body.user_idRol
    },
    { 
        where: { idUser: req.params.id_user } 
    })
    return res.status(200).json({msj: "usuario modificado"});
}

const deleteUser = async(req, res) => {
    const id_user = await userModel.findOne({
        where:{
            idUser: parseInt(req.params.id_user)
        }
    }) 
    if(!id_user) return res.status(404).json({msj: "Usuario no encontrado"})

    const result = await userModel.destroy({
        where: {idUser : id_user.dataValues.idUser}
    })
    return res.status(200).json({msj: "Usuario eliminado"});
}

module.exports = {listUsers,
                  userLogin,
                  createUser,
                  updateUser,
                  deleteUser};