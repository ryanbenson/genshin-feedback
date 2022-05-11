const express = require("express");
const router = express.Router();
const { FeedbackSave } = require("../utils/database");

router.get("/api/feedbackSave", async function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401);
    return res.json({ message: "Unauthorized" });
  }
  return await Feedback.findAll().then((users) => res.json(users));
});

router.post("/api/feedbackSave", async function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401);
    return res.json({ message: "Unauthorized" });
  }
  if (!req.body?.content) {
    res.status(400);
    return res.json({ message: "Missing content for the feedback" });
  }
  const data = {
    feedbackId: req.body.feedbackId,
    userId: req.user.id,
  };
  const newFeedback = await Feedback.create(data);
  if (!newFeedback) {
    res.status(500);
    return res.json({ message: "Error creating new piece of feedback" });
  }

  return res.json(newFeedback);
});

router.delete("/api/feedbackLike/:id", async function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401);
    return res.json({ message: "Unauthorized" });
  }
  // is it a real one? and does the user own it?
  const feedbackItem = await Feedback.findOne({
    where: {
      id: req.params?.id,
      userId: req.user.id,
    },
  });
  if (!feedbackItem) {
    res.status(404);
    return res.json({ message: "Not found" });
  }
  // delete the record
  await jane.destroy();

  return res.json({ success: true });
});

module.exports = router;
