const sequelize = require("./../config/connections");
const { User, Blog, Comment } = require("../models");
const users = require("./users");
const comment = require("./comment");
const seedDataBase = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(users);
  const comment = await Comment.bulkCreate(comment);
  const blog = await Blog.bulkCreate(blog);
};
