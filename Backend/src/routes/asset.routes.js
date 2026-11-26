const express = require("express");
const router = express.Router();

const identifyUser = require("../middleware/auth.middleware");

const {
  createAssetController,
  getAllAssetsController,
  getAssetController,
  updateAssetController,
  deleteAssetController
} = require("../controller/asset.controller");

// All asset routes require authentication
router.use(identifyUser);

router.post("/create", identifyUser, createAssetController);
router.get("/get-all",identifyUser,  getAllAssetsController);
router.get("/get/:id",identifyUser,  getAssetController);
router.put("/update/:id",identifyUser,  updateAssetController);
router.delete("/delete/:id",identifyUser,  deleteAssetController);

module.exports = router;
