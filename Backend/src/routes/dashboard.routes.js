
const express = require("express");
const dashboardRouter = express.Router();

const {
  getDashboardController
} = require("../controller/dashboard.controller");

const identifyUser = require("../middleware/auth.middleware");

dashboardRouter.get("/analytics", identifyUser, getDashboardController);

module.exports = dashboardRouter;
