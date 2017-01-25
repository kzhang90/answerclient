// everything in here can be es2015.
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

// use request to make http calls. supports https and follows redirects by default.
// const request = require('request');

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);

app.listen(8080, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:8080');
});
