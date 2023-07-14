const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const bcrypt = require('bcrypt');
const Student = require('./Student');

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
  role: {
    type: DataTypes.ENUM('user', 'lead', 'admin'),
    defaultValue: 'user',
  },
});

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  user.password = hashedPassword;
});

// Define the association
User.belongsTo(Student, { foreignKey: 'id' });

module.exports = User;
