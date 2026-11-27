
const {
  calculateMaintenancePriority
} = require("../utils/calculatePriorityIndex");

const testAsset = {
  healthScore: 80,
  healthStatus: "Caution",
  criticality: "High",
  nextMaintenanceDate: "2026-12-12",
  installationDate: "2020-01-15",
  expectedServiceLifeYears: 30
};

const result = calculateMaintenancePriority(testAsset);

console.log(result);
