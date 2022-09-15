// dependencies
const router = require("express").Router();
const apiController = require("./apiController");
const { Blog, Comment, User } = require("./../models");

// Router to get the landing page using try catch to handle errors
router.get("/", (req, res) => {
  res.render("homepage", {
    isLoggedIn: req.session.isLoggedIn, // if the user is logged in, then we will set isLoggedIn to true
  }); // page render the landing page file
});

// Router to get users from the database and render the users page with the users in json format
// render users logged in
router.get("/users", async (req, res) => {
  console.log(req.session);
  try {
    const dbUsersData = await User.findAll();
    const users = dbUsersData.map((dbUser) => dbUser.get({ plain: true }));
    res.render("users", {
      users,
      isLoggedInUser: req.session.user || null,
      isLoggedIn: req.session.isLoggedIn,
    });
    console.log(dbUsersData);
  } catch (error) {
    console.log("E L:26 homepagecontroller", error);
    res.status(500).json(error);
  }
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});
//router to ger users id and render the user profile page // v2
router.get("/users/:userID", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.userID);
    console.log(userData);
    const user = userData.get({ plain: true });
    res.render("users", { user });
  } catch (error) {
    console.log("E L:36 homepagecontroller", error);
    res.status(500).json(error);
  }
});

router.get("/blogs", async (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/");
  }
  try {
    const dbBlogsData = await Blog.findAll({
      where: {
        userID: req.session.userID || null,
      },
    });
    console.log(dbBlogsData);
    const blogs = dbBlogsData.map((blog) => blog.get({ plain: true }));
  } catch (error) {
    console.log("E L:53 homepagecontroller", error);
    res.status(500).json(error);
  }
  res.render("blogs");
});
// if not logged in redirect to home page
const isLoggedIn = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect("/");
  }
};

// find all todos for the user using req.session
router.get("/blogs", async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      where: {
        userID: req.session.userID,
      },
    });
    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
    res.render("blogs", {
      blogs,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log("E L:81 homepagecontroller", error);
    res.status(500).json(error);
  }
});

//router
router.get("/blogs/:id", async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id);
    const blog = dbBlogData.get({ plain: true });
    res.render("blog", {
      blog,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log("E L:97 homepagecontroller", error);
    res.status(500).json(error);
  }
});

//Beta version of the edit blog page
router.get("/blogs/:id/edit", async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id);
    const blog = dbBlogData.get({ plain: true });
    res.render("edit_blog", {
      blog,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//router use api to controler to control the api routes
router.use("/api", apiController);

// export the router
module.exports = router;
