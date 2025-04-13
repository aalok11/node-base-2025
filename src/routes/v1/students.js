const express = require('express');
const router = express.Router();
const studentList = require('../../controllers/v1/students/studentList');
const createUser = require('../../controllers/v1/create.student');
const { joiBodyMiddleware } = require('../../middlewares/joi.middleware');
const joiSchema = require('../../utils/joi.schema');
router.get('/', studentList);
router.post(
  '/',
  joiBodyMiddleware(joiSchema.createStudent, 'student'),
  createUser
);

module.exports = router;
