require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/config");
const userModel = require('../models/usuarios')(connection, Sequelize);
const jwt = require('jsonwebtoken'); 
let token = "";

const autUser = async (req, res) => {
    const email = await userModel.findOne({
        where:{
                user_email : req.body.email,
                user_password : req.body.password
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
// function auth(req, res, next)   {
//      // Leer el token del header
    
//     let token =  req.headers['x-access-token'] || req.headers['authorization']
//     console.log("token es : ", token)

//     //Revisar si no hay token
//     if (!token) {
//         return res.status(401).json({msg: 'No hay token, permiso no válido'})
//     }

//     if(token.startsWith('Bearer ')){
//         token= token.slice(7, token.length)
//         console.log("token nuevo es : ", token)
//     }

//      // Validar el token
    
    
     
//         //  if(token){
//         //      jwt.verify(token, process.env.secretJWT), (error, decoded) => {
//         //          if(error){
//         //              return res.json({
//         //                  message: "el token no es válido "
//         //              })
//         //          }else{
//         //              res.decoded = decoded;
//         //              next()
//         //          }
//         //      }
//         //  }
//         //  const cifrado = jwt.verify(token, process.env.secretJWT)        
//         //  req.usuario= cifrado.usuario
//         //  console.log(cifrado);
//         // next()
     
//      //    res.status(401).json({msg: 'Token no válido'})
     
// }
const auth = (req, res, next) => {
    try {
        let cleantoken = token;
        cleantoken = cleantoken.replace('Bearer ', '');
        const detoken = jwt.verify(cleantoken, process.env.secretJWT);
        next();
    } catch (error) {
        res.json({msg: "Error de Token"});
    }
}
const authAdmin = (req, res, next) => {
    try {
        let cleantoken = token;
        cleantoken = cleantoken.replace('Bearer ', '');
        const detoken = jwt.verify(cleantoken, process.env.secretJWT);
        console.log("detoken", detoken)
        if(detoken.usuario.rol == 1){
            console.log("prueba si entra")
            return next();
        }else{
            res.json({msg: "no tenes permiso de administrador"})
        }
    } catch (error) {
        res.json({msg: "Error de Token"});
    }
}

module.exports = {autUser,
                  auth, authAdmin};