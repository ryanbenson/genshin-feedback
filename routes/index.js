const express = require("express");
const passport = require("passport");
const path = require("path");
const router = express.Router();
const { User } = require("../utils/database");

/* GET home page. */
router.get("/", function (req, res, next) {
  if (!req.isAuthenticated()) {
    User.findAll().then((users) => res.json(users));
    //res.render("index", { title: "Express" });
  } else {
    console.log(req.user);
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  }
});
/* GET React App */
router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/login/google", passport.authenticate("google"));

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect("/");
  }
);

router.get("/logout", function (req, res, next) {
  res.clearCookie("connect.sid");
  res.redirect("/");
});

module.exports = router;
