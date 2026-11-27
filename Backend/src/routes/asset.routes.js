const express = require("express");
const AssetRouter = express.Router();

const identifyUser = require("../middleware/auth.middleware");

const {
  createAssetController,
  getAllAssetsController,
  getAssetController,
  updateAssetController,
  deleteAssetController
} = require("../controller/asset.controller");

// All asset routes require authentication
AssetRouter.use(identifyUser);

AssetRouter.post("/create", identifyUser, createAssetController);
AssetRouter.get("/get-all",identifyUser,  getAllAssetsController);
AssetRouter.get("/get/:id",identifyUser,  getAssetController);
AssetRouter.put("/update/:id",identifyUser,  updateAssetController);
AssetRouter.delete("/delete/:id",identifyUser,  deleteAssetController);

module.exports = AssetRouter;
