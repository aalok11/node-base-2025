const constants = require('../config/constants');
const { ErrorHandler } = require('../utils');
module.exports.joiBodyMiddleware = (schema, key) => {
  return (req, res, next) => {
    try {
      let requestBody = req.body;
      if (key) {
        requestBody = req.body[key];
        if (!requestBody) {
          res.serverError(400, ErrorHandler(constants.error.bodyEmpty));
        } else {
          const { error } = schema.validate(requestBody);
          if (error) {
            res.serverError(400, ErrorHandler(error));
          } else {
            next();
          }
        }
      }
    } catch (error) {
      res.serverError(404, { error: ErrorHandler(error) });
    }
  };
};
