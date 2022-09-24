const router = require("express").Router();
const apiController = require("./../../../controllers/apiController");

router.route("/:blogID").get(apiController.getCommentsFromBlog);
router.route("/").post(apiController.blogNewComment);
router.route("/:commentID").delete(apiController.deleteComment);

module.exports = router;
