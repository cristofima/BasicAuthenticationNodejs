const user = require("../models").user;

function logIn(req, res) {
  res.status(200).send({ message: "Login success" });
}

function signUp(req, res) {
  var request = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  return user
    .create(request)
    .then(userItem => res.status(201).send(userItem))
    .catch(error => res.status(500).send(error));
}

module.exports = {
  signUp,
  logIn
};
