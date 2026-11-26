const assetConfig = require("../config/assetConfig")

function getAssetConfigController(req, res) {
  return res.status(200).json({
    assetConfig
  });
}

module.exports = {
  getAssetConfigController
};