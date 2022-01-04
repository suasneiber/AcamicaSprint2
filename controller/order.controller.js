require('dotenv').config();
const Sequelize = require('sequelize')
const connection = require("../config/config")
const orderModel = require('../models/pedidos')(connection, Sequelize);
const { Op } = require("sequelize");
const productsModel = require('../models/productos')(connection, Sequelize);
const productsOrderModel = require('../models/products_order')(connection, Sequelize);

let lastId;
const listOrder = async() => await orderModel.findAll();

const userOrder =async(req) => {
    const orderXuser = await orderModel.findAll({
        where:{id_user_order: req.body.id_user}
    });
    return orderXuser;
}

const createOrder = async(req,res) => {
    let totalOrder = 0 ;

    for(let i = 0 ; i<req.body.productos.length; i++){
        const priceProduct =   await productsModel.findOne({
            where:{
                idProduct: req.body.productos[i].id
            }
        });
        
        console.log("orderP1", priceProduct)
        let precioU = priceProduct.dataValues.productPrice;
        console.log("precioU", precioU)

        let cant = req.body.productos[i].cantidad
        console.log("cant", cant)

        totalProduct = precioU * cant
        console.log("totalProduct", totalProduct)

        totalOrder = totalOrder + totalProduct
        console.log("totalorder",totalOrder)
    }
        const orderData = await orderModel.create({
            id_user_order : req.body.idUser,
            idMethodPay_order : req.body.idPays,
            id_state_order : 1,
            price_order: totalOrder,
            addres_order: req.body.direccion,
            
        })
        
        
        
        console.log('orderDataNull', orderData.null)
        //console.log("order", req.body)
        
        

        for(let i = 0 ; i<req.body.productos.length; i++){
            console.log('prod.cant', req.body.productos[i].id)
            const priceProduct =   await productsModel.findOne({
                where:{
                    idProduct: req.body.productos[i].id
                }
            });
        let precioU = priceProduct.dataValues.productPrice;
        let cant = req.body.productos[i].cantidad
        totalProduct = precioU * cant
        // auxPrice = auxPrice + totalProduct;

            const prodOrder = await productsOrderModel.create({
            
                id_order : orderData.null,
                id_product : req.body.productos[i].id,
                quantity : cant,
                price : totalProduct
        })
    }

    const resultado = await orderData.save();
    console.log("resultado", resultado)
        return orderData;

}



const updateOrder = async(req,res) => {
    let totalOrder = 0 ;

    for(let i = 0 ; i<req.body.productos.length; i++){
        const priceProduct =   await productsModel.findOne({
            where:{
                idProduct: req.body.productos[i].id
            }
        });
        
        console.log("orderP1", priceProduct)
        let precioU = priceProduct.dataValues.productPrice;
        console.log("precioU", precioU)

        let cant = req.body.productos[i].cantidad
        console.log("cant", cant)

        totalProduct = precioU * cant
        console.log("totalProduct", totalProduct)

        totalOrder = totalOrder + totalProduct
        console.log("totalorder",totalOrder)
    }
    console.log("pago", req.body.idPays, "direccion", req.body.direccion)
    const updateId = await orderModel.findOne({
        where: {
            idOrder: req.params.id
        }
    })
    console.log(updateId.price_order)

    console.log("data", updateId.price_order)
    if(!updateId) console.log("Pedido no existe")
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
                    idOrder: req.params.id
                }
            })
        }
    }


    const updateProduc = await productsOrderModel.findAll({
        where: {
            id_order: req.params.id
        }
    })

    if(!updateProduc) console.log("id no encontrado")
    else{
        const borrarId = await productsOrderModel.destroy({
            where: {id_order : req.params.id}
        })
    }

    for(let i = 0 ; i<req.body.productos.length; i++){
        console.log('prod.cant', req.body.productos[i].id)
        const priceProduct =   await productsModel.findOne({
            where:{
                idProduct: req.body.productos[i].id
            }
        });
    let precioU = priceProduct.dataValues.productPrice;
    let cant = req.body.productos[i].cantidad
    totalProduct = precioU * cant
    // auxPrice = auxPrice + totalProduct;

        const prodOrder = await productsOrderModel.create({
        
            id_order : req.params.id,
            id_product : req.body.productos[i].id,
            quantity : cant,
            price : totalProduct
    })
}


return res.json({id: req.params.id});
    }
module.exports = {listOrder,
                  userOrder,
                  createOrder,
                  updateOrder}