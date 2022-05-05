const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "user",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      profileId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePlatform: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genshinUid: {
        type: DataTypes.INTEGER,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["profileId"],
        },
        {
          unique: false,
          fields: ["profilePlatform", "profileId"],
        },
        {
          unique: true,
          fields: ["genshinUid"],
        },
        {
          unique: false,
          fields: ["enabled"],
        },
      ],
    }
  );
};
