const router = require("express").Router();
const apiRoutes = require("./apiRoutes");
const publicRoutes = require("./publicRoutes");
// const homepageController = require("./../controllers/homepageController");
console.log("root");
router.use("/api", apiRoutes);
router.use("/", publicRoutes);
// router.route("/signin").get(homepageController.getSignInPage);

module.exports = router;
