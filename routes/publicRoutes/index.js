const router = require("express").Router();
const publicController = require("./../../../controllers/publicController");

router.route("/signin").get(publicController.getSignInPage);
router.route("/signup").get(publicController.getSignUpPage);
router.route("/createPost").get(publicController.getCreatePostPage);
router.route("/blogs/:blogID").get(publicController.getPostPage);
router.route("/users/:username").get(publicController.getUserPage);
router.route("/").get(publicController.getHomePage);

module.exports = router;
