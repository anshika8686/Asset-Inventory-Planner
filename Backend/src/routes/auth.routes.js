const express = require("express");
const authRouter = express.Router();

const authController = require("../controller/auth.controller");
const identifyUser=require("../middleware/auth.middleware")

authRouter.post("/signup", authController.signupController);
authRouter.post("/login", authController.loginController);

authRouter.get("/get-me",identifyUser,authController.getmeController)

module.exports = authRouter;
