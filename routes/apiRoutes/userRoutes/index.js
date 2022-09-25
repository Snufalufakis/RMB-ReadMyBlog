const router = require("express").Router();
const apiController = require("./../../../controllers/apiController");

console.log("userroutes");
router.route("/signin").post(apiController.signInUser);
router.route("/signout").post(apiController.signOutUser);
router.route("/signup").post(apiController.signUpUser);
router.route("/blogs/:username/").post(apiController.getBlogsFromUser);
router.route("/").post(apiController.getUser);

module.exports = router;
