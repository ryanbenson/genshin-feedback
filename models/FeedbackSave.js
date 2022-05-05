const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "feedback_saves",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      feedbackId: {
        type: DataTypes.STRING,
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
