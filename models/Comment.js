const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections");

class Comment extends Model {}

Comment.init(
  {
    commentID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    blogID: {
      type: DataTypes.UUID,
      references: {
        model: "blogs",
        key: "blogID",
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
    modelName: "comments",
  }
);

module.exports = Comment;
