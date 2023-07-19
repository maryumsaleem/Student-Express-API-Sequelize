const  DataTypes  = require('sequelize');
const sequelize = require('../db.js');

const Role = sequelize.define('role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  
},{
    timestamps: false, // Disable the default createdAt and updatedAt columns
  });

module.exports = Role;
