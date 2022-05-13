const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "feedback_likes",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        foreignKey: true,
      },
      feedbackId: {
        type: DataTypes.UUID,
        allowNull: false,
        foreignKey: true,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["userId", "feedbackId"],
        },
      ],
    }
  );
};
