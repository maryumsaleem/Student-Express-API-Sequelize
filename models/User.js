const DataTypes  = require('sequelize');
const sequelize = require('../db.js');
const bcrypt = require('bcrypt');
const Role = require('./Roles'); // Add this line to include the Role model

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, Infinity],
    },
  },
});

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  user.password = hashedPassword;
});

// Define the association
User.belongsTo(Role, { foreignKey: 'roleId' }); // Add this line to associate users with roles

module.exports = User;
