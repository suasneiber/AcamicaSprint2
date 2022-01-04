const paysModel = (connection, Sequelize) => {
    const pays = connection.define(
      "medios_de_pago",
      {
        idPays: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        pays_name: {
          type: Sequelize.STRING,
        },
    },
        {
            timestamps: false,
        }
    );
    return pays;
  };
  
  module.exports = paysModel;
  