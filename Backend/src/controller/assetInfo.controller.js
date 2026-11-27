
const assetConfig = require("../config/assetConfig");

// 1. Get category-wise assessment criteria
function getAssessmentCriteria() {
  return Object.entries(assetConfig).map(([category, parameters]) => ({
    category,
    parameters
  }));
}

// 2. Get AHI methodology as table rows
function getHealthIndexCriteria() {
  return [
    {
      condition: "Normal",
      score: 100,
      description: "Parameter is within normal limits"
    },
    {
      condition: "Caution",
      score: 70,
      description: "Parameter requires attention"
    },
    {
      condition: "Warning",
      score: 50,
      description: "Parameter indicates a significant concern"
    },
    {
      condition: "Critical",
      score: 20,
      description: "Parameter indicates a critical condition"
    },
    {
      condition: "Not Assessed",
      score: null,
      description: "Excluded from the health score calculation"
    }
  ];
}

// 3. Get MPI weight distribution as table rows
function getMPIWeights() {
  return [
    { factor: "Health Condition", weight: 40 },
    { factor: "Asset Criticality", weight: 30 },
    { factor: "Maintenance Overdue", weight: 20 },
    { factor: "Age / Service Life", weight: 10 }
  ];
}

// 4. Get MPI scoring criteria as table rows
function getMPIScoringCriteria() {
  return [
    {
      factor: "Health Condition",
      criteria: "100 - Health Score",
      score: "0-100"
    },
    {
      factor: "Asset Criticality",
      criteria: "Low",
      score: 25
    },
    {
      factor: "Asset Criticality",
      criteria: "Medium",
      score: 50
    },
    {
      factor: "Asset Criticality",
      criteria: "High",
      score: 75
    },
    {
      factor: "Asset Criticality",
      criteria: "Very High",
      score: 100
    },
    {
      factor: "Maintenance Overdue",
      criteria: "Not Overdue",
      score: 0
    },
    {
      factor: "Maintenance Overdue",
      criteria: "1-30 days",
      score: 40
    },
    {
      factor: "Maintenance Overdue",
      criteria: "31-90 days",
      score: 70
    },
    {
      factor: "Maintenance Overdue",
      criteria: "Above 90 days",
      score: 100
    },
    {
      factor: "Age / Service Life",
      criteria: "Below 25%",
      score: 0
    },
    {
      factor: "Age / Service Life",
      criteria: "25-50%",
      score: 25
    },
    {
      factor: "Age / Service Life",
      criteria: "51-75%",
      score: 50
    },
    {
      factor: "Age / Service Life",
      criteria: "76-100%",
      score: 75
    },
    {
      factor: "Age / Service Life",
      criteria: "Above 100%",
      score: 100
    }
  ];
}

// 5. Get MPI priority classifications
function getMPIPriorityClassification() {
  return [
    { priority: "Low", minimum: 0, maximum: 24 },
    { priority: "Medium", minimum: 25, maximum: 49 },
    { priority: "High", minimum: 50, maximum: 74 },
    { priority: "Critical", minimum: 75, maximum: 100 }
  ];
}

// Main controller
async function getAssetInfoController(req, res) {
  try {
    return res.status(200).json({
      message: "Asset information fetched successfully",

      assessmentCriteria: getAssessmentCriteria(),

      healthIndex: {
        name: "Asset Health Index (AHI)",
        description:
          "AHI represents the condition of an asset based on its assessed parameters.",
        calculation:
          "Average of assessed parameter scores",
        conditionCriteria: getHealthIndexCriteria(),
        finalStatus:
          "The worst condition among assessed parameters determines the asset health status."
      },

      maintenancePriorityIndex: {
        name: "Maintenance Priority Index (MPI)",
        description:
          "MPI ranks assets based on health, criticality, maintenance overdue status, and age.",
        formula:
          "MPI = (Health Score × 0.40) + (Criticality Score × 0.30) + (Overdue Score × 0.20) + (Age Score × 0.10)",
        weights: getMPIWeights(),
        scoringCriteria: getMPIScoringCriteria(),
        priorityClassification: getMPIPriorityClassification(),
        notAssessed:
          "MPI is Not Assessed when all asset parameters are Not Assessed."
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  getAssetInfoController
};
