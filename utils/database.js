const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
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
User.hasMany(Feedback, {
  foreignKey: {
    type: DataTypes.UUID,
  },
});
User.hasMany(FeedbackLike, {
  foreignKey: {
    type: DataTypes.UUID,
  },
});
User.hasMany(FeedbackSave, {
  foreignKey: {
    type: DataTypes.UUID,
  },
});
// setup feedback associations
Feedback.belongsTo(User, {
  foreignKey: {
    type: DataTypes.UUID,
  },
});
Feedback.hasMany(FeedbackLike, {
  foreignKey: {
    type: DataTypes.UUID,
  },
});
Feedback.hasMany(FeedbackSave, {
  foreignKey: {
    type: DataTypes.UUID,
  },
});
// setup feedback like associations
FeedbackLike.belongsTo(User, {
  foreignKey: {
    type: DataTypes.UUID,
  },
});
FeedbackLike.belongsTo(Feedback, {
  foreignKey: {
    type: DataTypes.UUID,
  },
});
// setup feedback save associations
FeedbackSave.belongsTo(User, {
  foreignKey: {
    type: DataTypes.UUID,
  },
});
FeedbackSave.belongsTo(Feedback, {
  foreignKey: {
    type: DataTypes.UUID,
  },
});

module.exports = {
  db,
  User,
  Feedback,
  FeedbackLike,
  FeedbackSave,
};
