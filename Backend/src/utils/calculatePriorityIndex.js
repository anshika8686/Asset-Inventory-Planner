
const MS_PER_DAY = 1000 * 60 * 60 * 24;

// Converts asset health into a maintenance priority score
function calculateHealthPriorityScore(healthScore) {
  return 100 - healthScore;
}

// Converts asset criticality into a numerical score
function calculateCriticalityScore(criticality) {
  const criticalityScores = {
    Low: 25,
    Medium: 50,
    High: 75,
    "Very High": 100,
  };

  return criticalityScores[criticality] ?? 0;
}

// Calculates maintenance overdue score
function calculateOverdueScore(nextMaintenanceDate) {
  if (!nextMaintenanceDate) return 0;

  const today = new Date();
  const dueDate = new Date(nextMaintenanceDate);

  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  const daysOverdue = Math.floor(
    (today - dueDate) / MS_PER_DAY
  );

  if (daysOverdue <= 0) return 0;
  if (daysOverdue <= 30) return 40;
  if (daysOverdue <= 90) return 70;

  return 100;
}

// Calculates age score based on expected service life
function calculateAgeScore(installationDate, expectedServiceLifeYears) {
  if (!installationDate || !expectedServiceLifeYears ||
      expectedServiceLifeYears <= 0) {
    return 0;
  }

  const ageInYears =
    (new Date() - new Date(installationDate)) /
    (MS_PER_DAY * 365.25);

  const lifeUsedPercentage =
    (ageInYears / expectedServiceLifeYears) * 100;

  if (lifeUsedPercentage < 25) return 0;
  if (lifeUsedPercentage <= 50) return 25;
  if (lifeUsedPercentage <= 75) return 50;
  if (lifeUsedPercentage <= 100) return 75;

  return 100;
}

// Calculates the final Maintenance Priority Index
function calculateMaintenancePriority(asset) {
  // Do not calculate MPI for unassessed assets
  if (asset.healthStatus === "Not Assessed") {
    return {
      maintenancePriorityScore: null,
      maintenancePriority: "Not Assessed",
    };
  }

  const healthScore =
    calculateHealthPriorityScore(asset.healthScore);

  const criticalityScore =
    calculateCriticalityScore(asset.criticality);

  const overdueScore =
    calculateOverdueScore(asset.nextMaintenanceDate);

  const ageScore =
    calculateAgeScore(
      asset.installationDate,
      asset.expectedServiceLifeYears
    );

  const maintenancePriorityScore = Math.round(
    healthScore * 0.40 +
    criticalityScore * 0.30 +
    overdueScore * 0.20 +
    ageScore * 0.10
  );

  let maintenancePriority;

  if (maintenancePriorityScore < 25) {
    maintenancePriority = "Low";
  } else if (maintenancePriorityScore < 50) {
    maintenancePriority = "Medium";
  } else if (maintenancePriorityScore < 75) {
    maintenancePriority = "High";
  } else {
    maintenancePriority = "Critical";
  }

  return {
    maintenancePriorityScore,
    maintenancePriority,
  };
}

module.exports = {
  calculateMaintenancePriority,
};
