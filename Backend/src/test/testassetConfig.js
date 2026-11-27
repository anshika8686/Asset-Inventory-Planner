const { evaluateCondition } = require("../utils/conditionEvaluator");

const assetType = "Power Cable";

const parameterName =
  "Tan delta: standard deviation at U0 (PE/XLPE/TRXLPE)";

console.log("Test 1:", evaluateCondition(assetType, parameterName, 0.05));

console.log("Test 2:", evaluateCondition(assetType, parameterName, 0.3));

console.log("Test 3:", evaluateCondition(assetType, parameterName, null));

console.log("Test 4:", evaluateCondition(assetType, "Unknown Parameter", 10));

console.log(
  "Test 5:",
  evaluateCondition(
    "Power Cable",
    "Tan delta: standard deviation at U0 (EPR / filled)",
    0.3,
    "Warning"
  )
);

console.log(
  "Test 6:",
  evaluateCondition(
    "Power Cable",
    "Tan delta: standard deviation at U0 (EPR / filled)",
    null,
    "Normal"
  )
);

console.log(
  "Test 7:",
  evaluateCondition(
    "Switchgear",
    "SF6 gas density / pressure",
    null,
    "Warning"
  )
);

console.log(
  "Test 8:",
  evaluateCondition(
    "Switchgear",
    "SF6 gas density / pressure",
    null,
    null
  )
);