var bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "users_name_unique"
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "users_name_email"
      },
      password: { type: DataTypes.STRING, allowNull: false }
    },
    {
      tableName: "users",
      timestamps: true,
      updatedAt: "updated_at",
      createdAt: "created_at"
    }
  );
  user.beforeSave((user, options) => {
    if (user.changed("password")) {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10),
        null
      );
    }
  });
  user.prototype.comparePassword = function(passw) {
    return bcrypt.compareSync(passw, this.password);
  };
  user.associate = function(models) {
    user.hasMany(models.activity, {
      foreignKey: "user_id",
      as: "activities"
    });
  };
  return user;
};
