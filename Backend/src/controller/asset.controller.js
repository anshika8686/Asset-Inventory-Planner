
const Asset = require("../model/asset.model");

// Calculate asset age in years
function calculateAssetAge(installationDate) {
  if (!installationDate) return null;

  const ageInMilliseconds = Date.now() - new Date(installationDate).getTime();

  return Number(
    (ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)).toFixed(2)
  );
}

// Calculate next maintenance date
function calculateNextMaintenanceDate(lastMaintenanceDate, intervalDays) {
  if (!lastMaintenanceDate || !intervalDays) return null;

  const nextDate = new Date(lastMaintenanceDate);
  nextDate.setDate(nextDate.getDate() + Number(intervalDays));

  return nextDate;
}

// Add calculated asset age to the response
function formatAsset(asset) {
  const assetData = asset.toObject();

  assetData.assetAgeYears = calculateAssetAge(asset.installationDate);

  return assetData;
}

// Create an asset
async function createAssetController(req, res) {
  try {
    const {
      assetAgeYears,
      nextMaintenanceDate,
      createdBy,
      updatedBy,
      ...assetData
    } = req.body;

    const calculatedDate = calculateNextMaintenanceDate(
      assetData.lastMaintenanceDate,
      assetData.maintenanceIntervalDays
    );

    const asset = await Asset.create({
      ...assetData,
      nextMaintenanceDate: calculatedDate,
      createdBy: req.user.userId,
      updatedBy: req.user.userId
    });

    return res.status(201).json({
      message: "Asset created successfully",
      asset: formatAsset(asset)
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Get all assets
async function getAllAssetsController(req, res) {
  try {
    const assets = await Asset.find().sort({ createdAt: -1 });

    return res.status(200).json({
      assets: assets.map(formatAsset)
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Get a single asset
async function getAssetController(req, res) {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    return res.status(200).json({
      asset: formatAsset(asset)
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Update an asset
async function updateAssetController(req, res) {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    const {
      _id,
      assetAgeYears,
      nextMaintenanceDate,
      createdBy,
      updatedBy,
      ...updates
    } = req.body;

    Object.assign(asset, updates);

    asset.nextMaintenanceDate = calculateNextMaintenanceDate(
      asset.lastMaintenanceDate,
      asset.maintenanceIntervalDays
    );

    asset.updatedBy = req.user.userId;

    await asset.save();

    return res.status(200).json({
      message: "Asset updated successfully",
      asset: formatAsset(asset)
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Delete an asset
async function deleteAssetController(req, res) {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    return res.status(200).json({
      message: "Asset deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createAssetController,
  getAllAssetsController,
  getAssetController,
  updateAssetController,
  deleteAssetController
};
