const express = require('express');
const commonValidations = require('../shared/validations/signup');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/user');

const router = express.Router();

// otherValidations will actually be 'commonValidations'
function validateInput(data, otherValidations) {
  // deconstruct and only take errors from otherValidations
  var _otherValidations = otherValidations(data),
      errors = _otherValidations.errors;

// check for duplicates
  return User.query({
    where: { email: data.email },
    orWhere: { username: data.username }
  }).fetch().then(function(user) {
    if (user) {
      if (user.get('username') === data.username) {
        errors.username = 'Duplicate username in database';
      }
      if (user.get('email') === data.email) {
        errors.email = 'Duplicate email in database';
      }
    }
    return {
      errors,
      isValid: _.isEmpty(errors)
    }
  })
}

router.get('/:identifier', function (req, res) {
  User.query({
    // don't want to select password digest
    select: [ 'username', 'email'],
    where: { email: req.params.identifier },
    orWhere: { username: req.params.identifier }
  }).fetch().then(function(user) {
    // if no user, then it will be null.
    // doesn't matter if there is a user or not.
    res.json({ user });
  });
});

router.post('/', function (req, res) {
  validateInput(req.body, commonValidations).then(function(_ref) {
    var errors = _ref.errors,
        isValid = _ref.isValid;
      // Problem: isValid is not true.
    if (isValid) {
      const _req$body = req.body,
          username = _req$body.username,
          password = _req$body.password,
          email = _req$body.email;
      const password_digest = bcrypt.hashSync(password, 10);
      User.forge({
        username, email, password_digest
      }, { hasTimestamps: true }).save()
      .then(function(user) {return res.json({ success: true })})
      .catch(function(err) {return res.status(500).json({ error: err });
      });
    } else {
      res.status(400).json(errors);
    }
  })
});

module.exports = router;