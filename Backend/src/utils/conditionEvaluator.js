//Contains all the predefined threshold values
const assetConfig=require("../config/assetConfig")
//RETURNS WHOLE CONFIG
function getParameterConfig(assetType, parameterName) {
  const parameters = assetConfig[assetType];

  if (!parameters) return null;

  return parameters.find(
    (item) => item.parameter === parameterName
  ) || null;
}

//CHECK WHETHER USED ENETERED A VALID READING OR NOT
function hasValidReading(value) {
  return (
    value !== null &&
    value !== undefined &&
    value !== "" &&
    !(typeof value === "string" && value.trim() === "") &&
    Number.isFinite(Number(value))
  );
}

//CHECK WHETHER PREDEFINED THRESHOLD IS AVAILABLE OR NOT
function hasPredefinedCriteria(parameterConfig) {
  return Boolean(
    parameterConfig &&
    parameterConfig.assessmentMode === "criterion-available" &&
    Array.isArray(parameterConfig.numericThresholds) &&
    parameterConfig.numericThresholds.length > 0
  );
}

//CHECK THE THRESHOLD
function evaluateNumericCondition(value, parameterConfig) {
  const thresholds = parameterConfig.numericThresholds;
  const matchedThreshold = thresholds.find((threshold) => {
    const aboveMinimum =
      threshold.min === null || value >= threshold.min;

    const belowMaximum =
      threshold.max === null || value < threshold.max;

    return aboveMinimum && belowMaximum;
  });

  if (!matchedThreshold) {
    return {
      condition: "Not Assessed",
      assessmentType: "not-assessed"
    };
  }

  return {
    condition: matchedThreshold.condition,
    assessmentType: "automatic"
  };
}

function evaluateManualCondition(manualCondition) {
  const allowedConditions = [
    "Normal",
    "Caution",
    "Warning",
    "Critical"
  ];

  if (!allowedConditions.includes(manualCondition)) {
    return {
      condition: "Not Assessed",
      assessmentType: "not-assessed"
    };
  }

  return {
    condition: manualCondition,
    assessmentType: "manual"
  };
}

//CHECK THE CONDITION
function evaluateCondition(
  assetType,
  parameterName,
  value,
  manualCondition
) {
  const parameterConfig = getParameterConfig(
    assetType,
    parameterName
  );

  if (!parameterConfig) {
    return {
      condition: "Not Assessed",
      assessmentType: "not-assessed"
    };
  }

  if (hasPredefinedCriteria(parameterConfig)) {
    if (!hasValidReading(value)) {
      return {
        condition: "Not Assessed",
        assessmentType: "not-assessed"
      };
    }

    return evaluateNumericCondition(value, parameterConfig);
  }

  return evaluateManualCondition(manualCondition);
}

module.exports={evaluateCondition}