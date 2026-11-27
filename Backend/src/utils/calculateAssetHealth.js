
// Maps each reading condition to a numerical score
function getConditionScore(condition) {
  const conditionScores = {
    Normal: 100,
    Caution: 70,
    Warning: 50,
    Critical: 20,
  };

  // Not Assessed or an unknown condition
  return conditionScores[condition] ?? null;
}

// Calculates the overall health of an asset
function calculateAssetHealth(readings = []) {
  const assessedReadings = readings
    .map((reading) => ({
      condition: reading.condition,
      score: getConditionScore(reading.condition),
    }))
    .filter((reading) => reading.score !== null);

  // No assessed readings
  if (assessedReadings.length === 0) {
    return {
      healthScore: 0,
      healthStatus: "Not Assessed",
    };
  }

  // Average score of all assessed readings
  const totalScore = assessedReadings.reduce(
    (total, reading) => total + reading.score,
    0
  );

  const healthScore = Math.round(
    totalScore / assessedReadings.length
  );

  // Overall status is determined by the worst assessed condition
  const conditionPriority = {
    Normal: 1,
    Caution: 2,
    Warning: 3,
    Critical: 4,
  };

  const worstReading = assessedReadings.reduce((worst, current) =>
    conditionPriority[current.condition] >
    conditionPriority[worst.condition]
      ? current
      : worst
  );

  return {
    healthScore,
    healthStatus: worstReading.condition,
  };
}

module.exports = {
  getConditionScore,
  calculateAssetHealth,
};
