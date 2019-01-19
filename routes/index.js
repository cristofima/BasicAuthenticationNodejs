var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");

var auth = require("../middlewares/auth");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/api/login", auth, userController.logIn);
router.post("/api/users", userController.signUp);

module.exports = router;
