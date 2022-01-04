const productsModel = (connection, Sequelize) => {
    const Productos = connection.define(
      "productos",
      {
        idProduct: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        productName: {
            type: Sequelize.STRING,
            },
        productPrice: {
          type: Sequelize.INTEGER,
        },
      },
      {
        timestamps: false,
      }
    );
    return Productos;
  };
  
  module.exports = productsModel;
  