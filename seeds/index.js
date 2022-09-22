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
  let allUsers = await User.findAll({
    attributes: ["userID"],
  });
  let userindex = 0;
  for (let i = 0; i < blogs.length; i++) {
    userindex++;
    if (userindex === allUsers.length) {
      userindex = 0;
    }
    blogs[i].userID = allUsers[userindex].dataValues.userID;
  }
  let blogindex = 0;
  userindex = 0;
  for (let i = 0; i < comments.length; i++) {
    if (i !== 0 && i % 3 === 0) {
      blogindex++;
    }
    userindex++;
    if (userindex == allUsers.length) {
      userindex = 0;
    }

    comments[i].blogID = allBlogs[blogindex].dataValues.blogID;
    comments[i].userID = allUsers[userindex].dataValues.userID;
  }
  process.exit(0);
};
(async () => {
  await seedDataBase();
})();
