const express = require("express");
const router = express.Router();
const { FeedbackLike } = require("../utils/database");

router.post("/api/feedbackLike", async function (req, res, next) {
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
  const newFeedbackLike = await FeedbackLike.create(data);
  if (!newFeedbackLike) {
    res.status(500);
    return res.json({ message: "Error creating new piece of feedback" });
  }

  return res.json(newFeedbackLike);
});

router.delete("/api/feedbackLike/:id", async function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401);
    return res.json({ message: "Unauthorized" });
  }
  // is it a real one? and does the user own it?
  const feedbackLikeItem = await FeedbackLike.findOne({
    where: {
      id: req.params?.id,
      userId: req.user.id,
    },
  });
  if (!feedbackLikeItem) {
    res.status(404);
    return res.json({ message: "Not found" });
  }
  // delete the record
  await feedbackLikeItem.destroy();

  return res.json({ success: true });
});

module.exports = router;
