const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { blog } = require("../routes");
const { User, Blog, Comment } = require("../models");
const sequelize = require("sequelize");

const getBlogs = async (req, res) => {
  try {
    let allBlogs = await Blog.findAll({
      // Get all blogs
      attributes: [
        // Only return these attributes
        "blogID",
        "title",
        "description",
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM comments WHERE blogs.blogID = comments.blogID)`
          ),
          "commentCount",
        ],
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM users WHERE blogs.userID = users.userID)`
          ),
          "username",
        ],
      ],
    });
    res.status(200).json(allBlogs); // Return all blogs
  } catch (error) {
    console.log(error, "E L: 19 AC");
    res.status(500).json(error);
  }
};

const getBlogFromID = async (req, res) => {
  // Get a blog from an ID
  try {
    let user_blogID = req.params.blogID; // Get the blogID from the URL
    if (user_blogID) {
      let blog = await Blog.findOne({
        // Find the blog
        attributes: [
          "blogID",
          "title",
          "description",
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM comments WHERE blogs.blogID = comments.blogID)`
            ),
            "commentCount",
          ],
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM users WHERE blogs.userID = users.userID)`
            ),
            "username",
          ],
        ],
        where: {
          blogID: user_blogID, // Where the blogID matches the one in the URL
        },
      });
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: "No blog found with that ID" });
    }
  } catch (error) {
    console.log(error, "E L: 63 AC");
    res.status(500).json(error);
  }
};

const getBlogsFromUser = async (req, res) => {
  // Get all blogs from a user
  try {
    let user_username = req.params.username; // Get the username from the URL
    if (user_username) {
      let user = await User.findOne({
        include: [
          {
            model: Blog, // Include the blogs
            attributes: {
              include: [
                [
                  sequelize.literal(
                    `(SELECT COUNT(*) FROM comments WHERE blogs.blogID = comments.blogID)`
                  ),
                  "commentCount",
                ],
                [
                  sequelize.literal(
                    `(SELECT COUNT(*) FROM users WHERE blogs.userID = users.userID)`
                  ),
                  "username",
                ],
              ],
              exclude: ["userID", "createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "userID"],
        },
        where: {
          username: user_username, // Where the username matches the one in the URL
        },
      });
      const blog = user.blogs;
      res.status(200).json(user.blogs);
    } else {
      res.status(404).json({ message: "No user found with that username" });
    }
  } catch (error) {
    console.log(error, "E L: 116 AC");
    res.status(500).json(error);
  }
};

const getCommentsFromBlog = async (req, res) => {
  try {
    let user_blogID = req.params.blogID; // Get the blogID from the URL
    if (user_blogID) {
      const comments = await Comment.findAll({
        attributes: ["commentID", "comment"],
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password", "userID", "createdAt", "updatedAt"],
            },
          },
        ],
        where: {
          blogID: user_blogID, // Where the blogID matches the one in the URL
        },
      });
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: "No blog found with that ID" });
    }
  } catch (error) {
    console.log(error, "E L: 144 AC");
    res.status(500).json(error);
  }
};

const createBlog = async (req, res) => {
  // Create a blog
  try {
    let newBlog;
    if (req.body.title && req.body.description) {
      // If the title and description are provided
      newBlog = await Blog.create({
        title: req.body.title,
        description: req.body.description,
        userID: req.session.user.userID,
      });
    }
    res.status(200).json(newBlog);
  } catch (error) {
    console.log(error, "E L: 164 AC");
    res.status(500).json(error);
  }
};

const createComment = async (req, res) => {
  // Create a comment
  try {
    // If the comment and blogID are provided
    const comment = req.body.comment;
    const blogID = req.body.blogID;
    const userID = req.session.user.userID;
    if (userID === undefined) {
      res.status(401).json({ message: "You must be logged in to comment" });
    } else {
      const newComment = { comment: comment, blogID: blogID, userID: userID }; // Create the comment
      await Comment.create(newComment);
      res.status(200).json(newComment);
    }
  } catch {
    console.log(error, "E L: 175 AC");
    res.status(500).json(error);
  }
};

module.exports = {
  getBlogs,
  getBlogFromID,
  getBlogsFromUser,
  getCommentsFromBlog,
  createBlog,
  createComment,
};
