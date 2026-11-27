
const Asset = require("../model/asset.model");

// Get dashboard statistics
async function getDashboardController(req, res) {
  try {
    // Category-wise asset statistics
    const categoryStats = await Asset.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: 1 },

          healthy: {
            $sum: {
              $cond: [{ $eq: ["$healthStatus", "Normal"] }, 1, 0]
            }
          },

          attention: {
            $sum: {
              $cond: [
                { $in: ["$healthStatus", ["Caution", "Warning"]] },
                1,
                0
              ]
            }
          },

          critical: {
            $sum: {
              $cond: [{ $eq: ["$healthStatus", "Critical"] }, 1, 0]
            }
          },

        notAssessed: {
  $sum: {
    $cond: [
      {
        $eq: [
          { $ifNull: ["$healthStatus", "Not Assessed"] },
          "Not Assessed"
        ]
      },
      1,
      0
    ]
  }
}
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Top 10 assets by MPI
    const topPriorityAssets = await Asset.find({
      maintenancePriorityScore: { $ne: null },
      maintenancePriority: { $ne: "Not Assessed" }
    })
      .sort({ maintenancePriorityScore: -1 })
      .limit(10)
      .select(
        "assetId assetName category healthScore healthStatus maintenancePriorityScore maintenancePriority"
      );

    return res.status(200).json({
      message: "Dashboard data fetched successfully",
      categoryStats,
      topPriorityAssets
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  getDashboardController
};
