const express = require("express");
const path = require("path");
const router = express.Router();
// s * min * h * days
const cookieTime = 60000 * 60 * 24 * 30;

/* GET home page. */
router.get("/", function (req, res, next) {
  const cookieVal = req.cookies?.name ?? null;
  if (!cookieVal || cookieVal !== "express") {
    res.render("index", { title: "Express" });
  } else {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  }
});
/* GET React App */
router.get("/login", function (req, res, next) {
  res.cookie("name", "express", { maxAge: cookieTime });
  res.json("ok");
});

router.get("/logout", function (req, res, next) {
  res.clearCookie("name");
  res.json("goodbye");
});

module.exports = router;
