const orderStatusModel = (connection, Sequelize) => {;
    const orderStatus = connection.define(
    "order_status",
        {
            idOrder: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            order_name: {
                type: Sequelize.STRING,
            },
        },
        {
            timestamps: false,
        }
    );
        return orderStatus;
};

    module.exports = orderStatusModel;
