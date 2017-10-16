const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp, role: user.role }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has been authenticated, send back token
  res.send({ token: tokenForUser(req.user) });
}

exports.findUsers = function(req, res) {
  console.log('test');
  var query = User.find()
  query.exec(function(err, person) {
   console.log('Results back from db');
   return res.send(person);
  })
}
exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password,
      role: 'user'
    });

    user.save(function(err) {
      if (err) { return next(err); }

      // Repond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
}









exports.admin_activation = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if an user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If an user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save record for admin
    const user = new User({
      email: email,
      password: password,
      role: 'admin'
    });

    user.save(function(err) {
      if (err) { return next(err); }

      // Repond to request indicating the admin was created
      // res.send({});
    });
  });
}
