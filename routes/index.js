const router = require("express").Router();
const apiRoutes = require("./apiRoutes");
const publicRoutes = require("./publicRoutes");

router.use("/api", apiRoutes);
router.use("/", publicRoutes);

module.exports = router;
