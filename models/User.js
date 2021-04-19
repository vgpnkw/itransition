const Sequelize = require('sequelize');
const sequelize = new Sequelize("sql11405631", "sql11405631", "ZcEG1h9aNd", {
    dialect: "mysql",
    host: "sql11.freesqldatabase.com",
  });
sequelize.sync()
// sequelize.sync().then(result=>console.log(result))

const User = sequelize.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  register_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  last_login_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  block: {
    type: Sequelize.BOOLEAN,
    allowNull: false
}
  });

module.exports = User;
