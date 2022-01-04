const orderModel = (connection, Sequelize) => {
    
    const Orders = connection.define(
    "orders",
        {
            idOrder: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            id_user_order: {
                type: Sequelize.INTEGER,
                references: 'users',
                referencesKey: 'idUser'
            },
            idMethodPay_order: {
                type: Sequelize.INTEGER,
                references: 'medios_de_pago',
                referencesKey: 'idPays'
            },
            id_state_order: {
                type: Sequelize.INTEGER,
                references: 'order_status',
                referencesKey: 'idOrder'
            },
            price_order: {
                type: Sequelize.INTEGER,
            },
            addres_order: {
                type: Sequelize.STRING,
            },
        },
        {
            timestamps: false,
        }
    );
        return Orders;
};

    module.exports = orderModel;
