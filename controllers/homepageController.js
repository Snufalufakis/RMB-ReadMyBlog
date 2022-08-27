// dependices
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
  console.log(req.session, "I AM THE SESSION");
  try {
    const dbUsersData = await User.findAll();
    const users = dbUsersData.map((dbUser) => dbUser.get({ plain: true }));
    res.render("users", {
      users,
      loggedInUser: req.session.user || null,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//router to ger users id and render the user profile page
router.get("/users/:userId", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.userId);
    const user = userData.get({ plain: true });
    res.render("user_profile", { user });
  } catch (error) {
    res.status(500).json(error);
  }
});

// router to get todos from the database and render the todos page with the todos in json format
router.get("blogs", async (req, res) => {
  try {
    const dbBlogsData = await Blog.findAll();
    const blogs = dbBlogsData.map((dbBlog) => dbBlog.get({ plain: true }));
    res.render("blogs", {
      blogs,
      loggedInUser: req.session.user || null,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
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
router.get("/blogs", isLoggedIn, async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      where: {
        user_id: req.session.user.id,
      },
    });
    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
    res.render("blogs", {
      blogs,
      loggedInUser: req.session.user || null,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//router
router.get("/blogs/:id", isLoggedIn, async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id);
    const blog = dbBlogData.get({ plain: true });
    res.render("blog", {
      blog,
      loggedInUser: req.session.user || null,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Beta version of the edit blog page
router.get("/blogs/:id/edit", isLoggedIn, async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id);
    const blog = dbBlogData.get({ plain: true });
    res.render("edit_blog", {
      blog,
      loggedInUser: req.session.user || null,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Logged in users can post comments on blogs
router.post("/blogs/:id", isLoggedIn, async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      comment: req.body.comment,
      user_id: req.session.user.id,
      blog_id: req.params.id,
    });
    res.status(200).json(dbCommentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

//router use api to controler to control the api routes
router.use("/api", apiController);

// export the router
module.exports = router;
