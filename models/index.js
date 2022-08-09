const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

//user has many comments, comments belong to one user
Comment.belongsTo(User, {
  foreignKey: "userID",
});
User.hasMany(Comment, {
  foreignKey: "userID",
  onDelete: "CASCADE",
});
// user has many blogs, blogs belong to one user
User.hasMany(Blog, {
  foreignKey: "userID",
  onDelete: "cascade",
});
Blog.belongsTo(User, {
  foreignKey: "userID",
});

module.exports = { User, Blog, Comment };
