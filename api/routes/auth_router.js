const express = require("express");
const verifyAccessToken = require("../middlewares/jwtMiddleware");
const authController = require("../controllers/auth_controller");
const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/dashboard", verifyAccessToken, authController.dashboard);

module.exports = router;