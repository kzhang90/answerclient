const validator = require('validator');
const _ = require('lodash');

function validateInput(data) {
  const errors = {};
  if (validator.isEmpty(data.identifier)) {
    errors.identifier = "This field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "You must enter a password";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}

module.exports = validateInput;