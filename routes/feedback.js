const express = require("express");
const router = express.Router();
const { Feedback } = require("../utils/database");

router.get("/api/feedback", async function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401);
    return res.json({ message: "Unauthorized" });
  }
  return await Feedback.findAll().then((users) => res.json(users));
});

router.get("/api/feedback/:id", async function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401);
    return res.json({ message: "Unauthorized" });
  }
  const feedbackItem = await Feedback.findOne({
    where: {
      id: req.params?.id,
    },
  });
  if (!feedbackItem) {
    res.status(404);
    return res.json({ message: "Not found" });
  }

  return res.json(feedbackItem);
});

module.exports = router;
