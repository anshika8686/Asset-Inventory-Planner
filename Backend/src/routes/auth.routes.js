const express = require("express");
const authRouter = express.Router();

const authController = require("../controller/auth.controller");

authRouter.post("/signup", authController.signupController);

module.exports = authRouter;
