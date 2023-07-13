const { DataTypes } = require('sequelize');
const sequelize = require('../db');
//const User = require('./User');


//defining a model
const Student = sequelize.define('student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is required!',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Please enter a valid email address',
      },
    },
  },
  rollno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Rollno is required!',
      },
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  timestamps: false, // Disable the default createdAt and updatedAt columns
});
// Define the association
//Student.belongsTo(User, { foreignKey: 'id' });


module.exports = Student;
