const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
//load env vars
dotenv.config({ path: "../config/config.env" });
const { authMessages, success, fail } = require("../utils/Constants");

exports.Signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    const token = jwt.sign({ id: newUser.id }, process.env.LOGIN_TOKEN);
    res.status(200).json({
      status: success,
      data: {
        user: newUser,
        token,
      },
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        status: fail,
        message: authMessages.duplicateUser,
      });
    } else {
      res.status(400).json({
        status: fail,
        message: err.message,
      });
    }
  }
};

exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: fail,
        message: authMessages.requiredEmail,
      });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        status: fail,
        message: authMessages.requiredUser,
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        status: fail,
        message: authMessages.validEmail,
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.LOGIN_TOKEN);
    res.status(200).json({
      status: success,
      token,
      message: authMessages.loggedIn,
    });
  } catch (err) {
    res.status(400).json({
      status: fail,
      message: err.message,
    });
  }
};
