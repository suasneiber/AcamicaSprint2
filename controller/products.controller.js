require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/config");
const productsModel = require('../models/productos')(connection, Sequelize);
const producto = require('../models/productos')

const listProducts = async () => await productsModel.findAll();

const createProduct = async (req) => {
    const productDetails = await productsModel.build({
        productName: req.body.nombre,
        productPrice: req.body.precio,
    });
  
    const result = await productDetails.save();
    return result;
  }

  const updateProduct = async (req,res) => {
    const id_prd = await productsModel.findOne({
      where:{
        idProduct: parseInt(req.params.id)
      }
    });

    if(!id_prd){
      return res.status(404).json({msj: "producto no encontrado"})
    }
    console.log("id_prd, ",id_prd.dataValues.idProduct)
    const result = await productsModel.update({
          productName: req.body.nombre,
          productPrice: req.body.precio,
          
      },
      { where: { idProduct: id_prd.dataValues.idProduct } }
    );
    return res.status(200).json({msj: "producto modificado"});;
  }
  
  const deleteProduct = async (req,res) => {
   try {
    const id_prd = await productsModel.findOne({
      where:{
        idProduct: parseInt(req.params.id)
      }
    });

    if(!id_prd){
      return res.status(404).json({msj: "producto no encontrado"})
    }
   
    console.log("prd", id_prd.dataValues.idProduct)
    const result = await productsModel.destroy({
        where: { idProduct: id_prd.dataValues.idProduct  }  // o id_prd.dataValues.idProduct
      });
    return res.status(200).json({msj: "producto eliminado"});
   } catch (error) {
     res.status(500).json({mensaje: error})
   }
  }
  
  
module.exports = {listProducts, 
                  createProduct,
                  updateProduct,
                  deleteProduct}
