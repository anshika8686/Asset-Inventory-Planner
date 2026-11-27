
const express = require("express");
const AssetInfoRouter = express.Router();

const {
  getAssetInfoController
} = require("../controller/assetInfo.controller");

const identifyUser = require("../middleware/auth.middleware");


// Get asset assessment criteria and scoring methodology
AssetInfoRouter.get("/asset-info", identifyUser, getAssetInfoController);

module.exports = AssetInfoRouter;
