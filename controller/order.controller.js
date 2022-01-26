require('dotenv').config();
const Sequelize = require('sequelize')
const connection = require("../config/config")
const orderModel = require('../models/pedidos')(connection, Sequelize);
const { Op } = require("sequelize");
const productsModel = require('../models/productos')(connection, Sequelize);
const productsOrderModel = require('../models/products_order')(connection, Sequelize);
const token = require('../middlewares/usuarios')
const usersModel = require('../models/usuarios')(connection, Sequelize);

let lastId;
const listOrder = async() => await orderModel.findAll();

const userOrder = async(req, res) => {
    console.log("entrando al controlador");
    
    let desencripToken = token.consumirToken(req.headers.authorization)
    console.log("desencripToken", desencripToken);
    
    const userId = await usersModel.findOne({
        where:{
            idUser : desencripToken
        }
    })
    //console.log("idUser", userId.dataValues);
    
    if(userId== null){
        res.json({msj: "token no valido"})
    }else{
        const orderXuser = await orderModel.findAll({
            where: {
                id_user_order : desencripToken
            }
        })

        //console.log("orderXuser", orderXuser);
        res.status(200).json({orderXuser})
    }
}

const createOrder = async(req,res) => {
    let totalOrder = 0;
    let desencripToken = token.consumirToken(req.headers.authorization)
    console.log("desencripToken", desencripToken);
    
    let newProductos = req.body.productos 
    console.log("req.body.productos.length", newProductos.length)
    
    for(let i = 0 ; i<req.body.productos.length; i++){
        const priceProduct =   await productsModel.findOne({
            where:{
                idProduct: req.body.productos[i]
            }
        })
        
         console.log("orderP1", priceProduct.dataValues)
         let precioU = priceProduct.dataValues.productPrice;
         console.log("precioU", precioU)
         let auxprecio = precioU

         let cant = req.body.productos.length
         console.log("cant", cant)

         totalProduct = precioU
         console.log("totalProduct", totalProduct)

         totalOrder = totalOrder + totalProduct
         console.log("totalorder",totalOrder)
    }
    
        const orderData = await orderModel.create({
            id_user_order : desencripToken,
            idMethodPay_order : req.body.idPays,
            id_state_order : 1,
            price_order: totalOrder,
            addres_order: req.body.direccion,
            
        })
        
        
         console.log('orderDataID', orderData.dataValues);
        
    //     console.log('orderDataNull', orderData.null)
    //     console.log("order", req.body)
        
        

        for(let i = 0 ; i<req.body.productos.length; i++){
            //console.log('prod.cant', req.body.productos[i].id)
            const priceProduct =   await productsModel.findOne({
                where:{
                    idProduct: req.body.productos[i]
                }
            });
        let precioU = priceProduct.dataValues.productPrice;
        let cant = req.body.productos.length
        totalProduct = precioU * cant
        // auxPrice = auxPrice + totalProduct;

            const prodOrder = await productsOrderModel.create({
            
                id_order : orderData.null,
                id_product : req.body.productos[i],
                quantity: 1,
                price : precioU
        })
    }

     const resultado = await orderData.save();
    //console.log("resultado", resultado.dataValues)
    return orderData;

}



const updateOrder = async(req,res) => {
    let totalOrder = 0 ;

    for(let i = 0 ; i<req.body.productos.length; i++){
        const priceProduct =   await productsModel.findOne({
            where:{
                idProduct: req.body.productos[i]
            }
        });
        
        //console.log("orderP1", priceProduct.dataValues)
        let precioU = priceProduct.dataValues.productPrice;
        //console.log("precioU", precioU)
        let auxprecio = precioU

        let cant = req.body.productos.length
        //console.log("cant", cant)

        totalProduct = precioU
        //console.log("totalProduct", totalProduct)

        totalOrder = totalOrder + totalProduct
        //console.log("totalorder",totalOrder)
    }
    
    const updateId = await orderModel.findOne({
        where: {
            idOrder: parseInt(req.params.id_order)
        }
    })
    

    
    if(!updateId){
        console.log("Pedido no existe")
    }
    else{
        if(updateId.id_state_order > 1){
            res.json({state: "el pedido ya no puede ser modificado"})
        }else{
            const result = await orderModel.update({
                    idMethodPay_order : req.body.idPays,
                    addres_order  : req.body.direccion,
                    price_order : totalOrder
            },{
                where:{
                    idOrder: parseInt(req.params.id_order)
                }
            })
        }
    }


    const updateProduc = await productsOrderModel.findAll({
        where: {
            id_order: parseInt(req.params.id_order)
        }
    })

    if(!updateProduc) console.log("id no encontrado")
    else{

        const delOrderProd = await productsOrderModel.destroy({
            where:{
                id_order: parseInt(req.params.id_order)
            }
        })

        for(let i = 0 ; i<req.body.productos.length; i++){
            console.log('prod.cant', req.body.productos.length)
            const priceProduct =   await productsModel.findOne({
                where:{
                    idProduct: req.body.productos[i]
                }
            });
            console.log("priceProduct", priceProduct.dataValues.productPrice);
            
        let precioU = priceProduct.dataValues.productPrice;
    
            const prodOrder = await productsOrderModel.create({
                id_order: parseInt(req.params.id_order),
                id_product : req.body.productos[i],
                quantity : 1,
                price : precioU
                }/*,{
                    where:{
                        id_order: parseInt(req.params.id_order)
                }
                }*/)
            }
            return res.status(200).json({'msg': updateProduc})
   
    }


    }
module.exports = {listOrder,
                  userOrder,
                  createOrder,
                  updateOrder}