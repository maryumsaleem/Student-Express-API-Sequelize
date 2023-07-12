const apiFeatures = require("../utils/apiFeatures");
const { studentStatuses, success, fail } = require("../utils/Constants");
const Student = require("../models/Student");

exports.addStudent = async (req, res) => {
  try {
    const { name, email, rollno } = req.body;
    const student = await Student.create({ name, email, rollno });
    res.status(201).json({ status: fail, data: { student } });
  } catch (error) {
    res.status(400).json({ status: fail, message: error.message });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const features = new apiFeatures(Student, req.query);
    const filteredFeatures = features.filter().paginate().sort().limitFields();
    const students = await filteredFeatures.query;
    res.status(200).json({
      status: success,
      results: students.length,
      data: {
        students,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ status: fail, message: err.message });
  }
};

exports.singleStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    res.status(200).json({
      status: success,
      data: {
        student,
      },
    });
  } catch (err) {
    res.status(401).json({ status: fail, message: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({
        status: fail,
        message: studentStatuses.invalidId,
      });
    }
    await student.update(data);
    res.status(200).json({
      status: success,
      data: student,
    });
  } catch (err) {
    res.status(400).json({
      status: fail,
      message: err.message,
    });
  }
};

exports.removeStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({
        status: fail,
        message: studentStatuses.invalidId,
      });
    }
    await student.destroy();
    res.status(200).json({
      status: success,
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: fail,
      message: err.message,
    });
  }
};
