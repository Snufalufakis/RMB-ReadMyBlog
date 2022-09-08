const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections");

class Blog extends Model {}

Blog.init(
  {
    blogID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "userID",
      },
    },
  },
  {
    sequelize,
    modelName: "blogs",
  }
);
module.exports = Blog;
