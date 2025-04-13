const Joi = require('joi');
module.exports.createStudent = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional(),
  role: Joi.string().valid('monitor', 'student').required(),
});
