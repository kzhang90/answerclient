const validator = require("validator");
const _ = require('lodash');

function validateInput(data) {
  const errors = {};

  if (validator.isEmpty(data.username)) {
    errors.username = "This field is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "This field is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "This field is required";
  }
  if (validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "This field is required";
  }
  if (!validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Passwords must match.";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}
// exports.default did not work
module.exports = validateInput;