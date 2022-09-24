const sequelize = require("sequelize");
const { User, Blog, Comment } = require("./../models");

const getHomePage = async function (req, res) {
  const signedIn = req.session.isLoggedIn;
  let currentUsername;
  if (req.session.user) {
    currentUsername = req.session.user.username
      ? req.session.user.username
      : undefined;
  }
  const blogsData = await Blog.findAll({
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
          `(SELECT username FROM users WHERE blogs.userID = users.userID)`
        ),
        "username",
      ],
    ],
  });
  const blogs = blogsData.map((blog) => blog.get({ plain: true }));
  res.render("content", {
    blogs,
    signedIn,
    currentUsername,
  });
};

const getSignInPage = function (req, res) {
  res.render("signin", {});
};
const getSignUpPage = function (req, res) {
  res.render("signup", {});
};

const getBlogPage = async (req, res) => {
  const blogID = req.params.blogID;
  const signedIn = req.session.isLoggedIn;
  let currentUsername;
  if (req.session.user) {
    currentUsername = req.session.user.username
      ? req.session.user.username
      : undefined;
  }

  const blogQuery = await Blog.findOne({
    attributes: [
      "blogID",
      "title",
      "description",
      [
        sequelize.literal(
          `(SELECT username FROM users WHERE blogs.userID = users.userID)`
        ),
        "username",
      ],
    ],
    where: {
      blogID: blogID,
    },
  });

  const blog = blogQuery.get({ plain: true });
  const commentQuery = await Comment.findAll({
    order: [["createdAt", "DESC"]],
    attributes: ["commentID", "comment"],
    include: [
      {
        model: User,
        attributes: {
          exclude: ["userID", "password", "createdAt", "updatedAt"],
        },
      },
    ],
    where: {
      blogID: blogID,
    },
  });
  const comments = commentQuery.map((comment) => comment.get({ plain: true }));
  console.log(comments);

  res.render("blog", {
    blog,
    comments,
    signedIn,
    currentUsername,
  });
};

module.exports = {
  getHomePage,
  getSignInPage,
  getSignUpPage,
  getBlogPage,
};

/*
// // dependencies
// const router = require("express").Router();
// const apiController = require("./apiController");
// const { Blog, Comment, User } = require("./../models");

// const isLoggedIn = (req, res, next) => {
//   if (req.session.isLoggedIn) {
//     next();
//   } else {
//     res.redirect("/");
//   }
// };
// // Router to get the landing page using try catch to handle errors
// router.get("/", (req, res) => {
//   res.render("homepage", {
//     isLoggedIn: req.session.isLoggedIn, // if the user is logged in, then we will set isLoggedIn to true
//   }); // page render the landing page file
// });

// // Router to get users from the database and render the users page with the users in json format
// // render users logged in
// router.get("/users", async (req, res) => {
//   console.log(req.session);
//   const isLoggedIn = req.session.isLoggedIn;
//   let currentUsername;
//   if (req.session.user) {
//     currentUsername = req.session.user.username
//       ? req.session.user.username
//       : undefined;
//   }
//   try {
//     userID = req.session.user.userID;
//     username = req.session.user.username;
//     const userData = await User.findByPk(userID, {
//       include: [
//         {
//           model: Blog,
//           attributes: ["blogID", "title", "description"],
//         },
//       ],
//     });

//     const user = userData.get({ plain: true });
//     console.log(user);

//     res.render("users", {
//       user,
//       isLoggedIn: req.session.isLoggedIn,
//     });
//   } catch (error) {
//     console.log("E L:26 homepagecontroller", error);
//     res.status(500).json(error);
//   }
// });

// router.get("/signup", async (req, res) => {
//   res.render("signup");
// });
// //router to ger users id and render the user profile page // v2
// router.get("/users/:userID", async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.params.userID);
//     console.log(userData);
//     const user = userData.get({ plain: true });
//     res.render("users", { user });
//   } catch (error) {
//     console.log("E L:36 homepagecontroller", error);
//     res.status(500).json(error);
//   }
// });

// router.get("/blogs", async (req, res) => {
//   if (!req.session.isLoggedIn) {
//     return res.redirect("/");
//   }
//   try {
//     const dbBlogsData = await Blog.findAll({
//       where: {
//         userID: req.session.userID || null,
//       },
//     });
//     console.log(dbBlogsData);
//     const blogs = dbBlogsData.map((blog) => blog.get({ plain: true }));
//     res.render("blogs", {
//       blogs,
//       isLoggedIn: req.session.isLoggedIn, // blogs: blogs
//     });
//   } catch (error) {
//     console.log("E L:53 homepagecontroller", error);
//     res.status(500).json(error);
//   }
//   res.render("blogs");
// });
// // if not logged in redirect to home page

// // find all todos for the user using req.session
// router.get("/blogs", async (req, res) => {
//   try {
//     const dbBlogData = await Blog.findAll({
//       where: {
//         userID: req.session.userID,
//       },
//     });
//     const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
//     res.render("blogs", {
//       blogs,
//       isLoggedIn: req.session.isLoggedIn,
//     });
//   } catch (error) {
//     console.log("E L:81 homepagecontroller", error);
//     res.status(500).json(error);
//   }
// });

// //router
// router.get("/blogs/:id", async (req, res) => {
//   try {
//     const dbBlogData = await Blog.findByPk(req.params.id);
//     const blog = dbBlogData.get({ plain: true });
//     res.render("blog", {
//       blog,
//       isLoggedIn: req.session.isLoggedIn,
//     });
//   } catch (error) {
//     console.log("E L:97 homepagecontroller", error);
//     res.status(500).json(error);
//   }
// });

// //Beta version of the edit blog page
// router.get("/blogs/:id/edit", async (req, res) => {
//   try {
//     const dbBlogData = await Blog.findByPk(req.params.id);
//     const blog = dbBlogData.get({ plain: true });
//     res.render("edit_blog", {
//       blog,
//       isLoggedIn: req.session.isLoggedIn,
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// //router use api to controler to control the api routes
// router.use("/api", apiController)
*/
