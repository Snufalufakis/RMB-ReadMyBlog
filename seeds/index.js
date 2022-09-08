const sequelize = require("./../config/connections");
const { User, Blog, Comment } = require("../models");
const users = require("./users");
const comments = require("./comments");
const blogs = require("./blogs");
const seedDataBase = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(users);
  const comments = await Comment.bulkCreate(comments);
  const blogs = await Blog.bulkCreate(blogs);
};
(async () => {
  await seedDataBase();
})();
