const Asset = require("../model/asset.model");
const { evaluateCondition } = require("../utils/conditionEvaluator");
const { calculateAssetHealth } = require("../utils/calculateAssetHealth");
const {calculateMaintenancePriority} = require("../utils/calculatePriorityIndex");
// Calculate asset age in years
function calculateAssetAge(installationDate) {
  if (!installationDate) return null;

  const ageInMilliseconds = Date.now() - new Date(installationDate).getTime();

  return Number(
    (ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)).toFixed(2),
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
    //Data came from user
    const {
      assetAgeYears,
      nextMaintenanceDate,
      createdBy,
      updatedBy,
      ...assetData
    } = req.body;

    //next maintenance data is calculated automatically
    const calculatedDate = calculateNextMaintenanceDate(
      assetData.lastMaintenanceDate,
      assetData.maintenanceIntervalDays,
    );
    
    //reading parameter is fetched from asset data
    const evaluatedReadings = (assetData.readings || []).map((reading) => {
      const result = evaluateCondition(
        assetData.category,
        reading.parameter,
        reading.value,
        reading.manualCondition,
      );

      //result(condn+assessment mode) is returned from eval cond func
      return {
        ...reading,
        condition: result.condition,
        assessmentType: result.assessmentType,
      };
    });

    //health score and health staus is calculated using calculateAssetHealth
    const { healthScore, healthStatus } =
      calculateAssetHealth(evaluatedReadings);

      //maintenancePriorityScore, maintenancePriority is calc using calculateMaintenancePriority with new asset data
    const { maintenancePriorityScore, maintenancePriority } =
      calculateMaintenancePriority({
        ...assetData,
        healthScore,
        healthStatus,
        nextMaintenanceDate: calculatedDate,
      });

    //all the details are saved in mongo db along with the new reading
    const asset = await Asset.create({
      ...assetData,
      readings: evaluatedReadings,
      healthScore,
      healthStatus,
      maintenancePriorityScore,
      maintenancePriority,
      nextMaintenanceDate: calculatedDate,
      createdBy: req.user.userId,
      updatedBy: req.user.userId,
    });

    return res.status(201).json({
      message: "Asset created successfully",
      asset: formatAsset(asset),
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
      assets: assets.map(formatAsset),
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
      asset: formatAsset(asset),
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
      return res.status(404).json({
        message: "Asset not found"
      });
    }

    const {
      _id,
      assetAgeYears,
      nextMaintenanceDate,
      createdBy,
      updatedBy,
      ...updates
    } = req.body;

    // Apply the updated asset details
    Object.assign(asset, updates);

    // Re-evaluate readings and recalculate AHI if readings are updated
    if (req.body.readings) {
      const evaluatedReadings = req.body.readings.map((reading) => {
        const result = evaluateCondition(
          asset.category,
          reading.parameter,
          reading.value,
          reading.manualCondition
        );

        return {
          ...reading,
          condition: result.condition,
          assessmentType: result.assessmentType
        };
      });

      asset.readings = evaluatedReadings;

      const { healthScore, healthStatus } =
        calculateAssetHealth(evaluatedReadings);

      asset.healthScore = healthScore;
      asset.healthStatus = healthStatus;
    }

    // Recalculate the next maintenance date
    asset.nextMaintenanceDate = calculateNextMaintenanceDate(
      asset.lastMaintenanceDate,
      asset.maintenanceIntervalDays
    );

    // Recalculate MPI using the latest asset details
    const {
      maintenancePriorityScore,
      maintenancePriority
    } = calculateMaintenancePriority(asset);

    asset.maintenancePriorityScore = maintenancePriorityScore;
    asset.maintenancePriority = maintenancePriority;

    asset.updatedBy = req.user.userId;

    await asset.save();

    return res.status(200).json({
      message: "Asset updated successfully",
      asset: formatAsset(asset)
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
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
      message: "Asset deleted successfully",
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
  deleteAssetController,
};
