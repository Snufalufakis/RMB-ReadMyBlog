const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { User, Blog, Comment } = require("../models");

//Logged in users can post comments on blogs
router.post("/blogs/:id", isLoggedIn, async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      comment: req.body.comment,
      userID: req.session.userID,
      commentID: req.params.commentID,
    });
    res.status(200).json(dbCommentData);
  } catch (error) {
    console.log("E L:16 homepagecontroller", error);
    res.status(500).json(error);
  }
});

router.post("/blogs", async (req, res) => {
  if (!req.session.isLoggedIn) {
    return res
      .status(401)
      .json({ error: " You must be logged in to post a blog" });
  }
  try {
    const newBlogPost = await Blog.create({
      blog: req.body.blog,
      userID: req.session.user.id,
    });
    res.json(newBlogPost);
  } catch (error) {
    console.log("E L 34 apiController");
    res.status(500).json(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    req.session.save(() => {
      req.session.user = newUser;
      req.session.isLoggedIn = true;
      res.json(newUser);
    });
  } catch (error) {
    console.log("E L48 apiController");
    res.status(500).json({ error });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!existingUser) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const doesPasswordMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (!doesPasswordMatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    req.session.save(() => {
      req.session.user = existingUser;
      req.session.isLoggedIn = true;
      res.json({ success: true });
    });
  } catch (error) {
    console.log("E L81 apiController");
    res.status(500).json({ error });
  }
});

router.post("/signout", async (req, res) => {
  if (req.session.isLoggedIn) {
    req.destroy(() => {
      res.json({ success: true });
    });
  }
});

module.exports = router;
