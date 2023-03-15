const express = require("express");
const passport = require("passport");
const router = express.Router();
const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);

/* router.post(
  "/post",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  homeController.createPost
); */

router.use("/users", require("./users"));

module.exports = router;
