const sequelize = require("./../config/connections");
const { User, Blog, Comment } = require("../models");
const users = require("./users");
const comments = require("./comments");
const blogs = require("./blogs");

const seedDataBase = async () => {
  await sequelize.sync({ force: true });

  await Comment.bulkCreate(comments);
  await Blog.bulkCreate(blogs);
  await User.bulkCreate(users, { individualHooks: true });
  process.exit(0);
};
(async () => {
  await seedDataBase();
})();
