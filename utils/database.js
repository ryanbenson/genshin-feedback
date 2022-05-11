const Sequelize = require("sequelize");
const UserModel = require("../models/User");
const FeedbackModel = require("../models/Feedback");
const FeedbackLikeModel = require("../models/FeedbackLike");
const FeedbackSaveModel = require("../models/FeedbackSave");

const db = new Sequelize(
  process.env["MYSQL_DATABASE"],
  process.env["MYSQL_USERNAME"],
  process.env["MYSQL_PASSWORD"],
  {
    host: process.env["MYSQL_HOST"],
    port: process.env["MYSQL_PORT"],
    dialect: "mysql",
  }
);

const User = UserModel(db);
const Feedback = FeedbackModel(db);
const FeedbackLike = FeedbackLikeModel(db);
const FeedbackSave = FeedbackSaveModel(db);

// setup user associations
User.hasMany(Feedback);
User.hasMany(FeedbackLike);
User.hasMany(FeedbackSave);
// setup feedback associations
Feedback.belongsTo(User);
Feedback.hasMany(FeedbackLike);
Feedback.hasMany(FeedbackSave);
// setup feedback like associations
FeedbackLike.belongsTo(User);
FeedbackLike.belongsTo(Feedback);
// setup feedback save associations
FeedbackSave.belongsTo(User);
FeedbackSave.belongsTo(Feedback);

module.exports = {
  db,
  User,
  Feedback,
  FeedbackLike,
  FeedbackSave,
};
