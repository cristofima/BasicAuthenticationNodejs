const user = require("../models").user;

function logIn(req, res) {
  res.status(200).send({ message: "Login success" });
}

function signUp(req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  return user
    .create({ name: name, email: email, password: password })
    .then(userItem => res.status(201).send(userItem))
    .catch(error => res.status(400).send(error));
}

module.exports = {
  signUp,
  logIn
};
