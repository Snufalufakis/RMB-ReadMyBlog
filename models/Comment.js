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
    postID: {
      type: DataTypes.UUID,
      references: {
        model: "posts",
        key: "postID",
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
