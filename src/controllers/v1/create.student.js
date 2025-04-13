const Student = require('../../models/Student');
const { ErrorHandler } = require('../../utils');

module.exports = async (req, res, next) => {
  try {
    const body = req.body.student;
    const newStudent = await Student.create(body);
    return res.success(newStudent.toJSON());
  } catch (error) {
    return res.serverError(500, ErrorHandler(error));
  }
};
