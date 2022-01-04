const usersModel = (connection, Sequelize) => {
  const users = connection.define(
    "users",
    {
      idUser:{
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
      },
      username_name: {
        type: Sequelize.STRING,
      },
      user_email:{
        type: Sequelize.STRING,
      },
      user_tel: {
        type: Sequelize.INTEGER,
      },
      user_address: {
        type: Sequelize.STRING,
      },
      user_password: {
        type: Sequelize.STRING,
      },
      user_idRol: {
        type: Sequelize.STRING,
        references: 'roles',
        referencesKey: 'idRol'
      },
    },
    {
      timestamps: false,
    }
  )
  return users;
}

module.exports = usersModel;