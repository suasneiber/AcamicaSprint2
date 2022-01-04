const produc_orderModel = (connection, Sequelize) => { 
    const orderProduct = connection.define(
    "products_order",
        {
            id_produt_order: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            id_order: {
                type: Sequelize.INTEGER,
                references: 'orders',
                referencesKey: 'idOrder'
            },
            id_product: {
                type: Sequelize.INTEGER,
                references: 'productos',
                referencesKey: 'idProductos'
            },
            quantity: {
                type: Sequelize.INTEGER,
            },
            price: {
                type: Sequelize.INTEGER,
            },
        },
        {
            timestamps: false,
        }
    );
        return orderProduct;
};

    module.exports = produc_orderModel;
