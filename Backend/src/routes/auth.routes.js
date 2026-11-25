const express = require("express");
const authRouter = express.Router();

const authController = require("../controller/auth.controller");

authRouter.post("/signup", authController.signupController);
authRouter.post("/login", authController.loginController);

module.exports = authRouter;
