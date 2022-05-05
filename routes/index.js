const express = require("express");
const passport = require("passport");
const path = require("path");
const router = express.Router();
const { User } = require("../utils/database");

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(req.cookies);
  const cookieVal = req.cookies?.name ?? null;
  if (!cookieVal || cookieVal !== "express") {
    User.findAll().then((users) => res.json(users));
    //res.render("index", { title: "Express" });
  } else {
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
  res.clearCookie("name");
  res.json("goodbye");
});

module.exports = router;
