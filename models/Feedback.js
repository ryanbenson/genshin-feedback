const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "feedback",
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
      content: {
        type: DataTypes.STRING,
      },
      votes: {
        type: DataTypes.INTEGER,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["userId"],
        },
        {
          unique: false,
          fields: ["content"],
        },
        {
          unique: false,
          fields: ["enabled"],
        },
      ],
    }
  );
};
