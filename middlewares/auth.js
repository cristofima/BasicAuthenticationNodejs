var auth = require("basic-auth");
const user = require("../models").user;

function isAuth(req, res, next) {
  var credentials = auth(req);

  if (!credentials) {
    notLogin(res);
  } else {
    user
      .findOne({ where: { name: credentials.name } })
      .then(data => {
        if (data) {
          var comp = data.comparePassword(credentials.pass);
          if (comp) {
            next();
          } else {
            notLogin(res);
          }
        } else {
          notLogin(res);
        }
      })
      .catch(error => {
        res.status(500).send({ message: `Error al buscar: ${error}` });
      });
  }
}

function notLogin(res) {
  res.statusCode = 401;
  res.setHeader("WWW-Authenticate", 'Basic realm="example"');
  res.end("Access denied");
}

module.exports = isAuth;
