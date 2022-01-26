require("dotenv").config();
const md5 = require('md5');
const Sequelize = require('sequelize');
const connection = require("../config/config");
const userModel = require('../models/usuarios')(connection, Sequelize);
const jwt = require('jsonwebtoken'); 
let token = "";

const autUser = async (req, res) => {
    let compararPass =  md5(req.body.password)
    
    const email = await userModel.findOne({
        where:{
            user_email : req.body.email,
            user_password : compararPass
        }
    });


    if(email){
        const payload = {
            usuario: {
                id: email.idUser,
                rol: email.user_idRol
            }
        }
        token = jwt.sign(payload, process.env.secretJWT, {
           
        })
        res.status(200).json({token})
    }else{
        res.status(403).json({msg: "datos incorrectos"})
    }

}

const consumirToken = (req, res, next) => {
    try {
        let cleantoken = token;
        cleantoken = cleantoken.replace('Bearer ', '');
        const detoken = jwt.verify(cleantoken, process.env.secretJWT);
        idUsuario = detoken.usuario.id
        console.log("contenido de token", idUsuario);
        
        return idUsuario;
    } catch (error) {
        res.json({msg: "Error de Token"});
    }
}
const auth = (req, res, next) => {
    try {
        let cleantoken = token;
        cleantoken = cleantoken.replace('Bearer ', '');
        const detoken = jwt.verify(cleantoken, process.env.secretJWT);
        idUsuario = detoken.usuario.id;
        
        return next();
    } catch (error) {
        res.json({msg: "Error de Token"});
    }
}


const firmaToken = (token) => {
    let desToken = autUser(token)
    
    if (desToken != false) {
        return desToken;
    } else {
        return false;
    }

}
const authAdmin = (req, res, next) => {
    try {
        let cleantoken = token;
        cleantoken = cleantoken.replace('Bearer ', '');
        const detoken = jwt.verify(cleantoken, process.env.secretJWT);
        console.log("detoken", detoken)
        if(detoken.usuario.rol == 1){
            return next();
        }else{
                res.json({msg: "no tenes permiso de administrador"})
        }
    } catch (error) {
        res.json({msg: "No iniciaste sesión"});
    }
}

module.exports = {autUser,
                  consumirToken,
                  firmaToken,
                  auth, authAdmin};