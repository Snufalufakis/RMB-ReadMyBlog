const router = require("express").Router();
const apiController = require("./../../controllers/apiController");

router.route("/password/").put(apiController.updateUserPassword);
router.route("signin").post(apiController.signInUser);
router.route("signout").post(apiController.signOutUser);
router.route("signup").post(apiController.signUpUser);
router.route("blogs/:username/").post(apiController.getBlogsFromUser);
router.route("/").post(apiController.getUserInfo);

module.exports = router;
