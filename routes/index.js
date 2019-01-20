var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");
const activityController = require("../controllers/activity");

var auth = require("../middlewares/auth");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/api/login", auth, userController.logIn);
router.post("/api/users", userController.signUp);

router.get("/api/activities", auth, activityController.listByUser);
router.post("/api/activities", auth, activityController.create);
router.put("/api/activities/:id", auth, activityController.update);
router.get("/api/activities/:id", auth, activityController.getById);
router.delete("/api/activities/:id", auth, activityController.destroy);

module.exports = router;
