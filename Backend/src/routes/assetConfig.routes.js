const express = require("express");
const assetConfigrouter = express.Router();

const {
  getAssetConfigController
} = require("../controller/assetConfig.controller");

assetConfigrouter.get("/", getAssetConfigController);

module.exports = assetConfigrouter;