const router = require("express").Router();
const homepageController = require("./../../controllers/homepageController");

router.route("/signin").get(homepageController.getSignInPage);
router.route("/signup").get(homepageController.getSignUpPage);
router.route("/createBlog").get(homepageController.getCreateBlogPage);
router.route("/blogs/:blogID").get(homepageController.getBlogPage);
router.route("/users/:username").get(homepageController.getUserPage);
router.route("/").get(homepageController.getHomePage);

module.exports = router;
