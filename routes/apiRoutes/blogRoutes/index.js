const router = require("express").Router();
const apiController = require("./../../../controllers/apiController");

router.route("/").get(apiController.getBlogs).post(apiController.createNewBlog);
router
  .route("/:blogID")
  .get(apiController.getBlogFromID)
  .delete(apiController.deleteBlog);

module.exports = router;
