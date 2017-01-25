const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('../config');

router.post('/', function(req, res) {
  var _req$body = req.body,
    identifier = _req$body.identifier,
    password = _req$body.password;

  User.query({
    where: { username: identifier },
    orWhere: { email: identifier }
  }).fetch().then(function(user) {
    if (user) {
      // compare password
      if (bcrypt.compareSync(password, user.get('password_digest'))) {
        const token = jwt.sign({
          // public so don't include private info
          id: user.get('id'),
          username: user.get('username')
        }, config.jwtSecret);
        // json web token is going to be saved on client, decoded, and used.
        res.json({ token });
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
      }
    } else {
      res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }
  })
});

module.exports = router; 