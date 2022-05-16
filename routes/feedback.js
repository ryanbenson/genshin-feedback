const express = require("express");
const he = require("he");
const router = express.Router();
const { Feedback, FeedbackLike, FeedbackSave } = require("../utils/database");

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

router.post("/api/feedback", async function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401);
    return res.json({ message: "Unauthorized" });
  }
  if (!req.body?.content) {
    res.status(400);
    return res.json({ message: "Missing content for the feedback" });
  }
  const data = {
    content: he.encode(req.body.content),
    votes: 0,
    enabled: 1,
    userId: req.user.id,
  };
  const newFeedback = await Feedback.create(data);
  if (!newFeedback) {
    res.status(500);
    return res.json({ message: "Error creating new piece of feedback" });
  }

  return res.json(newFeedback);
});

router.put("/api/feedback/:id", async function (req, res, next) {
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
  // update our feedback
  feedbackItem.content = he.encode(req.body.content);
  await jane.save();

  return res.json(feedbackItem);
});

module.exports = router;
