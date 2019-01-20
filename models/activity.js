"use strict";
module.exports = (sequelize, DataTypes) => {
  const activity = sequelize.define(
    "activity",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      priority: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.DATEONLY, allowNull: false }
    },
    {
      tableName: "activities",
      timestamps: true,
      updatedAt: "updated_at",
      createdAt: "created_at"
    }
  );
  activity.associate = function(models) {
    activity.belongsTo(models.user, {
      as: "user",
      foreignKey: "user_id"
    });
  };
  return activity;
};
